const DAYS_TO_SHOW = 10;

const rooms = [
    // 10층 (재활 우선)
    {room: '1001', floor: 10, type: '2인실', capacity: 2, department: 'rehabilitation'},
    {room: '1002', floor: 10, type: '2인실', capacity: 2, department: 'rehabilitation'},
    {room: '1003', floor: 10, type: '4인실', capacity: 4, department: 'rehabilitation'},
    {room: '1004', floor: 10, type: '4인실', capacity: 4, department: 'rehabilitation'},
    {room: '1005', floor: 10, type: '4인실', capacity: 4, department: 'rehabilitation'},
    {room: '1006', floor: 10, type: '1인실', capacity: 1, department: 'rehabilitation'},
    
    // 11층 (암 우선)
    {room: '1101', floor: 11, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1102', floor: 11, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1103', floor: 11, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1104', floor: 11, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1105', floor: 11, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1106', floor: 11, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1107', floor: 11, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1108', floor: 11, type: '1인실', capacity: 1, department: 'cancer'},
    
    // 12층 (암 우선)
    {room: '1201', floor: 12, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1202', floor: 12, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1203', floor: 12, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1204', floor: 12, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1205', floor: 12, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1206', floor: 12, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1207', floor: 12, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1208', floor: 12, type: '1인실', capacity: 1, department: 'cancer'},
    
    // 13층 (암 우선)
    {room: '1301', floor: 13, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1302', floor: 13, type: '1인실', capacity: 1, department: 'cancer'},
    {room: '1303', floor: 13, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1304', floor: 13, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1305', floor: 13, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1306', floor: 13, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1307', floor: 13, type: '2인실', capacity: 2, department: 'cancer'},
    {room: '1308', floor: 13, type: '1인실', capacity: 1, department: 'cancer'}
];

let patients = [
    {id: 1, name: '김철수', gender: 'male', condition: '암', room: '1003', bedNumber: 1, admissionDate: '2025-08-10', dischargeDate: '2025-08-25', notes: '알레르기: 페니실린', status: 'admitted'},
    {id: 2, name: '박영희', gender: 'female', condition: '재활', room: '1005', bedNumber: 2, admissionDate: '2025-08-15', dischargeDate: '2025-09-05', notes: '휠체어 이용', status: 'admitted'},
    {id: 3, name: '이민수', gender: 'male', condition: '수술', room: '1003', bedNumber: 3, admissionDate: '2025-08-20', dischargeDate: '2025-08-30', notes: '', status: 'reserved'},
    {id: 4, name: '정미경', gender: 'female', condition: '일반', room: '1203', bedNumber: 1, admissionDate: '2025-08-18', dischargeDate: '2025-08-28', notes: '', status: 'admitted'},
    {id: 5, name: '최준호', gender: 'male', condition: '재활', room: '1303', bedNumber: 2, admissionDate: '2025-08-22', dischargeDate: '2025-09-10', notes: '', status: 'reserved'}
];

let today = new Date();
let currentStartDate = new Date(today);
currentStartDate.setDate(today.getDate() - 2);

// 입원 기간 달력 관련 변수
let durationCalendarMonth = 7; // 0-based (8월)
let durationCalendarYear = 2025;
let isLongtermEnabled = false;

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    document.getElementById('admissionDate').value = today.toISOString().split('T')[0];
    
    // 14일 후 날짜 계산
    const dischargeDate = new Date(today);
    dischargeDate.setDate(today.getDate() + 14);
    document.getElementById('dischargeDate').value = dischargeDate.toISOString().split('T')[0];
    
    generateScheduleTable();
});

function generateScheduleTable() {
    const table = document.getElementById('scheduleTable');
    const dateRangeElement = document.getElementById('dateRange');
    
    const endDate = new Date(currentStartDate);
    endDate.setDate(currentStartDate.getDate() + DAYS_TO_SHOW - 1);
    
    dateRangeElement.textContent = `${formatDate(currentStartDate)} ~ ${formatDate(endDate)}`;
    
    const dates = [];
    for (let i = 0; i < DAYS_TO_SHOW; i++) {
        const date = new Date(currentStartDate);
        date.setDate(currentStartDate.getDate() + i);
        dates.push(date);
    }
    
    let html = '';
    
    html += '<thead><tr>';
    html += '<th class="room-header">병실</th>';
    dates.forEach(date => {
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = dayNames[date.getDay()];
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        html += `<th class="date-header" onclick="showDateSummary('${dateStr}')">${date.getMonth() + 1}/${date.getDate()}<br><small>${dayName}</small></th>`;
    });
    html += '</tr></thead>';
    
    html += '<tbody>';
    
    const floors = [10, 11, 12, 13];
    
    floors.forEach((floor, floorIndex) => {
        const floorRooms = rooms.filter(room => room.floor === floor);
        
        if (floorIndex > 0) {
            html += '<tr>';
            html += `<td class="floor-divider" colspan="${DAYS_TO_SHOW + 1}"></td>`;
            html += '</tr>';
        }
        
        floorRooms.forEach(room => {
            html += '<tr>';
            html += `<td class="room-cell">${room.room}(${room.capacity})</td>`;
            
            let previousOccupancy = null;
            
            dates.forEach((date, dateIndex) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;
                const occupancyData = getRoomOccupancy(room.room, dateStr);
                
                html += `<td class="schedule-cell" data-room="${room.room}" data-date="${dateStr}" onclick="showRoomDetails('${room.room}', '${dateStr}')">`;
                
                const showText = shouldShowText(previousOccupancy, occupancyData, dateIndex);
                html += generateOccupancyBar(room, occupancyData, dateStr, showText);
                html += '</td>';
                
                previousOccupancy = occupancyData;
            });
            
            html += '</tr>';
        });
    });
    
    html += '</tbody>';
    table.innerHTML = html;
}

