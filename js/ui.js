// ===== UI 렌더링 및 모달 관리 =====

const today = new Date();
let currentStartDate = new Date(today);
currentStartDate.setDate(today.getDate() - 2);

let isLongtermEnabled = false;

let formData = {
    name: '',
    gender: 'male',
    condition: '암',
    admissionDate: '',
    dischargeDate: '',
    duration: '14',
    isLongterm: false,
    admissionType: 'admitted',
    roomType: 'any',
    notes: '',
    selectedBed: ''
};

// ===== 페이지 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    
    document.getElementById('admissionDate').value = today.toISOString().split('T')[0];
    
    const dischargeDate = new Date(today);
    dischargeDate.setDate(today.getDate() + 14);
    document.getElementById('dischargeDate').value = dischargeDate.toISOString().split('T')[0];
    
    generateScheduleTable();
    addFormSyncListeners();

    document.getElementById('patientEditModal').onclick = function(event) {
        if (event.target === this) {
            closePatientEditModal();
        }
    };
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const editModal = document.getElementById('patientEditModal');
            if (editModal && editModal.style.display === 'flex') {
                closePatientEditModal();
            }
        }
    });

    // ===== 모달 외부 클릭 이벤트 =====
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

    document.getElementById('bedSelectionModal').onclick = function(event) {
        if (event.target === this) {
            closeBedSelectionModal();
        }
    }
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

// ===== 모달 표시 함수들 =====
function showBedDetails(bedId, dateStr, event) {
    event.stopPropagation();
    
    const bedStatus = getBedStatus(bedId, dateStr);
    
    if (bedStatus.status === 'empty') {
        return;
    }
    
    showPatientDetails(bedStatus.patient.id);
}

