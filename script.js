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
    {id: 1, name: '김철수', gender: 'male', condition: '암', bed: '1003A', admissionDate: '2025-08-15', dischargeDate: '2025-09-10', notes: '알레르기: 페니실린', status: 'admitted'},
    {id: 2, name: '박영희', gender: 'female', condition: '재활', bed: '1005B', admissionDate: '2025-08-20', dischargeDate: '2025-09-15', notes: '휠체어 이용', status: 'admitted'},
    {id: 3, name: '이민수', gender: 'male', condition: '재활', bed: '1003C', admissionDate: '2025-09-02', dischargeDate: '2025-09-20', notes: '', status: 'reserved'},
    {id: 4, name: '정미경', gender: 'female', condition: '암', bed: '1203A', admissionDate: '2025-08-25', dischargeDate: '2025-09-08', notes: '', status: 'admitted'},
    {id: 5, name: '최준호', gender: 'male', condition: '재활', bed: '1001A', admissionDate: '2025-09-01', dischargeDate: '2025-09-22', notes: '', status: 'reserved'},
    {id: 6, name: '한소영', gender: 'female', condition: '암', bed: '1104A', admissionDate: '2025-08-28', dischargeDate: '2025-09-12', notes: '', status: 'admitted'},
    {id: 7, name: '장민호', gender: 'male', condition: '재활', bed: '1002A', admissionDate: '2025-08-22', dischargeDate: '2025-09-05', notes: '', status: 'admitted'},
    {id: 8, name: '오수진', gender: 'female', condition: '재활', bed: '1005A', admissionDate: '2025-09-03', dischargeDate: '2025-09-18', notes: '', status: 'reserved'},
    {id: 9, name: '윤대성', gender: 'male', condition: '암', bed: '1105A', admissionDate: '2025-08-26', dischargeDate: '2025-09-14', notes: '', status: 'admitted'},
    {id: 10, name: '강미나', gender: 'female', condition: '암', bed: '1105B', admissionDate: '2025-08-24', dischargeDate: '2025-09-07', notes: '', status: 'admitted'},
    {id: 11, name: '서동민', gender: 'male', condition: '재활', bed: '1001B', admissionDate: '2025-08-18', dischargeDate: '2025-09-02', notes: '', status: 'admitted'},
    {id: 12, name: '조은해', gender: 'female', condition: '암', bed: '1106A', admissionDate: '2025-09-04', dischargeDate: '2025-09-25', notes: '', status: 'reserved'},
    {id: 13, name: '임재훈', gender: 'male', condition: '재활', bed: '1003B', admissionDate: '2025-08-21', dischargeDate: '2025-09-12', notes: '', status: 'admitted'},
    {id: 14, name: '배서연', gender: 'female', condition: '암', bed: '1204A', admissionDate: '2025-08-29', dischargeDate: '2025-09-16', notes: '', status: 'admitted'},
    {id: 15, name: '송민기', gender: 'male', condition: '재활', bed: '1004A', admissionDate: '2025-09-05', dischargeDate: '2025-09-28', notes: '', status: 'reserved'},
    {id: 16, name: '전하늘', gender: 'female', condition: '암', bed: '1106B', admissionDate: '2025-08-27', dischargeDate: '2025-09-11', notes: '', status: 'admitted'},
    {id: 17, name: '노태완', gender: 'male', condition: '재활', bed: '1002B', admissionDate: '2025-08-23', dischargeDate: '2025-09-09', notes: '', status: 'admitted'},
    {id: 18, name: '유지현', gender: 'female', condition: '재활', bed: '1005C', admissionDate: '2025-09-06', dischargeDate: '2025-09-23', notes: '', status: 'reserved'},
    {id: 19, name: '홍석진', gender: 'male', condition: '암', bed: '1107A', admissionDate: '2025-08-19', dischargeDate: '2025-09-05', notes: '', status: 'admitted'},
    {id: 20, name: '문소희', gender: 'female', condition: '암', bed: '1107B', admissionDate: '2025-08-30', dischargeDate: '2025-09-17', notes: '', status: 'admitted'},
    {id: 21, name: '안준영', gender: 'male', condition: '재활', bed: '1004B', admissionDate: '2025-08-16', dischargeDate: '2025-09-03', notes: '', status: 'admitted'},
    {id: 22, name: '김나율', gender: 'female', condition: '암', bed: '1205A', admissionDate: '2025-09-07', dischargeDate: '2025-09-30', notes: '', status: 'reserved'},
    {id: 23, name: '신재호', gender: 'male', condition: '재활', bed: '1003D', admissionDate: '2025-08-31', dischargeDate: '2025-09-19', notes: '', status: 'admitted'},
    {id: 24, name: '황은비', gender: 'female', condition: '암', bed: '1205B', admissionDate: '2025-08-17', dischargeDate: '2025-09-01', notes: '', status: 'admitted'},
    {id: 25, name: '고민성', gender: 'male', condition: '재활', bed: '1004C', admissionDate: '2025-09-08', dischargeDate: '2025-10-02', notes: '', status: 'reserved'},
    {id: 26, name: '류채원', gender: 'female', condition: '암', bed: '1206A', admissionDate: '2025-08-28', dischargeDate: '2025-09-15', notes: '', status: 'admitted'},
    {id: 27, name: '이현우', gender: 'male', condition: '재활', bed: '1002C', admissionDate: '2025-08-14', dischargeDate: '2025-08-31', notes: '', status: 'admitted'},
    {id: 28, name: '박지민', gender: 'female', condition: '재활', bed: '1005D', admissionDate: '2025-09-09', dischargeDate: '2025-09-26', notes: '', status: 'reserved'},
    {id: 29, name: '정태영', gender: 'male', condition: '암', bed: '1303A', admissionDate: '2025-08-26', dischargeDate: '2025-09-13', notes: '', status: 'admitted'},
    {id: 30, name: '최수빈', gender: 'female', condition: '암', bed: '1303B', admissionDate: '2025-09-01', dischargeDate: '2025-09-21', notes: '', status: 'reserved'},
    {id: 31, name: '김도현', gender: 'male', condition: '재활', bed: '1004D', admissionDate: '2025-08-25', dischargeDate: '2025-09-11', notes: '', status: 'admitted'},
    {id: 32, name: '한예린', gender: 'female', condition: '암', bed: '1206B', admissionDate: '2025-08-20', dischargeDate: '2025-09-04', notes: '', status: 'admitted'},
    {id: 33, name: '조현민', gender: 'male', condition: '재활', bed: '1002D', admissionDate: '2025-09-10', dischargeDate: '2025-10-05', notes: '', status: 'reserved'},
    {id: 34, name: '서은지', gender: 'female', condition: '암', bed: '1304A', admissionDate: '2025-08-23', dischargeDate: '2025-09-08', notes: '', status: 'admitted'},
    {id: 35, name: '장우진', gender: 'male', condition: '암', bed: '1301A', admissionDate: '2025-09-02', dischargeDate: '2025-09-24', notes: '', status: 'reserved'},
    {id: 36, name: '임수아', gender: 'female', condition: '암', bed: '1304B', admissionDate: '2025-08-18', dischargeDate: '2025-09-03', notes: '', status: 'admitted'},
    {id: 37, name: '배준수', gender: 'male', condition: '재활', bed: '1001C', admissionDate: '2025-08-21', dischargeDate: '2025-09-07', notes: '', status: 'admitted'},
    {id: 38, name: '전민서', gender: 'female', condition: '암', bed: '1207A', admissionDate: '2025-09-11', dischargeDate: '2025-10-06', notes: '', status: 'reserved'},
    {id: 39, name: '윤성호', gender: 'male', condition: '재활', bed: '1001D', admissionDate: '2025-08-27', dischargeDate: '2025-09-14', notes: '', status: 'admitted'},
    {id: 40, name: '오다영', gender: 'female', condition: '암', bed: '1207B', admissionDate: '2025-08-24', dischargeDate: '2025-09-09', notes: '', status: 'admitted'}
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
               html += `<td class="room-cell" onclick="showBedSchedule('${bed.bed}')">${bed.bed}</td>`;
               
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
       <p><strong>병실:</strong> ${bed.room}호 (${bed.floor}층 ${bed.department === 'rehabilitation' ? '재활' : '암'})</p>
       <hr style="margin: 15px 0;">
   `;
   
   if (bedStatus.status === 'empty') {
       html += `
           <p>이 베드는 비어있습니다.</p>
           <button class="btn btn-secondary" onclick="addPatientToBed('${bedId}', '${dateStr}')" style="margin-top: 10px;">
               이 베드에 환자 추가
           </button>
       `;
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

function showBedSchedule(bedId) {
   const bed = beds.find(b => b.bed === bedId);
   const bedPatients = patients.filter(p => p.bed === bedId);
   
   const modal = document.getElementById('bedScheduleModal');
   const modalBody = document.getElementById('bedScheduleBody');
   
   let html = `
       <h3>${bedId} 예약 현황</h3>
       <div class="bed-info">
           <p><strong>병실:</strong> ${bed.room}호 (${bed.floor}층 ${bed.department === 'rehabilitation' ? '재활' : '암'})</p>
       </div>
       <hr>
   `;
   
   if (bedPatients.length === 0) {
       html += `
           <p>현재 예약된 환자가 없습니다.</p>
           <button class="btn" onclick="addPatientToBed('${bedId}', '')" style="margin-top: 10px;">
               이 베드에 환자 추가
           </button>
       `;
   } else {
       html += '<h4>예약/입원 현황:</h4>';
       bedPatients.forEach(patient => {
           const genderText = patient.gender === 'male' ? '남성' : '여성';
           const statusText = patient.status === 'admitted' ? '입원중' : '예약';
           const statusClass = patient.status === 'admitted' ? 'admitted' : 'reserved';
           
           html += `
               <div class="patient-item ${statusClass}" onclick="showPatientDetails(${patient.id})" style="cursor: pointer; margin: 8px 0;">
                   <strong>${patient.name}</strong> (${genderText}) - ${statusText}<br>
                   <small>${patient.admissionDate} ~ ${patient.dischargeDate || '미정'}</small><br>
                   <small>${patient.condition}</small>
                   ${patient.notes ? `<br><small>특이사항: ${patient.notes}</small>` : ''}
               </div>
           `;
       });
       
       html += `
           <button class="btn btn-secondary" onclick="addPatientToBed('${bedId}', '')" style="margin-top: 15px;">
               추가 환자 등록
           </button>
       `;
   }
   
   modalBody.innerHTML = html;
   modal.style.display = 'flex';
}

function addPatientToBed(bedId, dateStr = '') {
   // 모달 닫기
   document.getElementById('patientModal').style.display = 'none';
   document.getElementById('patientDetailModal').style.display = 'none';
   
   // 베드 정보 저장
   window.selectedBed = bedId;
   
   // 날짜가 지정된 경우 입원일 설정
   if (dateStr) {
       document.getElementById('admissionDate').value = dateStr;
       updateDischargeFromDuration();
   }
   
   // 폼 하이라이트
   const sidebar = document.querySelector('.sidebar');
   sidebar.scrollTop = 0;
   sidebar.style.background = '#fff3cd';
   
   setTimeout(() => {
       sidebar.style.background = '#f8f9fa';
   }, 2000);
   
   alert(`${bedId}에 환자를 등록합니다. 환자 정보를 입력해주세요.`);
}

// addPatient와 confirmReservation 함수 수정 (selectedBed 우선 사용)
function addPatient() {
   const name = document.getElementById('patientName').value;
   const gender = document.getElementById('patientGender').value;
   const condition = document.getElementById('patientCondition').value;
   const admissionDate = document.getElementById('admissionDate').value;
   const dischargeDate = document.getElementById('dischargeDate').value;
   const roomType = document.getElementById('roomType').value;
   const notes = document.getElementById('patientNotes').value;
   const status = document.getElementById('bookingType').value;
   
   if (status === 'reserved' && new Date(admissionDate) <= new Date()) {
       alert('예약은 내일 이후 날짜만 가능합니다.');
       return;
   }
   
   if (!name || !admissionDate || (!dischargeDate && !isLongtermEnabled)) {
       alert('필수 정보를 모두 입력해주세요.');
       return;
   }
   
   let selectedBed;
   
   // 미리 지정된 베드가 있으면 사용
   if (window.selectedBed) {
       selectedBed = window.selectedBed;
       window.selectedBed = null; // 초기화
   } else {
       // 추천 시스템 사용
       const startDate = new Date(admissionDate);
       const endDate = isLongtermEnabled ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
       
       const recommendations = getRecommendations(gender, condition, roomType, startDate, endDate);
       
       if (recommendations.length === 0) {
           alert('사용 가능한 병실이 없습니다.');
           return;
       }
       
       selectedBed = recommendations[0].bed;
   }
   
   if (confirmPatientRegistration(name, gender, condition, selectedBed, admissionDate, dischargeDate, notes, true)) {
       const newPatient = {
           id: patients.length + 1,
           name: name,
           gender: gender,
           condition: condition,
           bed: selectedBed,
           admissionDate: admissionDate,
           dischargeDate: isLongtermEnabled ? null : dischargeDate,
           notes: notes,
           status: status
       };
       
       patients.push(newPatient);
       saveData();
       
       document.getElementById('patientName').value = '';
       document.getElementById('patientNotes').value = '';
       document.getElementById('recommendations').style.display = 'none';
       
       generateScheduleTable();
       alert(`${name} 환자가 ${selectedBed}에 등록되었습니다.`);
   }
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


function closeBedScheduleModal() {
    document.getElementById('bedScheduleModal').style.display = 'none';
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

function getRecommendations(patientGender, patientCondition, roomType, startDate, endDate) {
    const candidates = [];
    
    // 각 bed별로 점수 계산
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
    
    // 점수순으로 정렬
    candidates.sort((a, b) => b.score - a.score);
    
    return candidates.slice(0, 5);
}

function calculateBedScore(bed, patientGender, patientCondition, roomType, startDate, endDate) {
    let score = 0;
    
    // 1. 성별 체크 (필수조건)
    if (!isGenderCompatible(bed.room, patientGender, startDate, endDate)) {
        return 0;
    }
    
    // 해당 기간에 bed가 사용 가능한지 체크
    if (!isBedAvailable(bed.bed, startDate, endDate)) {
        return 0;
    }
    
    // 2,3. 병실타입/진료과 우선순위
    const bedRoomType = getBedRoomType(bed.room);
    
    if (roomType !== 'any') {
        // 구체적 병실타입 선택시 - 병실타입 우선
        if (bedRoomType === roomType) score += 100;
        if (isConditionMatch(bed.department, patientCondition)) score += 50;
    } else {
        // "상관없음"일시 - 진료과 우선
        if (isConditionMatch(bed.department, patientCondition)) score += 100;
        score += 30;
    }
    
    // 4. 연속 가용성 체크
    if (checkContinuousBedAvailability(bed.bed, startDate, endDate)) {
        score += 200;
    } else {
        score += 10;
    }
    
    return score;
}

function isGenderCompatible(roomNumber, patientGender, startDate, endDate) {
    const roomType = getBedRoomType(roomNumber);
    
    // 1인실은 성별 무관
    if (roomType === '1인실') return true;
    
    // 다인실은 같은 방 기존 환자들과 성별 체크
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

function getBedRoomType(roomNumber) {
    const roomBeds = beds.filter(bed => bed.room === roomNumber);
    const bedCount = roomBeds.length;
    
    if (bedCount === 1) return '1인실';
    if (bedCount === 2) return '2인실';
    if (bedCount === 4) return '4인실';
    return '기타';
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

function confirmReservation(bedId) {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const notes = document.getElementById('patientNotes').value;
    
    if (!name) {
        alert('환자명을 입력해주세요.');
        return;
    }
    
    if (confirmPatientRegistration(name, gender, condition, bedId, admissionDate, dischargeDate, notes, false)) {
        const newPatient = {
            id: patients.length + 1,
            name: name,
            gender: gender,
            condition: condition,
            bed: bedId,
            admissionDate: admissionDate,
            dischargeDate: isLongtermEnabled ? null : dischargeDate,
            notes: notes,
            status: new Date(admissionDate) > new Date() ? 'reserved' : 'admitted'
        };
        
        patients.push(newPatient);
        
        // 폼 초기화
        document.getElementById('patientName').value = '';
        document.getElementById('patientNotes').value = '';
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${bedId}에 등록되었습니다.`);
    }
}

