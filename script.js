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

let patients = [];

let today = new Date();
let currentStartDate = new Date(today);
currentStartDate.setDate(today.getDate() - 2);

let isLongtermEnabled = false;

// ===== 페이지 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    loadPatients(); // 저장된 데이터 로드
    
    const today = new Date();
    document.getElementById('admissionDate').value = today.toISOString().split('T')[0];
    
    const dischargeDate = new Date(today);
    dischargeDate.setDate(today.getDate() + 14);
    document.getElementById('dischargeDate').value = dischargeDate.toISOString().split('T')[0];
    
    generateScheduleTable();
});

// ===== 스케줄 테이블 생성 =====
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
                   
                   // 빈 베드면 클릭 이벤트 없음, 환자 있으면 클릭 가능
                   const clickEvent = bedStatus.status === 'empty' ? '' : `onclick="showBedDetails('${bed.bed}', '${dateStr}', event)"`;
                   const cursorStyle = bedStatus.status === 'empty' ? 'cursor: default;' : 'cursor: pointer;';
                   
                   html += `<td class="schedule-cell" data-bed="${bed.bed}" data-date="${dateStr}" ${clickEvent} style="${cursorStyle}">`;
                   
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

// ===== 모달 관련 함수들 =====
function showBedDetails(bedId, dateStr, event) {
   event.stopPropagation();
   
   const bedStatus = getBedStatus(bedId, dateStr);
   
   // 빈 베드면 아무것도 안 함
   if (bedStatus.status === 'empty') {
       return;
   }
   
   // 환자가 있으면 바로 환자 상세 모달 표시
   showPatientDetails(bedStatus.patient.id);
}