function showDateSummary(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(year, month - 1, day);
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = dayNames[dateObj.getDay()];
    const formattedDate = `${year}년 ${month}월 ${day}일 ${dayName}`;

    const floorData = getFloorSummaryByDate(dateStr);
    
    const modal = document.getElementById('dateSummaryModal');
    const modalBody = document.getElementById('dateSummaryBody');
    
    let html = `<h3>${formattedDate} 환자 현황</h3>`;
    
    floorData.forEach(floor => {
        html += `
            <div class="floor-summary">
                <h4>${floor.floorNumber}층 (${floor.department === 'rehabilitation' ? '재활' : '암'})</h4>
                <div class="floor-stats">
                    <span>총 환자: ${floor.totalPatients}명</span>
                    <span>남성: ${floor.maleCount}명</span>
                    <span>여성: ${floor.femaleCount}명</span>
                    <span>남은 침대: ${floor.availableBeds}개</span>
                </div>
                <div class="patient-list">
        `;
        
        if (floor.patients.length === 0) {
            html += '<p class="no-patients">입원 환자 없음</p>';
        } else {
            floor.patients.forEach(patient => {
                html += `
                    <div class="patient-item" onclick="showPatientDetails(${patient.id})" style="cursor: pointer;">
                        <strong>${patient.name}</strong> (${patient.gender === 'male' ? '남성' : '여성'}) - ${patient.room}호
                        <br><small>${patient.condition} | ${patient.status === 'admitted' ? '입원중' : '예약'}</small>
                    </div>
                `;
            });
        }
        
        html += `</div></div>`;
    });
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function getFloorSummaryByDate(dateStr) {
    const floors = [10, 11, 12, 13];
    const floorData = [];
    
    floors.forEach(floorNumber => {
        const floorRooms = rooms.filter(room => room.floor === floorNumber);
        const floorPatients = [];
        let totalCapacity = 0;
        
        floorRooms.forEach(room => {
            totalCapacity += room.capacity;
            const occupancyData = getRoomOccupancy(room.room, dateStr);
            floorPatients.push(...occupancyData.patients);
        });
        
        const maleCount = floorPatients.filter(p => p.gender === 'male').length;
        const femaleCount = floorPatients.filter(p => p.gender === 'female').length;
        const availableBeds = totalCapacity - floorPatients.length;
        
        floorData.push({
            floorNumber: floorNumber,
            department: floorRooms[0].department,
            totalPatients: floorPatients.length,
            maleCount: maleCount,
            femaleCount: femaleCount,
            availableBeds: availableBeds,
            patients: floorPatients
        });
    });
    
    return floorData;
}

function closeDateSummaryModal() {
    document.getElementById('dateSummaryModal').style.display = 'none';
}

// 모달 외부 클릭시 닫기
document.getElementById('dateSummaryModal').onclick = function(event) {
    if (event.target === this) {
        closeDateSummaryModal();
    }
}

function shouldShowText(previousOccupancy, currentOccupancy, dateIndex) {
    if (dateIndex === 0) return true;
    if (!previousOccupancy) return true;
    if (previousOccupancy.count !== currentOccupancy.count) return true;
    if (previousOccupancy.patients.length !== currentOccupancy.patients.length) return true;
    return false;
}

function getRoomOccupancy(roomNumber, dateStr) {
    const room = rooms.find(r => r.room === roomNumber);
    if (!room) return { count: 0, capacity: 1, patients: [] };
    
    const roomPatients = patients.filter(patient => {
        if (patient.room !== roomNumber) return false;
        
        const patientStart = new Date(patient.admissionDate + 'T00:00:00');
        const patientEnd = new Date(patient.dischargeDate + 'T23:59:59');
        const checkDate = new Date(dateStr + 'T12:00:00');
        
        return checkDate >= patientStart && checkDate <= patientEnd;
    });
    
    return {
        count: roomPatients.length,
        capacity: room.capacity,
        patients: roomPatients
    };
}

function generateOccupancyBar(room, occupancyData, dateStr, showText) {
    const { count, capacity, patients } = occupancyData;
    const occupancyRate = capacity > 0 ? (count / capacity) * 100 : 0;
    
    // 동적 성별 결정
    let genderType = 'mixed';
    if (patients.length > 0) {
        const patientGender = patients[0].gender;
        genderType = patientGender;
    }
    
    const admittedCount = patients.filter(p => p.status === 'admitted').length;
    const reservedCount = patients.filter(p => p.status === 'reserved').length;
    
    let occupancyClass = '';
    let displayText = '';
    
    if (count === 0) {
        occupancyClass = `occupancy-0-${genderType}`;
        displayText = '';
    } else if (reservedCount > 0 && admittedCount === 0) {
        occupancyClass = `status-reserved-${genderType}`;
        displayText = showText ? `${count}/${capacity}` : '';
    } else if (reservedCount > 0 && admittedCount > 0) {
        occupancyClass = `mixed-status-${genderType}`;
        displayText = showText ? `${count}/${capacity}` : '';
    } else {
        if (occupancyRate <= 25) {
            occupancyClass = `occupancy-25-${genderType}`;
        } else if (occupancyRate <= 50) {
            occupancyClass = `occupancy-50-${genderType}`;
        } else if (occupancyRate <= 75) {
            occupancyClass = `occupancy-75-${genderType}`;
        } else {
            occupancyClass = `occupancy-100-${genderType}`;
        }
        displayText = showText ? `${count}/${capacity}` : '';
    }
    
    return `<div class="occupancy-bar ${occupancyClass}">${displayText}</div>`;
}

function moveDate(days) {
    currentStartDate.setDate(currentStartDate.getDate() + days);
    generateScheduleTable();
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function showRoomDetails(roomNumber, dateStr) {
    const room = rooms.find(r => r.room === roomNumber);
    const occupancyData = getRoomOccupancy(roomNumber, dateStr);
    
    if (!room) return;
    
    // 날짜를 보기 좋게 포맷
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(year, month - 1, day);
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = dayNames[dateObj.getDay()];
    const formattedDate = `${year}년 ${month}월 ${day}일 ${dayName}`;

    // 현재 병실의 성별 결정
    let roomGenderText = '혼합';
    if (occupancyData.patients.length > 0) {
        const patientGender = occupancyData.patients[0].gender;
        roomGenderText = patientGender === 'male' ? '남성' : '여성';
    }

    const modal = document.getElementById('patientModal');
    const modalBody = document.getElementById('modalBody');
    
    let html = `
        <h3>${roomNumber}호 - ${formattedDate}</h3>
        <p><strong>병실 정보:</strong> ${room.type} (${roomGenderText})</p>
        <p><strong>점유 현황:</strong> ${occupancyData.count}/${occupancyData.capacity}명</p>
        <hr style="margin: 15px 0;">
    `;
    
    if (occupancyData.patients.length === 0) {
        html += '<p>이 날짜에는 입원 환자가 없습니다.</p>';
    } else {
        html += '<h4>입원 환자 목록:</h4>';
        occupancyData.patients.forEach(patient => {
            html += `
                <div style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; cursor: pointer;" onclick="showPatientDetails(${patient.id})">
                    <strong>${patient.name}</strong> (${patient.gender === 'male' ? '남성' : '여성'})<br>
                    <small>진료과: ${patient.condition} | 상태: ${patient.status === 'admitted' ? '입원중' : '예약'}</small><br>
                    <small>입원: ${patient.admissionDate} ~ ${patient.dischargeDate}</small>
                    ${patient.notes ? `<br><small>특이사항: ${patient.notes}</small>` : ''}
                </div>
            `;
        });
    }
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function showLegendModal() {
    document.getElementById('legendModal').style.display = 'flex';
}

function closeLegendModal() {
    document.getElementById('legendModal').style.display = 'none';
}

function findRecommendations() {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const duration = getDurationValue();
    
    if (!name || !admissionDate || (!duration && !isLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    let endDate = null;
    
    if (!isLongtermEnabled && duration) {
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + duration);
    }
    
    const recommendations = getRecommendations(gender, startDate, endDate);
    displayRecommendations(recommendations);
}

function getDurationValue() {
    if (isLongtermEnabled) return null;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const admissionDate = document.getElementById('admissionDate').value;
    
    if (admissionDate && dischargeDate) {
        const start = new Date(admissionDate);
        const end = new Date(dischargeDate);
        const diffTime = end - start;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    return parseInt(document.getElementById('duration').value) || null;
}

function updateDischargeFromDuration() {
    const admissionDate = document.getElementById('admissionDate').value;
    const duration = parseInt(document.getElementById('duration').value);
    
    if (admissionDate && duration && !isLongtermEnabled) {
        const startDate = new Date(admissionDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + duration);
        document.getElementById('dischargeDate').value = endDate.toISOString().split('T')[0];
    }
}

function updateDurationFromDischarge() {
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    
    if (admissionDate && dischargeDate && !isLongtermEnabled) {
        const start = new Date(admissionDate);
        const end = new Date(dischargeDate);
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0) {
            document.getElementById('duration').value = diffDays;
        }
    }
}

function toggleLongterm() {
    isLongtermEnabled = document.getElementById('longtermCheck').checked;
    const dischargeInput = document.getElementById('dischargeDate');
    const durationSelect = document.getElementById('duration');
    
    dischargeInput.disabled = isLongtermEnabled;
    durationSelect.disabled = isLongtermEnabled;
}

function getRecommendations(gender, startDate, endDate) {
    const patientCondition = document.getElementById('patientCondition').value;
    const roomType = document.getElementById('roomType').value;
    const patientDepartment = patientCondition === '재활' ? 'rehabilitation' : 'cancer';
    
    const availableRooms = rooms.filter(room => {
        // 1. 사용 가능한지 확인
        if (!isRoomAvailable(room.room, startDate, endDate)) return false;
        
        // 2. 성별 매칭 확인
        const roomGender = getRoomGender(room.room, startDate, endDate);
        if (!(roomGender === 'mixed' || roomGender === gender)) return false;
        
        // 3. 병실타입 확인 (상관없음이 아닐 때만)
        if (roomType !== 'any' && room.type !== roomType) return false;
        
        return true;
    });
    
    const scored = availableRooms.map(room => {
        let score = 0;
        
        // 병실타입 매칭 점수 (최우선)
        if (roomType !== 'any' && room.type === roomType) {
            score += 2000; // 가장 높은 점수
        }
        
        // 성별 매칭 점수
        const roomGender = getRoomGender(room.room, startDate, endDate);
        if (roomGender === 'mixed') {
            score += 1000; // 빈 병실
        } else if (roomGender === gender) {
            score += 800; // 성별 일치
        }
        
        // 진료과 매칭 점수
        if (room.department === patientDepartment) {
            score += 500; // 해당 과 층
        }
        
        // 낮은 층 보너스
        score += (14 - room.floor) * 5;
        
        return { ...room, score };
    });
    
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

function showPatientDetails(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    const genderText = patient.gender === 'male' ? '남성' : '여성';
    const statusText = patient.status === 'admitted' ? '입원중' : '예약';
    const room = rooms.find(r => r.room === patient.room);
    const floorInfo = room ? `${room.floor}층 ${room.department === 'rehabilitation' ? '재활' : '암'}과` : '';
    
    const modal = document.getElementById('patientDetailModal');
    const modalBody = document.getElementById('patientDetailBody');
    
    let html = `
        <h3>환자 상세 정보</h3>
        <div class="patient-details">
            <div class="detail-row"><strong>환자명:</strong> ${patient.name}</div>
            <div class="detail-row"><strong>성별:</strong> ${genderText}</div>
            <div class="detail-row"><strong>진료과:</strong> ${patient.condition}</div>
            <div class="detail-row"><strong>병실:</strong> ${patient.room}호 (${floorInfo})</div>
            <div class="detail-row"><strong>상태:</strong> ${statusText}</div>
            <div class="detail-row"><strong>입원일:</strong> ${patient.admissionDate}</div>
            <div class="detail-row"><strong>퇴원일:</strong> ${patient.dischargeDate || '미정 (장기입원)'}</div>
            ${patient.notes ? `<div class="detail-row"><strong>특이사항:</strong> ${patient.notes}</div>` : ''}
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function getRoomGender(roomNumber, startDate, endDate) {
    const overlappingPatients = patients.filter(patient => {
        if (patient.room !== roomNumber) return false;
        
        const patientStart = new Date(patient.admissionDate);
        const patientEnd = new Date(patient.dischargeDate);
        
        // 겹치는 기간이 있는지 확인
        return !(endDate <= patientStart || startDate >= patientEnd);
    });
    
    if (overlappingPatients.length === 0) {
        return 'mixed'; // 빈 병실은 아무나 가능
    }
    
    // 기존 환자들의 성별
    const existingGender = overlappingPatients[0].gender;
    return existingGender;
}

function isRoomAvailable(roomNumber, startDate, endDate) {
    const conflictingPatients = patients.filter(patient => {
        if (patient.room !== roomNumber) return false;
        
        const patientStart = new Date(patient.admissionDate);
        const patientEnd = new Date(patient.dischargeDate);
        
        return !(endDate <= patientStart || startDate >= patientEnd);
    });
    
    const room = rooms.find(r => r.room === roomNumber);
    return conflictingPatients.length < room.capacity;
}

function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    
    if (recommendations.length === 0) {
        recommendationsDiv.innerHTML = '<div class="recommendations"><h4>추천 병실</h4><p>사용 가능한 병실이 없습니다.</p></div>';
    } else {
        let html = '<div class="recommendations"><h4>추천 병실</h4>';
        recommendations.forEach((room, index) => {
            html += `
                <div class="recommendation-item priority-${index + 1}" onclick="confirmReservation('${room.room}')" style="cursor: pointer;">
                    <strong>${index + 1}순위: ${room.room}호</strong><br>
                    ${room.floor}층, ${room.type}, ${room.department === 'rehabilitation' ? '재활' : '암'}
                    <small style="display: block; color: #666;">클릭하여 예약</small>
                </div>
            `;
        });
        html += '</div>';
        recommendationsDiv.innerHTML = html;
    }
    
    recommendationsDiv.style.display = 'block';
}

function confirmReservation(roomNumber) {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const notes = document.getElementById('patientNotes').value;
    
    if (confirmPatientRegistration(name, gender, condition, roomNumber, admissionDate, dischargeDate, notes, false)) {
        // 기존 등록 코드
        const startDate = new Date(admissionDate);
        let endDate = null;
        
        if (!isLongtermEnabled && dischargeDate) {
            endDate = new Date(dischargeDate);
        }
        
        const newPatient = {
            id: patients.length + 1,
            name: name,
            gender: gender,
            condition: condition,
            room: roomNumber,
            bedNumber: 1,
            admissionDate: admissionDate,
            dischargeDate: endDate ? endDate.toISOString().split('T')[0] : null,
            notes: notes,
            status: new Date(admissionDate) > new Date() ? 'reserved' : 'admitted'
        };
        
        patients.push(newPatient);
        
        // 폼 초기화
        document.getElementById('patientName').value = '';
        document.getElementById('patientNotes').value = '';
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${roomNumber}호에 등록되었습니다.`);
    }
}

function addPatient() {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const notes = document.getElementById('patientNotes').value;
    
    if (!name || !admissionDate || (!dischargeDate && !isLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    let endDate = null;
    
    if (!isLongtermEnabled && dischargeDate) {
        endDate = new Date(dischargeDate);
    }
    
    const recommendations = getRecommendations(gender, startDate, endDate);
    
    if (recommendations.length === 0) {
        alert('사용 가능한 병실이 없습니다.');
        return;
    }
    
    const selectedRoom = recommendations[0].room;
    
    if (confirmPatientRegistration(name, gender, condition, selectedRoom, admissionDate, dischargeDate, notes, true)) {
        // 기존 등록 코드
        const newPatient = {
            id: patients.length + 1,
            name: name,
            gender: gender,
            condition: condition,
            room: selectedRoom,
            bedNumber: 1,
            admissionDate: admissionDate,
            dischargeDate: endDate ? endDate.toISOString().split('T')[0] : null,
            notes: notes,
            status: new Date(admissionDate) > new Date() ? 'reserved' : 'admitted'
        };
        
        patients.push(newPatient);
        
        document.getElementById('patientName').value = '';
        document.getElementById('patientNotes').value = '';
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${selectedRoom}호에 등록되었습니다.`);
    }
}

function confirmPatientRegistration(name, gender, condition, roomNumber, admissionDate, dischargeDate, notes, isAutoAssigned = false) {
    const genderText = gender === 'male' ? '남성' : '여성';
    const durationText = isLongtermEnabled ? '장기입원 (퇴원일 미정)' : `${admissionDate} ~ ${dischargeDate}`;
    const roomText = isAutoAssigned ? `${roomNumber}호 (자동배정)` : `${roomNumber}호`;
    
    const confirmMessage = `환자 정보 확인\n\n환자명: ${name}\n성별: ${genderText}\n진료과: ${condition}\n병실: ${roomText}\n입원기간: ${durationText}\n특이사항: ${notes || '없음'}\n\n등록하시겠습니까?`;
    
    return confirm(confirmMessage);
}

function closeModal() {
    document.getElementById('patientModal').style.display = 'none';
}

function closePatientDetailModal() {
    document.getElementById('patientDetailModal').style.display = 'none';
}

// 모달 외부 클릭시 닫기
document.getElementById('patientDetailModal').onclick = function(event) {
    if (event.target === this) {
        closePatientDetailModal();
    }
}


document.getElementById('patientModal').onclick = function(event) {
    if (event.target === this) {
        closeModal();
    }
}

document.getElementById('legendModal').onclick = function(event) {
    if (event.target === this) {
        closeLegendModal();
    }
}
