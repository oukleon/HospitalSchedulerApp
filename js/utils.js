// ===== 유틸리티 함수 =====

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getRoomsGroupedByFloor() {
    const rooms = {};
    beds.forEach(bed => {
        if (!rooms[bed.floor]) {
            rooms[bed.floor] = [];
        }
        if (!rooms[bed.floor].includes(bed.room)) {
            rooms[bed.floor].push(bed.room);
        }
    });
    
    Object.keys(rooms).forEach(floor => {
        rooms[floor].sort();
    });
    
    return rooms;
}

function getBedRoomType(roomNumber) {
    const roomBeds = beds.filter(bed => bed.room === roomNumber);
    const bedCount = roomBeds.length;
    
    if (bedCount === 1) return '1인실';
    if (bedCount === 2) return '2인실';
    if (bedCount === 4) return '4인실';
    return '기타';
}

function getBedStatus(bedId, dateStr) {
    const patient = patients.find(patient => {
        if (patient.bed !== bedId) return false;
        
        const patientStart = new Date(patient.admissionDate + 'T00:00:00');
        const patientEnd = new Date(patient.dischargeDate + 'T23:59:59');
        const checkDate = new Date(dateStr + 'T12:00:00');
        
        return checkDate >= patientStart && checkDate <= patientEnd;
    });
    
    if (!patient) return { status: 'empty' };
    
    return {
        status: patient.status,
        gender: patient.gender,
        patient: patient
    };
}

function getFloorSummaryByDate(dateStr) {
    const floors = [10, 11, 12, 13];
    const floorData = [];
    
    floors.forEach(floorNumber => {
        const floorBeds = beds.filter(bed => bed.floor === floorNumber);
        const floorPatients = [];
        let totalCapacity = floorBeds.length;
        
        floorBeds.forEach(bed => {
            const bedStatus = getBedStatus(bed.bed, dateStr);
            if (bedStatus.status !== 'empty') {
                floorPatients.push(bedStatus.patient);
            }
        });
        
        const maleCount = floorPatients.filter(p => p.gender === 'male').length;
        const femaleCount = floorPatients.filter(p => p.gender === 'female').length;
        const availableBeds = totalCapacity - floorPatients.length;
        
        floorData.push({
            floorNumber: floorNumber,
            department: floorBeds[0].department,
            totalPatients: floorPatients.length,
            maleCount: maleCount,
            femaleCount: femaleCount,
            availableBeds: availableBeds,
            patients: floorPatients
        });
    });
    
    return floorData;
}