function showBedSchedule(bedId, filterMonths = 1) {
   const bed = beds.find(b => b.bed === bedId);
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   
   // 필터 기간 계산
   const filterDate = new Date(today);
   if (filterMonths !== 'all') {
       filterDate.setMonth(today.getMonth() - filterMonths);
   } else {
       filterDate.setFullYear(1970); // 전체
   }
   
   // 필터링된 환자 목록
   const bedPatients = patients.filter(p => {
       if (p.bed !== bedId) return false;
       
       const admissionDate = new Date(p.admissionDate);
       const dischargeDate = p.dischargeDate ? new Date(p.dischargeDate) : new Date('2099-12-31');
       
       // 필터 날짜 이후에 입원했거나, 필터 날짜 이전에 입원했지만 퇴원이 필터 날짜 이후인 경우
       return dischargeDate >= filterDate;
   });
   
   const modal = document.getElementById('bedScheduleModal');
   const modalBody = document.getElementById('bedScheduleBody');
   
   let html = `
       <h3>${bedId} 예약 현황</h3>
       <div class="bed-info">
           <p><strong>병실:</strong> ${bed.room}호 (${bed.floor}층 ${bed.department === 'rehabilitation' ? '재활' : '암'})</p>
       </div>
       <hr>
       <div style="margin: 10px 0; display: flex; gap: 5px; align-items: center;">
           <span style="font-size: 13px; color: #666; margin-right: 5px;">기간:</span>
           <button style="padding: 4px 10px; font-size: 11px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; ${filterMonths === 1 ? 'background: #2c5aa0; color: white; border-color: #2c5aa0;' : 'background: white; color: #333;'}" 
                   onclick="showBedSchedule('${bedId}', 1)">1개월</button>
           <button style="padding: 4px 10px; font-size: 11px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; ${filterMonths === 3 ? 'background: #2c5aa0; color: white; border-color: #2c5aa0;' : 'background: white; color: #333;'}" 
                   onclick="showBedSchedule('${bedId}', 3)">3개월</button>
           <button style="padding: 4px 10px; font-size: 11px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; ${filterMonths === 6 ? 'background: #2c5aa0; color: white; border-color: #2c5aa0;' : 'background: white; color: #333;'}" 
                   onclick="showBedSchedule('${bedId}', 6)">6개월</button>
           <button style="padding: 4px 10px; font-size: 11px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; ${filterMonths === 12 ? 'background: #2c5aa0; color: white; border-color: #2c5aa0;' : 'background: white; color: #333;'}" 
                   onclick="showBedSchedule('${bedId}', 12)">1년</button>
           <button style="padding: 4px 10px; font-size: 11px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; ${filterMonths === 'all' ? 'background: #2c5aa0; color: white; border-color: #2c5aa0;' : 'background: white; color: #333;'}" 
                   onclick="showBedSchedule('${bedId}', 'all')">전체</button>
       </div>
       <hr style="margin-top: 10px;">
   `;
   
   if (bedPatients.length === 0) {
       html += `
           <p>선택한 기간 내 예약된 환자가 없습니다.</p>
           <button class="btn" onclick="addPatientToBed('${bedId}', '')" style="margin-top: 10px;">
               이 베드에 환자 추가
           </button>
       `;
   } else {
       html += `<h4>예약/입원 현황 (${bedPatients.length}명):</h4>`;
       bedPatients.forEach(patient => {
           const genderText = patient.gender === 'male' ? '남성' : '여성';
           const dischargeDate = patient.dischargeDate ? new Date(patient.dischargeDate) : null;
           const admissionDate = new Date(patient.admissionDate);
           
           let statusText, statusClass;
           
           if (dischargeDate && dischargeDate < today) {
               // 이미 퇴원한 경우
               statusText = '퇴원완료';
               statusClass = 'discharged';
           } else if (admissionDate > today) {
               // 미래 예약
               statusText = '예약';
               statusClass = 'reserved';
           } else {
               // 현재 입원중
               statusText = '입원중';
               statusClass = 'admitted';
           }
           
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
   document.getElementById('bedScheduleModal').style.display = 'none';
   
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
       <div style="text-align: center; padding: 15px 0 5px 0;">
           <a style="color: #999; font-size: 12px; text-decoration: underline; cursor: pointer;" 
              onmouseover="this.style.color='#dc3545'" 
              onmouseout="this.style.color='#999'"
              onclick="deletePatientFromModal(${patient.id})">이 환자 정보 삭제</a>
       </div>
       <div style="border-top: 1px solid #eee; padding: 15px 0 0 0; display: flex; justify-content: space-between;">
           <button class="btn" style="background: #28a745;" onclick="editPatient(${patient.id})">수정</button>
           <button class="btn btn-secondary" onclick="closePatientDetailModal()">닫기</button>
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

// ===== 날짜 및 유틸리티 함수 =====
function moveDate(days) {
   currentStartDate.setDate(currentStartDate.getDate() + days);
   generateScheduleTable();
}

function formatDate(date) {
   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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

// ===== 환자 추가 및 추천 시스템 =====
function addPatient() {
   const name = document.getElementById('patientName').value;
   const gender = document.getElementById('patientGender').value;
   const condition = document.getElementById('patientCondition').value;
   const admissionDate = document.getElementById('admissionDate').value;
   const dischargeDate = document.getElementById('dischargeDate').value;
   const roomType = document.getElementById('roomType').value;
   const notes = document.getElementById('patientNotes').value;
   const status = document.getElementById('admissionType').value;
   
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
   
   if (confirmPatientRegistration(name, gender, condition, selectedBed, admissionDate, dischargeDate, notes)) {
       // 새 환자 추가
       const newPatient = {
           id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
           name: name,
           gender: gender,
           condition: condition,
           bed: selectedBed,
           admissionDate: admissionDate,
           dischargeDate: isLongtermEnabled ? null : dischargeDate,
           notes: notes,
           status: status,
           roomType: roomType  // ← 추가
       };
       patients.push(newPatient);
       window.selectedBed = null;
       
       savePatients();
       
       document.getElementById('patientName').value = '';
       document.getElementById('patientNotes').value = '';
       document.getElementById('recommendations').style.display = 'none';
       
       generateScheduleTable();
       alert(`${name} 환자가 ${selectedBed}에 등록되었습니다.`);
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
    const roomType = document.getElementById('roomType').value;  // ← 추가
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
            status: new Date(admissionDate) > new Date() ? 'reserved' : 'admitted',
            roomType: roomType  // ← 추가
        };
        
        patients.push(newPatient);
        savePatients();
        
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

// ===== 데이터 저장/로드 =====
function savePatients() {
    try {
        localStorage.setItem('hospitalPatients', JSON.stringify(patients));
        console.log('✅ 환자 데이터 저장 완료:', patients.length, '명');
    } catch (e) {
        console.error('❌ 환자 데이터 저장 실패:', e);
        alert('데이터 저장에 실패했습니다. 브라우저 저장소를 확인해주세요.');
    }
}

function loadPatients() {
    try {
        const saved = localStorage.getItem('hospitalPatients');
        if (saved) {
            patients = JSON.parse(saved);
            console.log('✅ 환자 데이터 불러오기 완료:', patients.length, '명');
        } else {
            patients = [];
            console.log('📦 새로운 병원 시스템 시작');
        }
    } catch (e) {
        console.error('❌ 환자 데이터 불러오기 실패:', e);
        patients = [];
    }
}

function deletePatient(patientId) {
    // 1. 삭제할 환자 찾기
    const patient = patients.find(p => p.id === patientId);
    
    // 2. 환자가 없으면 에러 처리
    if (!patient) {
        alert('환자를 찾을 수 없습니다.');
        return; // 함수 종료
    }
    
    // 3. 사용자에게 확인 받기 (환자 이름 보여주기)
    if (confirm(`⚠️ ${patient.name} 환자를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        // 4. 확인하면 삭제
        patients = patients.filter(p => p.id !== patientId);
        savePatients(); // localStorage에 저장
        generateScheduleTable(); // 화면 업데이트
        alert('✅ 환자가 삭제되었습니다.');
        console.log('🗑️ 환자 삭제 완료:', patient.name); // 디버깅 로그
    }
    // 5. 취소하면 아무것도 안 함
}

function deletePatientFromModal(patientId) {
    deletePatient(patientId);
    closePatientDetailModal(); // 삭제 후 모달 닫기
}

let editingPatientId = null;
let isEditLongtermEnabled = false;

function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        alert('환자를 찾을 수 없습니다.');
        return;
    }
    
    // 모달 닫기
    closePatientDetailModal();
    
    // 전역 변수에 편집 중인 환자 ID 저장
    editingPatientId = patientId;
    
    // 모달 폼에 환자 정보 입력
    document.getElementById('editPatientName').value = patient.name;
    document.getElementById('editPatientGender').value = patient.gender;
    document.getElementById('editPatientCondition').value = patient.condition;
    document.getElementById('editAdmissionDate').value = patient.admissionDate;
    document.getElementById('editPatientBed').value = patient.bed;
    document.getElementById('editPatientNotes').value = patient.notes || '';
    document.getElementById('editAdmissionType').value = patient.status;
    document.getElementById('editRoomType').value = patient.roomType || 'any';  // ← 추가
    
    if (patient.dischargeDate) {
        document.getElementById('editDischargeDate').value = patient.dischargeDate;
        document.getElementById('editLongtermCheck').checked = false;
        isEditLongtermEnabled = false;
        document.getElementById('editDischargeDate').disabled = false;
        document.getElementById('editDuration').disabled = false;
        updateEditDurationFromDischarge();
    } else {
        document.getElementById('editDischargeDate').value = '';
        document.getElementById('editLongtermCheck').checked = true;
        isEditLongtermEnabled = true;
        document.getElementById('editDischargeDate').disabled = true;
        document.getElementById('editDuration').disabled = true;
    }
    
    // 모달 표시
    document.getElementById('patientEditModal').style.display = 'flex';
}

function savePatientEdit() {
    if (editingPatientId === null) return;
    
    const name = document.getElementById('editPatientName').value;
    const gender = document.getElementById('editPatientGender').value;
    const condition = document.getElementById('editPatientCondition').value;
    const admissionDate = document.getElementById('editAdmissionDate').value;
    const dischargeDate = document.getElementById('editDischargeDate').value;
    const notes = document.getElementById('editPatientNotes').value;
    const status = document.getElementById('editAdmissionType').value;
    const bed = document.getElementById('editPatientBed').value;
    const roomType = document.getElementById('editRoomType').value;  // ← 추가
    
    if (!name || !admissionDate || (!dischargeDate && !isEditLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
    // 환자 정보 업데이트
    const patientIndex = patients.findIndex(p => p.id === editingPatientId);
    if (patientIndex !== -1) {
        patients[patientIndex].name = name;
        patients[patientIndex].gender = gender;
        patients[patientIndex].condition = condition;
        patients[patientIndex].bed = bed;
        patients[patientIndex].admissionDate = admissionDate;
        patients[patientIndex].dischargeDate = isEditLongtermEnabled ? null : dischargeDate;
        patients[patientIndex].notes = notes;
        patients[patientIndex].status = status;
        patients[patientIndex].roomType = roomType;  // ← 추가
        
        savePatients();
        generateScheduleTable();
        
        alert(`${name} 환자 정보가 수정되었습니다.`);
        closePatientEditModal();
    }
}

function closePatientEditModal() {
    document.getElementById('patientEditModal').style.display = 'none';
    editingPatientId = null;
}

function toggleEditLongterm() {
    isEditLongtermEnabled = document.getElementById('editLongtermCheck').checked;
    const dischargeInput = document.getElementById('editDischargeDate');
    const durationSelect = document.getElementById('editDuration');
    
    dischargeInput.disabled = isEditLongtermEnabled;
    durationSelect.disabled = isEditLongtermEnabled;
}

function updateEditDischargeFromDuration() {
    const admissionDate = document.getElementById('editAdmissionDate').value;
    const duration = document.getElementById('editDuration').value;
    
    if (admissionDate && duration && !isEditLongtermEnabled) {
        const startDate = new Date(admissionDate);
        const endDate = new Date(startDate);
        
        if (duration === '60+') {
            endDate.setDate(startDate.getDate() + 61);
        } else {
            endDate.setDate(startDate.getDate() + parseInt(duration));
        }
        
        document.getElementById('editDischargeDate').value = endDate.toISOString().split('T')[0];
    }
}

function updateEditDurationFromDischarge() {
    const admissionDate = document.getElementById('editAdmissionDate').value;
    const dischargeDate = document.getElementById('editDischargeDate').value;
    const durationSelect = document.getElementById('editDuration');

    if (admissionDate && dischargeDate && !isEditLongtermEnabled) {
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
document.getElementById('patientEditModal').onclick = function(event) {
    if (event.target === this) {
        closePatientEditModal();
    }
}

function changeBedForEdit() {
    const admissionDate = document.getElementById('editAdmissionDate').value;
    const dischargeDate = document.getElementById('editDischargeDate').value;
    const gender = document.getElementById('editPatientGender').value;
    const condition = document.getElementById('editPatientCondition').value;
    const roomType = document.getElementById('editRoomType').value;  // ← 추가
    
    if (!admissionDate || (!dischargeDate && !isEditLongtermEnabled)) {
        alert('입원 날짜를 먼저 확인해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    const endDate = isEditLongtermEnabled ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
    
    // 현재 편집 중인 환자는 제외하고 베드 체크
    const originalPatients = [...patients];
    const tempPatients = patients.filter(p => p.id !== editingPatientId);
    patients = tempPatients;
    
    // 가능한 베드 찾기
    const bedList = beds.map(bed => {
        const available = isBedAvailable(bed.bed, startDate, endDate);
        const genderOk = isGenderCompatible(bed.room, gender, startDate, endDate);
        const conditionMatch = isConditionMatch(bed.department, condition);
        const roomTypeMatch = roomType === 'any' || getBedRoomType(bed.room) === roomType;  // ← 추가
        
        let status, reason, score = 0;
        
        if (!available) {
            status = 'unavailable';
            reason = '기간 중 사용 중';
        } else if (!genderOk) {
            status = 'incompatible';
            reason = '성별 불일치';
        } else if (conditionMatch && roomTypeMatch) {  // ← 수정
            status = 'recommended';
            reason = '추천';
            score = 100;
        } else {
            status = 'available';
            reason = '사용 가능';
            score = 50;
        }
        
        return {
            bed: bed.bed,
            room: bed.room,
            floor: bed.floor,
            department: bed.department,
            score: score,
            status: status,
            reason: reason
        };
    });
    
    // 원래 환자 데이터 복원
    patients = originalPatients;
    
    bedList.sort((a, b) => {
        const order = { recommended: 0, available: 1, incompatible: 2, unavailable: 3 };
        if (order[a.status] !== order[b.status]) {
            return order[a.status] - order[b.status];
        }
        return b.score - a.score;
    });
    
    displayBedSelectionForEdit(bedList);
}

function confirmSplitAdmissionForEdit(combo) {
    alert('수정 모드에서는 분할 입원 변경이 복잡하여 지원하지 않습니다.\n\n기존 환자를 삭제하고 새로 등록해주세요.');
    // 나중에 구현할 수 있음
}

function displayBedSelectionForEdit(bedList) {
    const modal = document.getElementById('bedSelectionModal');
    const modalBody = document.getElementById('bedSelectionBody');
    
    const recommended = bedList.filter(b => b.status === 'recommended').length;
    const available = bedList.filter(b => b.status === 'available').length;
    const incompatible = bedList.filter(b => b.status === 'incompatible').length;
    const unavailable = bedList.filter(b => b.status === 'unavailable').length;
    
    let html = `
        <h3>베드 변경</h3>
        <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0;">
            <small>
                <span style="color: #28a745;">✓ 추천 ${recommended}개</span> | 
                <span style="color: #17a2b8;">○ 가능 ${available}개</span> | 
                <span style="color: #fd7e14;">△ 성별불일치 ${incompatible}개</span> | 
                <span style="color: #6c757d;">× 사용중 ${unavailable}개</span>
            </small>
        </div>
        <div style="max-height: 400px; overflow-y: auto;">
    `;
    
    bedList.forEach(bed => {
        const roomTypeText = getBedRoomType(bed.room);
        const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
        const disabledStyle = bed.status === 'unavailable' ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;';
        
        let icon, color, borderColor, clickEvent;
        if (bed.status === 'recommended') {
            icon = '✓';
            color = '#28a745';
            borderColor = '#28a745';
            clickEvent = `onclick="selectBedForEdit('${bed.bed}')"`;
        } else if (bed.status === 'available') {
            icon = '○';
            color = '#17a2b8';
            borderColor = '#17a2b8';
            clickEvent = `onclick="selectBedForEdit('${bed.bed}')"`;
        } else if (bed.status === 'incompatible') {
            icon = '△';
            color = '#fd7e14';
            borderColor = '#fd7e14';
            clickEvent = `onclick="selectBedForEditWithWarning('${bed.bed}', 'gender')"`;
        } else {
            icon = '×';
            color = '#6c757d';
            borderColor = '#6c757d';
            clickEvent = '';
        }
        
        html += `
            <div style="border: 2px solid ${borderColor}; border-radius: 6px; padding: 12px; margin: 8px 0; ${disabledStyle}" ${clickEvent}>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 20px; color: ${color}; margin-right: 8px;">${icon}</span>
                        <strong style="font-size: 16px;">${bed.bed}</strong>
                        <span style="margin-left: 8px; color: #666; font-size: 13px;">
                            ${roomTypeText}, ${bed.floor}층 ${deptText}
                        </span>
                    </div>
                    <div style="font-size: 12px; color: ${color};">
                        ${bed.reason}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // 추천이 없을 때만 분할 입원 버튼 표시
    if (recommended === 0) {
        html += `
            <div style="border-top: 2px solid #ddd; margin-top: 15px; padding-top: 15px;">
                <button id="splitAdmissionBtn" class="btn" style="background: #6f42c1; width: 100%;" onclick="toggleSplitAdmissions('edit')">
                    🔍 분할 입원 가능 여부 확인하기
                </button>
                <div id="splitAdmissionsResult"></div>
            </div>
        `;
    }
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function selectBedForEdit(bedId) {
    document.getElementById('editPatientBed').value = bedId;
    closeBedSelectionModal();
    alert(`베드가 ${bedId}로 변경되었습니다. 저장 버튼을 눌러 확정해주세요.`);
}

function selectBedForEditWithWarning(bedId, warningType) {
    let warningMessage = '';
    if (warningType === 'gender') {
        warningMessage = `⚠️ 경고: 이 병실은 성별이 맞지 않습니다.\n같은 방에 다른 성별 환자가 있거나 배정될 수 있습니다.\n\n그래도 베드를 ${bedId}로 변경하시겠습니까?`;
    }
    
    if (confirm(warningMessage)) {
        document.getElementById('editPatientBed').value = bedId;
        closeBedSelectionModal();
        alert(`베드가 ${bedId}로 변경되었습니다. 저장 버튼을 눌러 확정해주세요.`);
    }
}
function resetPatients() {
    if (confirm('⚠️ 모든 환자 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('hospitalPatients');
        patients = [];
        generateScheduleTable();
        alert('✅ 환자 데이터가 초기화되었습니다.');
        console.log('🗑️ 환자 데이터 초기화 완료');
    }
}

// 오늘로 가기
function goToToday() {
    const today = new Date();
    currentStartDate = new Date(today);
    currentStartDate.setDate(today.getDate() - 2); // 오늘이 3번째 열
    generateScheduleTable();
}

// ===== 모달 외부 클릭시 닫기 =====
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
// ===== 가능한 병실 찾기 시스템 =====
function findAvailableBeds() {
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const roomType = document.getElementById('roomType').value;
    
    if (!admissionDate || (!dischargeDate && !isLongtermEnabled)) {
        alert('입원 날짜를 먼저 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    const endDate = isLongtermEnabled ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
    
    // 모든 베드 평가
    const bedList = beds.map(bed => {
        const available = isBedAvailable(bed.bed, startDate, endDate);
        const genderOk = isGenderCompatible(bed.room, gender, startDate, endDate);
        const conditionMatch = isConditionMatch(bed.department, condition);
        const roomTypeMatch = roomType === 'any' || getBedRoomType(bed.room) === roomType;
        
        let status, reason, score = 0;
        
        // 1. 사용 중 → X (최우선)
        if (!available) {
            status = 'unavailable';
            reason = '기간 중 사용 중';
        }
        // 2. 성별 불일치 → X
        else if (!genderOk) {
            status = 'incompatible';
            reason = '성별 불일치';
        }
        // 3. 모든 조건 만족 → 추천
        else if (conditionMatch && roomTypeMatch) {
            status = 'recommended';
            reason = '추천';
            score = 100;
        }
        // 4. 일부 조건만 만족 → 가능
        else {
            status = 'available';
            reason = '사용 가능';
            score = 50;
        }
        
        return {
            bed: bed.bed,
            room: bed.room,
            floor: bed.floor,
            department: bed.department,
            score: score,
            status: status,
            reason: reason
        };
    });
    
    // 정렬: 추천 > 사용가능 > 불일치 > 사용중
    bedList.sort((a, b) => {
        const order = { recommended: 0, available: 1, incompatible: 2, unavailable: 3 };
        if (order[a.status] !== order[b.status]) {
            return order[a.status] - order[b.status];
        }
        return b.score - a.score;
    });
    
    displayBedSelection(bedList);
}

function displayBedSelection(bedList) {
    const modal = document.getElementById('bedSelectionModal');
    const modalBody = document.getElementById('bedSelectionBody');
    
    const recommended = bedList.filter(b => b.status === 'recommended').length;
    const available = bedList.filter(b => b.status === 'available').length;
    const incompatible = bedList.filter(b => b.status === 'incompatible').length;
    const unavailable = bedList.filter(b => b.status === 'unavailable').length;
    
    let html = `
        <h3>가능한 병실 선택</h3>
        <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0;">
            <small>
                <span style="color: #28a745;">✓ 추천 ${recommended}개</span> | 
                <span style="color: #17a2b8;">○ 가능 ${available}개</span> | 
                <span style="color: #fd7e14;">△ 성별불일치 ${incompatible}개</span> | 
                <span style="color: #6c757d;">× 사용중 ${unavailable}개</span>
            </small>
        </div>
        <div style="max-height: 400px; overflow-y: auto;">
    `;
    
    bedList.forEach(bed => {
        const roomTypeText = getBedRoomType(bed.room);
        const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
        const disabledStyle = bed.status === 'unavailable' ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;';
        
        let icon, color, borderColor, clickEvent;
        if (bed.status === 'recommended') {
            icon = '✓';
            color = '#28a745';
            borderColor = '#28a745';
            clickEvent = `onclick="selectBed('${bed.bed}')"`;
        } else if (bed.status === 'available') {
            icon = '○';
            color = '#17a2b8';
            borderColor = '#17a2b8';
            clickEvent = `onclick="selectBed('${bed.bed}')"`;
        } else if (bed.status === 'incompatible') {
            icon = '△';
            color = '#fd7e14';
            borderColor = '#fd7e14';
            clickEvent = `onclick="selectBedWithWarning('${bed.bed}', 'gender')"`;
        } else {
            icon = '×';
            color = '#6c757d';
            borderColor = '#6c757d';
            clickEvent = '';
        }
        
        html += `
            <div style="border: 2px solid ${borderColor}; border-radius: 6px; padding: 12px; margin: 8px 0; ${disabledStyle}" ${clickEvent}>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 20px; color: ${color}; margin-right: 8px;">${icon}</span>
                        <strong style="font-size: 16px;">${bed.bed}</strong>
                        <span style="margin-left: 8px; color: #666; font-size: 13px;">
                            ${roomTypeText}, ${bed.floor}층 ${deptText}
                        </span>
                    </div>
                    <div style="font-size: 12px; color: ${color};">
                        ${bed.reason}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // 추천이 없을 때만 분할 입원 버튼 표시
    if (recommended === 0) {
        html += `
            <div style="border-top: 2px solid #ddd; margin-top: 15px; padding-top: 15px;">
                <button id="splitAdmissionBtn" class="btn" style="background: #6f42c1; width: 100%;" onclick="toggleSplitAdmissions('new')">
                    🔍 분할 입원 가능 여부 확인하기
                </button>
                <div id="splitAdmissionsResult"></div>
            </div>
        `;
    }
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function toggleSplitAdmissions(mode) {
    const resultDiv = document.getElementById('splitAdmissionsResult');
    const btn = document.getElementById('splitAdmissionBtn');
    
    // 이미 열려있으면 닫기
    if (resultDiv.innerHTML !== '') {
        resultDiv.innerHTML = '';
        btn.textContent = '🔍 분할 입원 가능 여부 확인하기';
        btn.style.background = '#6f42c1';
        return;
    }
    
    // 닫혀있으면 열기
    findSplitAdmissions(mode);
}

function findSplitAdmissions(mode) {
    let gender, condition, admissionDate, dischargeDate, roomType;
    
    if (mode === 'edit') {
        gender = document.getElementById('editPatientGender').value;
        condition = document.getElementById('editPatientCondition').value;
        admissionDate = document.getElementById('editAdmissionDate').value;
        dischargeDate = document.getElementById('editDischargeDate').value;
        roomType = document.getElementById('editRoomType').value;
        
        if (isEditLongtermEnabled) {
            alert('장기입원은 분할 입원을 지원하지 않습니다.');
            return;
        }
    } else {
        gender = document.getElementById('patientGender').value;
        condition = document.getElementById('patientCondition').value;
        admissionDate = document.getElementById('admissionDate').value;
        dischargeDate = document.getElementById('dischargeDate').value;
        roomType = document.getElementById('roomType').value;
        
        if (isLongtermEnabled) {
            alert('장기입원은 분할 입원을 지원하지 않습니다.');
            return;
        }
    }
    
    const startDate = new Date(admissionDate);
    const endDate = new Date(dischargeDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const btn = document.getElementById('splitAdmissionBtn');  // ← event.target 대신 getElementById 사용
    btn.disabled = true;
    btn.textContent = '검색 중...';
    btn.style.background = '#999';
    
    // 현재 편집 중인 환자 제외 (edit 모드일 때)
    let originalPatients = null;
    if (mode === 'edit' && editingPatientId) {
        originalPatients = [...patients];
        patients = patients.filter(p => p.id !== editingPatientId);
    }
    
    // 모든 가능한 2분할 조합 찾기
    const combinations = [];
    
    for (let splitDay = 1; splitDay < totalDays; splitDay++) {
        const midDate = new Date(startDate);
        midDate.setDate(startDate.getDate() + splitDay);
        
        // 첫 번째 기간에 사용 가능한 베드
        const firstPeriodBeds = beds.filter(bed => {
            const available = isBedAvailable(bed.bed, startDate, midDate);
            const genderOk = isGenderCompatible(bed.room, gender, startDate, midDate);
            return available && genderOk;
        });
        
        // 두 번째 기간에 사용 가능한 베드
        const secondPeriodStart = new Date(midDate);
        secondPeriodStart.setDate(midDate.getDate() + 1);
        const secondPeriodBeds = beds.filter(bed => {
            const available = isBedAvailable(bed.bed, secondPeriodStart, endDate);
            const genderOk = isGenderCompatible(bed.room, gender, secondPeriodStart, endDate);
            return available && genderOk;
        });
        
        // 조합 생성
        firstPeriodBeds.forEach(bed1 => {
            secondPeriodBeds.forEach(bed2 => {
                // 같은 베드로 연속되는 경우는 제외 (의미없음)
                if (bed1.bed === bed2.bed) return;
                
                const score = calculateSplitScore(bed1, bed2, condition, roomType);
                
                combinations.push({
                    bed1: bed1,
                    bed2: bed2,
                    splitDay: splitDay,
                    period1Days: splitDay,
                    period2Days: totalDays - splitDay,
                    startDate: formatDate(startDate),
                    midDate: formatDate(midDate),
                    endDate: formatDate(endDate),
                    score: score
                });
            });
        });
    }
    
    // 원래 환자 데이터 복원 (edit 모드일 때)
    if (originalPatients) {
        patients = originalPatients;
    }
    
    // 점수순 정렬
    combinations.sort((a, b) => b.score - a.score);
    
    // 상위 5개만 표시
    const topCombinations = combinations.slice(0, 5);
    
    displaySplitAdmissions(topCombinations, gender, condition, roomType, mode);
}

function displaySplitAdmissions(combinations, gender, condition, roomType, mode) {
    const resultDiv = document.getElementById('splitAdmissionsResult');
    const btn = document.getElementById('splitAdmissionBtn');
    
    btn.disabled = false;
    btn.textContent = '✕ 분할 입원 결과 닫기';
    btn.style.background = '#dc3545';
    
    if (combinations.length === 0) {
        resultDiv.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 15px; text-align: center; margin-top: 15px;">
                <strong>⚠️ 분할 입원 가능한 조합을 찾을 수 없습니다.</strong>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">날짜를 조정하거나 조건을 변경해보세요.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="background: #e7f3ff; border: 1px solid #2196F3; border-radius: 6px; padding: 12px; margin: 15px 0 10px 0;">
            <strong style="color: #1976D2;">📋 분할 입원 가능 조합 ${combinations.length}개 발견</strong>
        </div>
        <div style="max-height: 300px; overflow-y: auto;">
    `;
    
    combinations.forEach((combo, index) => {
        const bed1Info = beds.find(b => b.bed === combo.bed1.bed);
        const bed2Info = beds.find(b => b.bed === combo.bed2.bed);
        
        const bed1RoomType = getBedRoomType(bed1Info.room);
        const bed2RoomType = getBedRoomType(bed2Info.room);
        const bed1Dept = bed1Info.department === 'rehabilitation' ? '재활' : '암';
        const bed2Dept = bed2Info.department === 'rehabilitation' ? '재활' : '암';
        
        const bed1ConditionMatch = isConditionMatch(bed1Info.department, condition);
        const bed2ConditionMatch = isConditionMatch(bed2Info.department, condition);
        const bed1RoomMatch = roomType === 'any' || getBedRoomType(bed1Info.room) === roomType;
        const bed2RoomMatch = roomType === 'any' || getBedRoomType(bed2Info.room) === roomType;
        
        const isRecommended = bed1ConditionMatch && bed2ConditionMatch && bed1RoomMatch && bed2RoomMatch;
        const badge = isRecommended ? '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 8px;">⭐ 추천</span>' : '';
        
        const clickHandler = mode === 'edit' ? 
            `confirmSplitAdmissionForEdit(${JSON.stringify(combo).replace(/"/g, '&quot;')})` :
            `confirmSplitAdmission(${JSON.stringify(combo).replace(/"/g, '&quot;')})`;
        
        html += `
            <div style="border: 2px solid ${isRecommended ? '#28a745' : '#ddd'}; border-radius: 8px; padding: 15px; margin: 10px 0; background: white;">
                <div style="font-weight: bold; margin-bottom: 10px; font-size: 15px;">
                    조합 ${index + 1}${badge}
                </div>
                <div style="margin-left: 10px;">
                    <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                        <strong>1단계:</strong> ${combo.startDate} ~ ${combo.midDate} (${combo.period1Days}일)
                        <br>→ <strong>${combo.bed1.bed}</strong> (${bed1RoomType}, ${bed1Info.floor}층 ${bed1Dept})
                    </div>
                    <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                        <strong>2단계:</strong> ${combo.midDate}부터 ${combo.endDate}까지 (${combo.period2Days}일)
                        <br>→ <strong>${combo.bed2.bed}</strong> (${bed2RoomType}, ${bed2Info.floor}층 ${bed2Dept})
                    </div>
                </div>
                <button class="btn" style="background: #2196F3; margin-top: 10px; width: 100%;" 
                        onclick='${clickHandler}'>
                    이 조합으로 ${mode === 'edit' ? '변경' : '등록'}하기
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

function findSplitAdmissions(mode) {
    let gender, condition, admissionDate, dischargeDate, roomType;
    
    if (mode === 'edit') {
        gender = document.getElementById('editPatientGender').value;
        condition = document.getElementById('editPatientCondition').value;
        admissionDate = document.getElementById('editAdmissionDate').value;
        dischargeDate = document.getElementById('editDischargeDate').value;
        roomType = document.getElementById('editRoomType').value;
        
        if (isEditLongtermEnabled) {
            alert('장기입원은 분할 입원을 지원하지 않습니다.');
            return;
        }
    } else {
        gender = document.getElementById('patientGender').value;
        condition = document.getElementById('patientCondition').value;
        admissionDate = document.getElementById('admissionDate').value;
        dischargeDate = document.getElementById('dischargeDate').value;
        roomType = document.getElementById('roomType').value;
        
        if (isLongtermEnabled) {
            alert('장기입원은 분할 입원을 지원하지 않습니다.');
            return;
        }
    }
    
    const startDate = new Date(admissionDate);
    const endDate = new Date(dischargeDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const btn = document.getElementById('splitAdmissionBtn');  // ← event.target 대신 getElementById 사용
    btn.disabled = true;
    btn.textContent = '검색 중...';
    btn.style.background = '#999';
    
    // 현재 편집 중인 환자 제외 (edit 모드일 때)
    let originalPatients = null;
    if (mode === 'edit' && editingPatientId) {
        originalPatients = [...patients];
        patients = patients.filter(p => p.id !== editingPatientId);
    }
    
    // 모든 가능한 2분할 조합 찾기
    const combinations = [];
    
    for (let splitDay = 1; splitDay < totalDays; splitDay++) {
        const midDate = new Date(startDate);
        midDate.setDate(startDate.getDate() + splitDay);
        
        // 첫 번째 기간에 사용 가능한 베드
        const firstPeriodBeds = beds.filter(bed => {
            const available = isBedAvailable(bed.bed, startDate, midDate);
            const genderOk = isGenderCompatible(bed.room, gender, startDate, midDate);
            return available && genderOk;
        });
        
        // 두 번째 기간에 사용 가능한 베드
        const secondPeriodStart = new Date(midDate);
        secondPeriodStart.setDate(midDate.getDate() + 1);
        const secondPeriodBeds = beds.filter(bed => {
            const available = isBedAvailable(bed.bed, secondPeriodStart, endDate);
            const genderOk = isGenderCompatible(bed.room, gender, secondPeriodStart, endDate);
            return available && genderOk;
        });
        
        // 조합 생성
        firstPeriodBeds.forEach(bed1 => {
            secondPeriodBeds.forEach(bed2 => {
                // 같은 베드로 연속되는 경우는 제외 (의미없음)
                if (bed1.bed === bed2.bed) return;
                
                const score = calculateSplitScore(bed1, bed2, condition, roomType);
                
                combinations.push({
                    bed1: bed1,
                    bed2: bed2,
                    splitDay: splitDay,
                    period1Days: splitDay,
                    period2Days: totalDays - splitDay,
                    startDate: formatDate(startDate),
                    midDate: formatDate(midDate),
                    endDate: formatDate(endDate),
                    score: score
                });
            });
        });
    }
    
    // 원래 환자 데이터 복원 (edit 모드일 때)
    if (originalPatients) {
        patients = originalPatients;
    }
    
    // 점수순 정렬
    combinations.sort((a, b) => b.score - a.score);
    
    // 상위 5개만 표시
    const topCombinations = combinations.slice(0, 5);
    
    displaySplitAdmissions(topCombinations, gender, condition, roomType, mode);
}

function calculateSplitScore(bed1, bed2, condition, roomType) {
    let score = 0;
    
    // 진료과 일치도
    const bed1ConditionMatch = isConditionMatch(bed1.department, condition);
    const bed2ConditionMatch = isConditionMatch(bed2.department, condition);
    if (bed1ConditionMatch && bed2ConditionMatch) score += 100;
    else if (bed1ConditionMatch || bed2ConditionMatch) score += 50;
    
    // 병실타입 일치도
    if (roomType !== 'any') {
        const bed1RoomMatch = getBedRoomType(bed1.room) === roomType;
        const bed2RoomMatch = getBedRoomType(bed2.room) === roomType;
        if (bed1RoomMatch && bed2RoomMatch) score += 80;
        else if (bed1RoomMatch || bed2RoomMatch) score += 40;
    }
    
    // 같은 층이면 가산점
    if (bed1.floor === bed2.floor) score += 30;
    
    // 같은 방이면 더 큰 가산점 (같은 병실 내 베드 이동)
    if (bed1.room === bed2.room) score += 50;
    
    return score;
}

function displaySplitAdmissions(combinations, gender, condition, roomType) {
    const resultDiv = document.getElementById('splitAdmissionsResult');
    
    if (combinations.length === 0) {
        resultDiv.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 15px; text-align: center;">
                <strong>⚠️ 분할 입원 가능한 조합을 찾을 수 없습니다.</strong>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">날짜를 조정하거나 조건을 변경해보세요.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="background: #e7f3ff; border: 1px solid #2196F3; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
            <strong style="color: #1976D2;">📋 분할 입원 가능 조합 ${combinations.length}개 발견</strong>
        </div>
    `;
    
    combinations.forEach((combo, index) => {
        const bed1Info = beds.find(b => b.bed === combo.bed1.bed);
        const bed2Info = beds.find(b => b.bed === combo.bed2.bed);
        
        const bed1RoomType = getBedRoomType(bed1Info.room);
        const bed2RoomType = getBedRoomType(bed2Info.room);
        const bed1Dept = bed1Info.department === 'rehabilitation' ? '재활' : '암';
        const bed2Dept = bed2Info.department === 'rehabilitation' ? '재활' : '암';
        
        const bed1ConditionMatch = isConditionMatch(bed1Info.department, condition);
        const bed2ConditionMatch = isConditionMatch(bed2Info.department, condition);
        const bed1RoomMatch = roomType === 'any' || getBedRoomType(bed1Info.room) === roomType;
        const bed2RoomMatch = roomType === 'any' || getBedRoomType(bed2Info.room) === roomType;
        
        const isRecommended = bed1ConditionMatch && bed2ConditionMatch && bed1RoomMatch && bed2RoomMatch;
        const badge = isRecommended ? '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 8px;">⭐ 추천</span>' : '';
        
        html += `
            <div style="border: 2px solid ${isRecommended ? '#28a745' : '#ddd'}; border-radius: 8px; padding: 15px; margin: 10px 0; background: white;">
                <div style="font-weight: bold; margin-bottom: 10px; font-size: 15px;">
                    조합 ${index + 1}${badge}
                </div>
                <div style="margin-left: 10px;">
                    <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                        <strong>1단계:</strong> ${combo.startDate} ~ ${combo.midDate} (${combo.period1Days}일)
                        <br>→ <strong>${combo.bed1.bed}</strong> (${bed1RoomType}, ${bed1Info.floor}층 ${bed1Dept})
                    </div>
                    <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                        <strong>2단계:</strong> ${combo.midDate}부터 ${combo.endDate}까지 (${combo.period2Days}일)
                        <br>→ <strong>${combo.bed2.bed}</strong> (${bed2RoomType}, ${bed2Info.floor}층 ${bed2Dept})
                    </div>
                </div>
                <button class="btn" style="background: #2196F3; margin-top: 10px; width: 100%;" 
                        onclick='confirmSplitAdmission(${JSON.stringify(combo)})'>
                    이 조합으로 등록하기
                </button>
            </div>
        `;
    });
    
    resultDiv.innerHTML = html;
}

function confirmSplitAdmission(combo) {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const roomType = document.getElementById('roomType').value;
    const notes = document.getElementById('patientNotes').value;
    const status = document.getElementById('admissionType').value;
    
    if (!name) {
        alert('환자명을 입력해주세요.');
        return;
    }
    
    const confirmMsg = `${name} 환자를 분할 입원으로 등록하시겠습니까?\n\n` +
                       `1단계: ${combo.startDate} ~ ${combo.midDate} (${combo.period1Days}일)\n` +
                       `   → ${combo.bed1.bed}\n\n` +
                       `2단계: ${combo.midDate}부터 ${combo.endDate}까지 (${combo.period2Days}일)\n` +
                       `   → ${combo.bed2.bed}`;
    
    if (!confirm(confirmMsg)) return;
    
    // 첫 번째 환자 등록
    const patient1 = {
        id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
        name: name,
        gender: gender,
        condition: condition,
        bed: combo.bed1.bed,
        admissionDate: combo.startDate,
        dischargeDate: combo.midDate,
        notes: notes + ' [분할입원 1/2]',
        status: status,
        roomType: roomType,
        transferTo: combo.bed2.bed  // 이동 정보
    };
    
    // 두 번째 환자 등록
    const midDatePlus1 = new Date(combo.midDate);
    midDatePlus1.setDate(midDatePlus1.getDate() + 1);
    
    const patient2 = {
        id: patient1.id + 1,
        name: name,
        gender: gender,
        condition: condition,
        bed: combo.bed2.bed,
        admissionDate: formatDate(midDatePlus1),
        dischargeDate: combo.endDate,
        notes: notes + ' [분할입원 2/2]',
        status: status,
        roomType: roomType,
        transferFrom: combo.bed1.bed  // 이동 정보
    };
    
    patients.push(patient1);
    patients.push(patient2);
    
    savePatients();
    
    // 폼 초기화
    document.getElementById('patientName').value = '';
    document.getElementById('patientNotes').value = '';
    document.getElementById('recommendations').style.display = 'none';
    
    closeBedSelectionModal();
    generateScheduleTable();
    
    alert(`${name} 환자가 분할 입원으로 등록되었습니다.\n1단계: ${combo.bed1.bed}\n2단계: ${combo.bed2.bed}`);
}

function selectBedWithWarning(bedId, warningType) {
    const bed = beds.find(b => b.bed === bedId);
    const roomType = getBedRoomType(bed.room);
    const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
    const name = document.getElementById('patientName').value;
    
    if (!name) {
        alert('환자명을 입력해주세요.');
        return;
    }
    
    let warningMessage = '';
    if (warningType === 'gender') {
        warningMessage = `⚠️ 경고: 이 병실은 성별이 맞지 않습니다.\n같은 방에 다른 성별 환자가 있거나 배정될 수 있습니다.\n\n그래도 ${name} 환자를 ${bedId} (${roomType}, ${bed.floor}층 ${deptText})에 등록하시겠습니까?`;
    }
    
    if (confirm(warningMessage)) {
        window.selectedBed = bedId;
        closeBedSelectionModal();
        addPatient();
    }
}

function selectBed(bedId) {
    const bed = beds.find(b => b.bed === bedId);
    const roomType = getBedRoomType(bed.room);
    const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
    
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
    
    if (confirm(`${name} 환자를 ${bedId} (${roomType}, ${bed.floor}층 ${deptText})에 등록하시겠습니까?`)) {
        window.selectedBed = bedId;
        closeBedSelectionModal();
        
        // 바로 등록 실행
        addPatient();
    }
}

function closeBedSelectionModal() {
    document.getElementById('bedSelectionModal').style.display = 'none';
}

// 모달 외부 클릭 이벤트 추가
document.getElementById('bedSelectionModal').onclick = function(event) {
    if (event.target === this) {
        closeBedSelectionModal();
    }
}
