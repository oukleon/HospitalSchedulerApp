// ===== 베드 추천 시스템 =====

function getRecommendations(patientGender, patientCondition, roomType, startDate, endDate) {
    const candidates = [];
    
    beds.forEach(bed => {
        const score = calculateBedScore(bed, patientGender, patientCondition, roomType, startDate, endDate);
        if (score > 0) {
            candidates.push({
                bed: bed.bed,
                room: bed.room,
                floor: bed.floor,
                department: bed.department,
                score: score
            });
        }
    });
    
    candidates.sort((a, b) => b.score - a.score);
    
    return candidates.slice(0, 5);
}

function calculateBedScore(bed, patientGender, patientCondition, roomType, startDate, endDate) {
    let score = 0;
    
    if (!isGenderCompatible(bed.room, patientGender, startDate, endDate)) {
        return 0;
    }
    
    if (!isBedAvailable(bed.bed, startDate, endDate)) {
        return 0;
    }
    
    const bedRoomType = getBedRoomType(bed.room);
    
    if (roomType !== 'any') {
        if (bedRoomType === roomType) score += 100;
        if (isConditionMatch(bed.department, patientCondition)) score += 50;
    } else {
        if (isConditionMatch(bed.department, patientCondition)) score += 100;
        score += 30;
    }
    
    if (checkContinuousBedAvailability(bed.bed, startDate, endDate)) {
        score += 200;
    } else {
        score += 10;
    }
    
    return score;
}

function isGenderCompatible(roomNumber, patientGender, startDate, endDate) {
    const roomType = getBedRoomType(roomNumber);
    
    if (roomType === '1인실') return true;
    
    const roomPatients = patients.filter(patient => {
        if (!patient.bed || patient.bed.substring(0, 4) !== roomNumber) return false;
        
        const patientStart = new Date(patient.admissionDate);
        const patientEnd = new Date(patient.dischargeDate);
        
        return !(endDate <= patientStart || startDate >= patientEnd);
    });
    
    if (roomPatients.length > 0) {
        return roomPatients.every(p => p.gender === patientGender);
    }
    
    return true;
}

function isBedAvailable(bedId, startDate, endDate) {
    const conflictingPatients = patients.filter(patient => {
        if (patient.bed !== bedId) return false;
        
        const patientStart = new Date(patient.admissionDate);
        const patientEnd = new Date(patient.dischargeDate);
        
        return !(endDate <= patientStart || startDate >= patientEnd);
    });
    
    return conflictingPatients.length === 0;
}

function checkContinuousBedAvailability(bedId, startDate, endDate) {
    return isBedAvailable(bedId, startDate, endDate);
}

function isConditionMatch(bedDepartment, patientCondition) {
    if (patientCondition === '암' && bedDepartment === 'cancer') return true;
    if (patientCondition === '재활' && bedDepartment === 'rehabilitation') return true;
    return false;
}

function findRecommendations() {
    const name = document.getElementById('patientName').value;
    const patientGender = document.getElementById('patientGender').value;
    const patientCondition = document.getElementById('patientCondition').value;
    const roomType = document.getElementById('roomType').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    
    if (!name || !admissionDate || (!dischargeDate && !isLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    const endDate = isLongtermEnabled ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
    
    const recommendations = getRecommendations(patientGender, patientCondition, roomType, startDate, endDate);
    displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    
    if (recommendations.length === 0) {
        recommendationsDiv.innerHTML = '<div class="recommendations"><h4>추천 병실</h4><p>사용 가능한 병실이 없습니다.</p></div>';
    } else {
        let html = '<div class="recommendations"><h4>추천 병실</h4>';
        recommendations.forEach((rec, index) => {
            const roomType = getBedRoomType(rec.room);
            const departmentText = rec.department === 'rehabilitation' ? '재활' : '암';
            
            html += `
                <div class="recommendation-item priority-${Math.min(index + 1, 3)}" onclick="confirmReservation('${rec.bed}')" style="cursor: pointer;">
                    <strong>${index + 1}순위: ${rec.bed}</strong><br>
                    ${rec.floor}층, ${roomType}, ${departmentText}
                    <small style="display: block; color: #666;">클릭하여 예약</small>
                </div>
            `;
        });
        html += '</div>';
        recommendationsDiv.innerHTML = html;
    }
    
    recommendationsDiv.style.display = 'block';
}

function findAvailableBeds() {
    showBedSelectionModal({
        gender: document.getElementById('patientGender').value,
        condition: document.getElementById('patientCondition').value,
        admissionDate: document.getElementById('admissionDate').value,
        dischargeDate: document.getElementById('dischargeDate').value,
        roomType: document.getElementById('roomType').value,
        isLongterm: isLongtermEnabled,
        excludePatientId: null,
        title: '가능한 병실 선택',
        onSelect: 'selectBed'
    });
}

function changeBedForEdit() {
    showBedSelectionModal({
        gender: document.getElementById('editPatientGender').value,
        condition: document.getElementById('editPatientCondition').value,
        admissionDate: document.getElementById('editAdmissionDate').value,
        dischargeDate: document.getElementById('editDischargeDate').value,
        roomType: document.getElementById('editRoomType').value,
        isLongterm: isEditLongtermEnabled,
        excludePatientId: editingPatientId,
        title: '베드 변경',
        onSelect: 'selectBedForEdit'
    });
}