function showBedSchedule(bedId, filterMonths = 1) {
    const bed = beds.find(b => b.bed === bedId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filterDate = new Date(today);
    if (filterMonths !== 'all') {
        filterDate.setMonth(today.getMonth() - filterMonths);
    } else {
        filterDate.setFullYear(1970);
    }
    
    const bedPatients = patients.filter(p => {
        if (p.bed !== bedId) return false;
        
        const admissionDate = new Date(p.admissionDate);
        const dischargeDate = p.dischargeDate ? new Date(p.dischargeDate) : new Date('2099-12-31');
        
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
                statusText = '퇴원완료';
                statusClass = 'discharged';
            } else if (admissionDate > today) {
                statusText = '예약';
                statusClass = 'reserved';
            } else {
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
           <button class="btn" onclick="addPatientToBed('${bedId}', '')" style="margin-top: 10px;">
                이 베드에 환자 추가
            </button>
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

function showLegendModal() {
    document.getElementById('legendModal').style.display = 'flex';
}

function openNewPatientModal() {
    saveFormData();

    document.getElementById('patientEditModal').querySelector('h3').textContent = '새 환자 등록';
    document.querySelector('#patientEditModal button[onclick="changeBedForEdit()"]').textContent = '베드 선택';
    
    document.getElementById('editPatientName').value = formData.name;
    document.getElementById('editPatientGender').value = formData.gender;
    document.getElementById('editPatientCondition').value = formData.condition;
    document.getElementById('editAdmissionDate').value = formData.admissionDate;
    document.getElementById('editDischargeDate').value = formData.dischargeDate;
    document.getElementById('editDuration').value = formData.duration;
    document.getElementById('editLongtermCheck').checked = formData.isLongterm;
    document.getElementById('editAdmissionType').value = formData.admissionType;
    document.getElementById('editRoomType').value = formData.roomType;
    document.getElementById('editPatientNotes').value = formData.notes;
    document.getElementById('editPatientBed').value = formData.selectedBed;

    isEditLongtermEnabled = formData.isLongterm;
    toggleEditLongterm();
    
    document.getElementById('patientEditModal').style.display = 'flex';
    history.pushState({modal: 'patientEdit'}, '');
}

// ===== 모달 닫기 함수들 =====
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

function closePatientEditModal() {
      // ===== 모달 닫을 때 데이터 저장 =====
      if (editingPatientId === null) {
        // 새 환자 등록 모달인 경우만 데이터 저장
        formData.name = document.getElementById('editPatientName').value;
        formData.gender = document.getElementById('editPatientGender').value;
        formData.condition = document.getElementById('editPatientCondition').value;
        formData.admissionDate = document.getElementById('editAdmissionDate').value;
        formData.dischargeDate = document.getElementById('editDischargeDate').value;
        formData.duration = document.getElementById('editDuration').value;
        formData.isLongterm = document.getElementById('editLongtermCheck').checked;
        formData.admissionType = document.getElementById('editAdmissionType').value;
        formData.roomType = document.getElementById('editRoomType').value;
        formData.notes = document.getElementById('editPatientNotes').value;
        formData.selectedBed = document.getElementById('editPatientBed').value;
        
        // 사이드바에도 반영
        loadFormData();
    }
    
    document.getElementById('patientEditModal').style.display = 'none';
    editingPatientId = null;
}

function closeBedSelectionModal() {
    document.getElementById('bedSelectionModal').style.display = 'none';
}

function closeDownloadOptionModal() {
    document.getElementById('downloadOptionModal').style.display = 'none';
}

function closePatientModal(event) {
    if (event && event.target.classList.contains('patient-detail-modal')) {
        event.target.remove();
    } else if (!event) {
        document.querySelector('.patient-detail-modal').remove();
    }
}

function closeBedMoveModal() {
    const modal = document.getElementById('bedMoveModal');
    if (modal) modal.remove();
}

// ===== 날짜 이동 =====
function moveDate(days) {
    currentStartDate.setDate(currentStartDate.getDate() + days);
    generateScheduleTable();
}

function goToToday() {
    const today = new Date();
    currentStartDate = new Date(today);
    currentStartDate.setDate(today.getDate() - 2);
    generateScheduleTable();
}

// ===== 입력 폼 관련 =====
function toggleLongterm() {
    isLongtermEnabled = document.getElementById('longtermCheck').checked;
    const dischargeInput = document.getElementById('dischargeDate');
    const durationSelect = document.getElementById('duration');
    
    dischargeInput.disabled = isLongtermEnabled;
    durationSelect.disabled = isLongtermEnabled;
}

function toggleEditLongterm() {
    isEditLongtermEnabled = document.getElementById('editLongtermCheck').checked;
    const dischargeInput = document.getElementById('editDischargeDate');
    const durationSelect = document.getElementById('editDuration');
    
    dischargeInput.disabled = isEditLongtermEnabled;
    durationSelect.disabled = isEditLongtermEnabled;
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

// ===== 폼 데이터 동기화 =====
function addFormSyncListeners() {
    // 사이드바 입력 필드들
    document.getElementById('patientName').addEventListener('input', function(e) {
        formData.name = e.target.value;
    });
    
    document.getElementById('patientGender').addEventListener('change', function(e) {
        formData.gender = e.target.value;
    });
    
    document.getElementById('patientCondition').addEventListener('change', function(e) {
        formData.condition = e.target.value;
    });
    
    document.getElementById('admissionDate').addEventListener('change', function(e) {
        formData.admissionDate = e.target.value;
    });
    
    document.getElementById('dischargeDate').addEventListener('change', function(e) {
        formData.dischargeDate = e.target.value;
    });
    
    document.getElementById('duration').addEventListener('change', function(e) {
        formData.duration = e.target.value;
    });
    
    document.getElementById('longtermCheck').addEventListener('change', function(e) {
        formData.isLongterm = e.target.checked;
    });
    
    document.getElementById('admissionType').addEventListener('change', function(e) {
        formData.admissionType = e.target.value;
    });
    
    document.getElementById('roomType').addEventListener('change', function(e) {
        formData.roomType = e.target.value;
    });
    
    document.getElementById('patientNotes').addEventListener('input', function(e) {
        formData.notes = e.target.value;
    });
}

function saveFormData() {
    formData.name = document.getElementById('patientName').value;
    formData.gender = document.getElementById('patientGender').value;
    formData.condition = document.getElementById('patientCondition').value;
    formData.admissionDate = document.getElementById('admissionDate').value;
    formData.dischargeDate = document.getElementById('dischargeDate').value;
    formData.duration = document.getElementById('duration').value;
    formData.isLongterm = document.getElementById('longtermCheck').checked;
    formData.admissionType = document.getElementById('admissionType').value;
    formData.roomType = document.getElementById('roomType').value;
    formData.notes = document.getElementById('patientNotes').value;
    formData.selectedBed = document.getElementById('selectedBed').value;
}

function loadFormData() {
    document.getElementById('patientName').value = formData.name;
    document.getElementById('patientGender').value = formData.gender;
    document.getElementById('patientCondition').value = formData.condition;
    document.getElementById('admissionDate').value = formData.admissionDate;
    document.getElementById('dischargeDate').value = formData.dischargeDate;
    document.getElementById('duration').value = formData.duration;
    document.getElementById('longtermCheck').checked = formData.isLongterm;
    document.getElementById('admissionType').value = formData.admissionType;
    document.getElementById('roomType').value = formData.roomType;
    document.getElementById('patientNotes').value = formData.notes;
    document.getElementById('selectedBed').value = formData.selectedBed;
    
    isLongtermEnabled = formData.isLongterm;
    toggleLongterm();
}

function clearFormData() {
    formData = {
        name: '',
        gender: 'male',
        condition: '암',
        admissionDate: today.toISOString().split('T')[0],
        dischargeDate: '',
        duration: '14',
        isLongterm: false,
        admissionType: 'admitted',
        roomType: 'any',
        notes: '',
        selectedBed: ''
    };
    
    const dischargeDate = new Date(today);
    dischargeDate.setDate(today.getDate() + 14);
    formData.dischargeDate = dischargeDate.toISOString().split('T')[0];
    
    loadFormData();
}

// ===== 뒤로가기 처리 =====
window.addEventListener('popstate', function(e) {
    if (document.getElementById('patientEditModal').style.display === 'flex') {
        closePatientEditModal();
    }
});