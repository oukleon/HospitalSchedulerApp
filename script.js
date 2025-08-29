const DAYS_TO_SHOW = 10;

const beds = [
   // 10층 (재활 우선) - 1001, 1002 -> 4인실
   {bed: '1001A', room: '1001', floor: 10, department: 'rehabilitation'},
   {bed: '1001B', room: '1001', floor: 10, department: 'rehabilitation'},
   {bed: '1001C', room: '1001', floor: 10, department: 'rehabilitation'},
   {bed: '1001D', room: '1001', floor: 10, department: 'rehabilitation'},
   {bed: '1002A', room: '1002', floor: 10, department: 'rehabilitation'},
   {bed: '1002B', room: '1002', floor: 10, department: 'rehabilitation'},
   {bed: '1002C', room: '1002', floor: 10, department: 'rehabilitation'},
   {bed: '1002D', room: '1002', floor: 10, department: 'rehabilitation'},
   {bed: '1003A', room: '1003', floor: 10, department: 'rehabilitation'},
   {bed: '1003B', room: '1003', floor: 10, department: 'rehabilitation'},
   {bed: '1003C', room: '1003', floor: 10, department: 'rehabilitation'},
   {bed: '1003D', room: '1003', floor: 10, department: 'rehabilitation'},
   {bed: '1004A', room: '1004', floor: 10, department: 'rehabilitation'},
   {bed: '1004B', room: '1004', floor: 10, department: 'rehabilitation'},
   {bed: '1004C', room: '1004', floor: 10, department: 'rehabilitation'},
   {bed: '1004D', room: '1004', floor: 10, department: 'rehabilitation'},
   {bed: '1005A', room: '1005', floor: 10, department: 'rehabilitation'},
   {bed: '1005B', room: '1005', floor: 10, department: 'rehabilitation'},
   {bed: '1005C', room: '1005', floor: 10, department: 'rehabilitation'},
   {bed: '1005D', room: '1005', floor: 10, department: 'rehabilitation'},
   {bed: '1006A', room: '1006', floor: 10, department: 'rehabilitation'},
   
   // 11층 (암 우선)
   {bed: '1101A', room: '1101', floor: 11, department: 'cancer'},
   {bed: '1102A', room: '1102', floor: 11, department: 'cancer'},
   {bed: '1103A', room: '1103', floor: 11, department: 'cancer'},
   {bed: '1103B', room: '1103', floor: 11, department: 'cancer'},
   {bed: '1104A', room: '1104', floor: 11, department: 'cancer'},
   {bed: '1104B', room: '1104', floor: 11, department: 'cancer'},
   {bed: '1105A', room: '1105', floor: 11, department: 'cancer'},
   {bed: '1105B', room: '1105', floor: 11, department: 'cancer'},
   {bed: '1106A', room: '1106', floor: 11, department: 'cancer'},
   {bed: '1106B', room: '1106', floor: 11, department: 'cancer'},
   {bed: '1107A', room: '1107', floor: 11, department: 'cancer'},
   {bed: '1107B', room: '1107', floor: 11, department: 'cancer'},
   {bed: '1108A', room: '1108', floor: 11, department: 'cancer'},
   
   // 12층 (암 우선)
   {bed: '1201A', room: '1201', floor: 12, department: 'cancer'},
   {bed: '1202A', room: '1202', floor: 12, department: 'cancer'},
   {bed: '1203A', room: '1203', floor: 12, department: 'cancer'},
   {bed: '1203B', room: '1203', floor: 12, department: 'cancer'},
   {bed: '1204A', room: '1204', floor: 12, department: 'cancer'},
   {bed: '1204B', room: '1204', floor: 12, department: 'cancer'},
   {bed: '1205A', room: '1205', floor: 12, department: 'cancer'},
   {bed: '1205B', room: '1205', floor: 12, department: 'cancer'},
   {bed: '1206A', room: '1206', floor: 12, department: 'cancer'},
   {bed: '1206B', room: '1206', floor: 12, department: 'cancer'},
   {bed: '1207A', room: '1207', floor: 12, department: 'cancer'},
   {bed: '1207B', room: '1207', floor: 12, department: 'cancer'},
   {bed: '1208A', room: '1208', floor: 12, department: 'cancer'},
   
   // 13층 (암 우선)
   {bed: '1301A', room: '1301', floor: 13, department: 'cancer'},
   {bed: '1302A', room: '1302', floor: 13, department: 'cancer'},
   {bed: '1303A', room: '1303', floor: 13, department: 'cancer'},
   {bed: '1303B', room: '1303', floor: 13, department: 'cancer'},
   {bed: '1304A', room: '1304', floor: 13, department: 'cancer'},
   {bed: '1304B', room: '1304', floor: 13, department: 'cancer'},
   {bed: '1305A', room: '1305', floor: 13, department: 'cancer'},
   {bed: '1305B', room: '1305', floor: 13, department: 'cancer'},
   {bed: '1306A', room: '1306', floor: 13, department: 'cancer'},
   {bed: '1306B', room: '1306', floor: 13, department: 'cancer'},
   {bed: '1307A', room: '1307', floor: 13, department: 'cancer'},
   {bed: '1307B', room: '1307', floor: 13, department: 'cancer'},
   {bed: '1308A', room: '1308', floor: 13, department: 'cancer'}
];