function confirmPatientRegistration(name, gender, condition, bedId, admissionDate, dischargeDate, notes, isAutoAssigned = false) {
   const genderText = gender === 'male' ? '남성' : '여성';
   const durationText = isLongtermEnabled ? '장기입원 (퇴원일 미정)' : `${admissionDate} ~ ${dischargeDate}`;
   const bedText = isAutoAssigned ? `${bedId} (자동배정)` : `${bedId}`;
   
   const confirmMessage = `환자 정보 확인\n\n환자명: ${name}\n성별: ${genderText}\n진료과: ${condition}\n베드: ${bedText}\n입원기간: ${durationText}\n특이사항: ${notes || '없음'}\n\n등록하시겠습니까?`;
   
   return confirm(confirmMessage);
}

// 페이지 로드시 저장된 데이터 불러오기
function loadData() {
    const savedPatients = localStorage.getItem('hospitalPatients');
    if (savedPatients) {
        patients = JSON.parse(savedPatients);
    }
}

// 데이터 저장
function saveData() {
    localStorage.setItem('hospitalPatients', JSON.stringify(patients));
}

// 기존 DOMContentLoaded 이벤트에 loadData 추가
document.addEventListener('DOMContentLoaded', function() {
    loadData(); // 저장된 데이터 로드
    
    const today = new Date();
    document.getElementById('admissionDate').value = today.toISOString().split('T')[0];
    
    const dischargeDate = new Date(today);
    dischargeDate.setDate(today.getDate() + 14);
    document.getElementById('dischargeDate').value = dischargeDate.toISOString().split('T')[0];
    
    generateScheduleTable();
});