let patients = [
    {id: 1, name: '김철수', gender: 'male', condition: '암', bed: '1003A', admissionDate: '2025-08-10', dischargeDate: '2025-08-25', notes: '알레르기: 페니실린', status: 'admitted'},
    {id: 2, name: '박영희', gender: 'female', condition: '재활', bed: '1005B', admissionDate: '2025-08-15', dischargeDate: '2025-09-05', notes: '휠체어 이용', status: 'admitted'},
    {id: 3, name: '이민수', gender: 'male', condition: '수술', bed: '1003C', admissionDate: '2025-08-20', dischargeDate: '2025-08-30', notes: '', status: 'reserved'},
    {id: 4, name: '정미경', gender: 'female', condition: '일반', bed: '1203A', admissionDate: '2025-08-18', dischargeDate: '2025-08-28', notes: '', status: 'admitted'},
    {id: 5, name: '최준호', gender: 'male', condition: '재활', bed: '1303B', admissionDate: '2025-08-22', dischargeDate: '2025-09-10', notes: '', status: 'reserved'},
    {id: 6, name: '한소영', gender: 'female', condition: '암', bed: '1104A', admissionDate: '2025-09-01', dischargeDate: '2025-09-15', notes: '', status: 'reserved'},
    {id: 7, name: '장민호', gender: 'male', condition: '재활', bed: '1001A', admissionDate: '2025-08-25', dischargeDate: '2025-09-08', notes: '', status: 'admitted'}
];

let today = new Date();
let currentStartDate = new Date(today);
currentStartDate.setDate(today.getDate() - 2);

let isLongtermEnabled = false;

document.addEventListener('DOMContentLoaded', function() {
   const today = new Date();
   document.getElementById('admissionDate').value = today.toISOString().split('T')[0];
   
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
   html += '<th class="room-header">베드</th>';
   dates.forEach(date => {
       const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
       const dayName = dayNames[date.getDay()];
       const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
       html += `<th class="date-header" onclick="showDateSummary('${dateStr}')">${date.getMonth() + 1}/${date.getDate()}<br><small>${dayName}</small></th>`;
   });
   html += '</tr></thead>';
   
   html += '<tbody>';
   
   const floors = [10, 11, 12, 13];
   const rooms = getRoomsGroupedByFloor();
   
   floors.forEach((floor, floorIndex) => {
       const floorRooms = rooms[floor];
       
       if (floorIndex > 0) {
           html += '<tr>';
           html += `<td class="floor-divider" colspan="${DAYS_TO_SHOW + 1}"></td>`;
           html += '</tr>';
       }
       
       floorRooms.forEach(roomNumber => {
           const roomBeds = beds.filter(bed => bed.room === roomNumber);
           roomBeds.forEach(bed => {
               html += '<tr>';
               html += `<td class="room-cell">${bed.bed}</td>`;
               
               let previousBedStatus = null;
               
               dates.forEach((date, dateIndex) => {
                   const year = date.getFullYear();
                   const month = String(date.getMonth() + 1).padStart(2, '0');
                   const day = String(date.getDate()).padStart(2, '0');
                   const dateStr = `${year}-${month}-${day}`;
                   const bedStatus = getBedStatus(bed.bed, dateStr);
                   
                   html += `<td class="schedule-cell" data-bed="${bed.bed}" data-date="${dateStr}" onclick="showBedDetails('${bed.bed}', '${dateStr}', event)">`;
                   
                   const showText = shouldShowText(previousBedStatus, bedStatus, dateIndex);
                   html += generateOccupancyBar(bedStatus, showText);
                   html += '</td>';
                   
                   previousBedStatus = bedStatus;
               });
               
               html += '</tr>';
           });
       });
   });
   
   html += '</tbody>';
   table.innerHTML = html;
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

function shouldShowText(previousBedStatus, currentBedStatus, dateIndex) {
   if (dateIndex === 0) return true;
   if (!previousBedStatus) return true;
   if (previousBedStatus.status !== currentBedStatus.status) return true;
   if (previousBedStatus.patient && currentBedStatus.patient) {
       if (previousBedStatus.patient.id !== currentBedStatus.patient.id) return true;
   }
   return false;
}

function generateOccupancyBar(bedStatus, showText) {
   let bedClass = getBedClass(bedStatus);
   let displayText = '';
   
   if (showText && bedStatus.status !== 'empty' && bedStatus.patient) {
       displayText = bedStatus.patient.name;
   }
   
   return `<div class="occupancy-bar ${bedClass}">${displayText}</div>`;
}

function getBedClass(bedStatus) {
   if (bedStatus.status === 'empty') {
       return 'bed-empty';
   }
   
   if (bedStatus.status === 'admitted') {
       return bedStatus.gender === 'male' ? 'bed-admitted-male' : 'bed-admitted-female';
   }
   
   if (bedStatus.status === 'reserved') {
       return bedStatus.gender === 'male' ? 'bed-reserved-male' : 'bed-reserved-female';
   }
   
   return 'bed-empty';
}

function showBedDetails(bedId, dateStr, event) {
   event.stopPropagation();
   
   const bedStatus = getBedStatus(bedId, dateStr);
   const bed = beds.find(b => b.bed === bedId);
   
   const [year, month, day] = dateStr.split('-');
   const dateObj = new Date(year, month - 1, day);
   const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
   const dayName = dayNames[dateObj.getDay()];
   const formattedDate = `${year}년 ${month}월 ${day}일 ${dayName}`;

   const modal = document.getElementById('patientModal');
   const modalBody = document.getElementById('modalBody');
   
   let html = `
       <h3>${bedId} - ${formattedDate}</h3>
       <p><strong>병실:</strong> ${bed.room}호 (${bed.floor}층 ${bed.department === 'rehabilitation' ? '재활' : '암'}과)</p>
       <hr style="margin: 15px 0;">
   `;
   
   if (bedStatus.status === 'empty') {
       html += '<p>이 베드는 비어있습니다.</p>';
   } else {
       const patient = bedStatus.patient;
       const genderText = patient.gender === 'male' ? '남성' : '여성';
       const statusText = patient.status === 'admitted' ? '입원중' : '예약';
       
       html += `
           <h4>환자 정보:</h4>
           <div style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; cursor: pointer;" onclick="showPatientDetails(${patient.id})">
               <strong>${patient.name}</strong> (${genderText})<br>
               <small>진료과: ${patient.condition} | 상태: ${statusText}</small><br>
               <small>입원: ${patient.admissionDate} ~ ${patient.dischargeDate}</small>
               ${patient.notes ? `<br><small>특이사항: ${patient.notes}</small>` : ''}
           </div>
       `;
   }
   
   modalBody.innerHTML = html;
   modal.style.display = 'flex';
}

function showPatientDetails(patientId) {
   const patient = patients.find(p => p.id === patientId);
   if (!patient) return;
   
   const genderText = patient.gender === 'male' ? '남성' : '여성';
   const statusText = patient.status === 'admitted' ? '입원중' : '예약';
   const bed = beds.find(b => b.bed === patient.bed);
   const floorInfo = bed ? `${bed.floor}층 ${bed.department === 'rehabilitation' ? '재활' : '암'}과` : '';
   
   const modal = document.getElementById('patientDetailModal');
   const modalBody = document.getElementById('patientDetailBody');
   
   let html = `
       <h3>환자 상세 정보</h3>
       <div class="patient-details">
           <div class="detail-row"><strong>환자명:</strong> ${patient.name}</div>
           <div class="detail-row"><strong>성별:</strong> ${genderText}</div>
           <div class="detail-row"><strong>진료과:</strong> ${patient.condition}</div>
           <div class="detail-row"><strong>베드:</strong> ${patient.bed} (${floorInfo})</div>
           <div class="detail-row"><strong>상태:</strong> ${statusText}</div>
           <div class="detail-row"><strong>입원일:</strong> ${patient.admissionDate}</div>
           <div class="detail-row"><strong>퇴원일:</strong> ${patient.dischargeDate || '미정 (장기입원)'}</div>
           ${patient.notes ? `<div class="detail-row"><strong>특이사항:</strong> ${patient.notes}</div>` : ''}
       </div>
   `;
   
   modalBody.innerHTML = html;
   modal.style.display = 'flex';
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
                   <span>남은 베드: ${floor.availableBeds}개</span>
               </div>
               <div class="patient-list">
       `;
       
       if (floor.patients.length === 0) {
           html += '<p class="no-patients">입원 환자 없음</p>';
       } else {
           floor.patients.forEach(patient => {
               html += `
                   <div class="patient-item" onclick="showPatientDetails(${patient.id})" style="cursor: pointer;">
                       <strong>${patient.name}</strong> (${patient.gender === 'male' ? '남성' : '여성'}) - ${patient.bed}
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

function moveDate(days) {
   currentStartDate.setDate(currentStartDate.getDate() + days);
   generateScheduleTable();
}

function formatDate(date) {
   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function showLegendModal() {
   document.getElementById('legendModal').style.display = 'flex';
}

function closeLegendModal() {
   document.getElementById('legendModal').style.display = 'none';
}

function closeModal() {
   document.getElementById('patientModal').style.display = 'none';
}

function closePatientDetailModal() {
   document.getElementById('patientDetailModal').style.display = 'none';
}

function closeDateSummaryModal() {
   document.getElementById('dateSummaryModal').style.display = 'none';
}

function toggleLongterm() {
   isLongtermEnabled = document.getElementById('longtermCheck').checked;
   const dischargeInput = document.getElementById('dischargeDate');
   const durationSelect = document.getElementById('duration');
   
   dischargeInput.disabled = isLongtermEnabled;
   durationSelect.disabled = isLongtermEnabled;
}

function updateDischargeFromDuration() {
    const admissionDate = document.getElementById('admissionDate').value;
    const duration = document.getElementById('duration').value;
    
    if (admissionDate && duration && !isLongtermEnabled) {
        const startDate = new Date(admissionDate);
        const endDate = new Date(startDate);
        
        if (duration === '60+') {
            endDate.setDate(startDate.getDate() + 61);
        } else {
            endDate.setDate(startDate.getDate() + parseInt(duration));
        }
        
        document.getElementById('dischargeDate').value = endDate.toISOString().split('T')[0];
    }
}

function updateDurationFromDischarge() {
   const admissionDate = document.getElementById('admissionDate').value;
   const dischargeDate = document.getElementById('dischargeDate').value;
   const durationSelect = document.getElementById('duration');

   if (admissionDate && dischargeDate && !isLongtermEnabled) {
       const start = new Date(admissionDate);
       const end = new Date(dischargeDate);
       const diffTime = end - start;
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       
       if (diffDays > 0) {
            if (diffDays > 60) {
                durationSelect.value = "60+";
            } else {
                durationSelect.value = diffDays;
            }
        }
   }
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

document.getElementById('dateSummaryModal').onclick = function(event) {
   if (event.target === this) {
       closeDateSummaryModal();
   }
}

// 나머지 함수들은 필요에 따라 추가 예정
function findRecommendations() {
   alert('추천 기능은 구현 예정입니다.');
}

function addPatient() {
   alert('환자 등록 기능은 구현 예정입니다.');
}