// addPatient 함수 수정 (환자 추가 후 저장)
function addPatient() {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const roomType = document.getElementById('roomType').value;
    const notes = document.getElementById('patientNotes').value;
    const status = document.getElementById('admissionType').value;
    
    // 예약은 오늘 이후만 가능
    if (status === 'reserved' && new Date(admissionDate) <= new Date()) {
        alert('예약은 내일 이후 날짜만 가능합니다.');
        return;
    }
    
    if (!name || !admissionDate || (!dischargeDate && !isLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    const endDate = isLongtermEnabled ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
    
    const recommendations = getRecommendations(gender, condition, roomType, startDate, endDate);
    
    if (recommendations.length === 0) {
        alert('사용 가능한 병실이 없습니다.');
        return;
    }
    
    const selectedBed = recommendations[0].bed;
    
    if (confirmPatientRegistration(name, gender, condition, selectedBed, admissionDate, dischargeDate, notes, true)) {
        const newPatient = {
            id: patients.length + 1,
            name: name,
            gender: gender,
            condition: condition,
            bed: selectedBed,
            admissionDate: admissionDate,
            dischargeDate: isLongtermEnabled ? null : dischargeDate,
            notes: notes,
            status: status
        };
        
        patients.push(newPatient);
        saveData();
        
        document.getElementById('patientName').value = '';
        document.getElementById('patientNotes').value = '';
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${selectedBed}에 등록되었습니다.`);
    }
}

// confirmReservation 함수 수정 (환자 추가 후 저장)
function confirmReservation(bedId) {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const notes = document.getElementById('patientNotes').value;
    
    if (!name) {
        alert('환자명을 입력해주세요.');
        return;
    }
    
    if (confirmPatientRegistration(name, gender, condition, bedId, admissionDate, dischargeDate, notes, false)) {
        const newPatient = {
            id: patients.length + 1,
            name: name,
            gender: gender,
            condition: condition,
            bed: bedId,
            admissionDate: admissionDate,
            dischargeDate: isLongtermEnabled ? null : dischargeDate,
            notes: notes,
            status: new Date(admissionDate) > new Date() ? 'reserved' : 'admitted'
        };
        
        patients.push(newPatient);
        saveData(); // 데이터 저장
        
        // 폼 초기화
        document.getElementById('patientName').value = '';
        document.getElementById('patientNotes').value = '';
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${bedId}에 등록되었습니다.`);
    }
}

// 데이터 초기화 함수 (필요시 사용)
function clearAllData() {
    if (confirm('모든 환자 데이터를 삭제하시겠습니까?')) {
        localStorage.removeItem('hospitalPatients');
        patients = []; // 기본 샘플 데이터로 복원하려면 원래 배열로 설정
        generateScheduleTable();
        alert('모든 데이터가 삭제되었습니다.');
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

document.getElementById('bedScheduleModal').onclick = function(event) {
   if (event.target === this) {
       closeBedScheduleModal();
   }
}
