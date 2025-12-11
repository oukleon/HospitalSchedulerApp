// ===== 베드 이동 시스템 =====

function showBedMoveModal() {
    const modal = document.createElement('div');
    modal.className = 'bed-move-modal';
    modal.id = 'bedMoveModal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 3000; display: flex; align-items: center; justify-content: center;';
    
    const today = new Date();
    const currentPatients = patients.filter(p => {
        const admission = new Date(p.admissionDate);
        const discharge = p.dischargeDate ? new Date(p.dischargeDate) : null;
        return admission <= today && (!discharge || discharge >= today) && p.status === 'admitted';
    });
    
    let patientsHtml = '';
    if (currentPatients.length === 0) {
        patientsHtml = '<p style="text-align: center; color: #666; padding: 20px;">현재 입원 중인 환자가 없습니다.</p>';
    } else {
        currentPatients.forEach(patient => {
            const admissionDays = Math.ceil((today - new Date(patient.admissionDate)) / (1000 * 60 * 60 * 24));
            const totalDays = patient.dischargeDate ? 
                Math.ceil((new Date(patient.dischargeDate) - new Date(patient.admissionDate)) / (1000 * 60 * 60 * 24)) : '미정';
            
            patientsHtml += `
                <div style="border: 2px solid #2c5aa0; border-radius: 6px; padding: 15px; margin: 10px 0; cursor: pointer; transition: all 0.2s;" 
                     onmouseover="this.style.background='#f0f7ff'" 
                     onmouseout="this.style.background='white'"
                     onclick="selectPatientForBedMove(${patient.id})">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 16px;">${patient.name}</strong>
                            <span style="margin-left: 10px; color: #666; font-size: 14px;">
                                (${patient.gender === 'male' ? '남' : '여'}, ${patient.condition})
                            </span>
                        </div>
                        <div style="text-align: right; font-size: 13px; color: #666;">
                            <div><strong>${patient.bed}</strong></div>
                            <div>${admissionDays}일째 / 총 ${totalDays}일</div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
            <span class="close" onclick="closeBedMoveModal()">&times;</span>
            <h3>베드 이동할 환자 선택</h3>
            <div style="margin: 20px 0;">
                ${patientsHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.onclick = function(e) {
        if (e.target === modal) closeBedMoveModal();
    };
}

function selectPatientForBedMove(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    const admissionDate = new Date(patient.admissionDate);
    const dischargeDate = patient.dischargeDate ? new Date(patient.dischargeDate) : null;
    const totalDays = dischargeDate ? 
        Math.ceil((dischargeDate - admissionDate) / (1000 * 60 * 60 * 24)) : null;
    
    const modal = document.getElementById('bedMoveModal');
    modal.querySelector('.modal-content').innerHTML = `
        <span class="close" onclick="closeBedMoveModal()">&times;</span>
        <h3>베드 이동 설정</h3>
        
        <div class="patient-info" style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <strong style="color: #2c5aa0;">${patient.name}</strong> (${patient.gender === 'male' ? '남' : '여'}, ${patient.condition})<br>
            <strong>현재 베드:</strong> ${patient.bed}<br>
            <strong>입원 기간:</strong> ${patient.admissionDate} ~ ${patient.dischargeDate || '미정'} ${totalDays ? `(총 ${totalDays}일)` : ''}
        </div>
        
        <div id="bedChangesContainer">
            <div class="bed-change-row" style="border: 1px solid #ddd; border-radius: 6px; padding: 15px; margin: 15px 0;">
                <h4 style="margin: 0 0 15px 0;">베드 이동 1</h4>
                <div class="form-group">
                    <label class="form-label">이동 날짜</label>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="date" class="date-input bed-move-date" data-index="0" 
                               min="${patient.admissionDate}" 
                               ${dischargeDate ? `max="${patient.dischargeDate}"` : ''}
                               onchange="updateBedMoveDayNumber(0, ${patientId})" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        <input type="number" class="day-input bed-move-day" data-index="0" 
                               min="1" ${totalDays ? `max="${totalDays}"` : ''} 
                               onchange="updateBedMoveDate(0, ${patientId})" 
                               placeholder="일째" style="width: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; text-align: center;">
                    </div>
                    <div class="helper-text" style="font-size: 12px; color: #666; margin-top: 5px;">
                        💡 날짜 또는 일수 중 편한 방법으로 입력하세요
                    </div>
                </div>
                <div class="form-group" style="margin-top: 15px;">
                    <label class="form-label">이동할 베드</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" class="bed-move-bed" data-index="0" placeholder="베드를 선택하세요" disabled 
                               style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: #f0f0f0;">
                        <button class="btn" style="background: #17a2b8; padding: 10px 20px; margin: 0; width: auto;" 
                                onclick="selectBedForMove(0, ${patientId})">베드 선택</button>
                    </div>
                </div>
            </div>
        </div>
        
        <button class="btn" style="background: #6c757d; margin-top: 10px;" onclick="addBedChangeRow(${patientId}, ${totalDays})">
            + 추가 이동
        </button>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn" style="background: #28a745; flex: 1;" onclick="saveBedChanges(${patientId})">저장</button>
            <button class="btn" style="background: #6c757d; flex: 1;" onclick="closeBedMoveModal()">취소</button>
        </div>
    `;
    
    window.bedMoveData = {
        patientId: patientId,
        changes: [{ date: '', dayNumber: '', bed: '' }]
    };
}

function updateBedMoveDayNumber(index, patientId) {
    const patient = patients.find(p => p.id === patientId);
    const dateInput = document.querySelectorAll('.bed-move-date')[index];
    const dayInput = document.querySelectorAll('.bed-move-day')[index];
    
    if (dateInput.value) {
        const admissionDate = new Date(patient.admissionDate);
        const selectedDate = new Date(dateInput.value);
        const dayNumber = Math.ceil((selectedDate - admissionDate) / (1000 * 60 * 60 * 24)) + 1;
        dayInput.value = dayNumber;
        
        window.bedMoveData.changes[index].date = dateInput.value;
        window.bedMoveData.changes[index].dayNumber = dayNumber;
    }
}

function updateBedMoveDate(index, patientId) {
    const patient = patients.find(p => p.id === patientId);
    const dateInput = document.querySelectorAll('.bed-move-date')[index];
    const dayInput = document.querySelectorAll('.bed-move-day')[index];
    
    if (dayInput.value) {
        const admissionDate = new Date(patient.admissionDate);
        const targetDate = new Date(admissionDate);
        targetDate.setDate(admissionDate.getDate() + parseInt(dayInput.value) - 1);
        dateInput.value = formatDate(targetDate);
        
        window.bedMoveData.changes[index].date = dateInput.value;
        window.bedMoveData.changes[index].dayNumber = parseInt(dayInput.value);
    }
}

function addBedChangeRow(patientId, totalDays) {
    const container = document.getElementById('bedChangesContainer');
    const index = container.children.length;
    const patient = patients.find(p => p.id === patientId);
    
    const newRow = `
        <div class="bed-change-row" style="border: 1px solid #ddd; border-radius: 6px; padding: 15px; margin: 15px 0;">
            <h4 style="margin: 0 0 15px 0;">베드 이동 ${index + 1}</h4>
            <div class="form-group">
                <label class="form-label">이동 날짜</label>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="date" class="date-input bed-move-date" data-index="${index}" 
                           min="${patient.admissionDate}" 
                           ${patient.dischargeDate ? `max="${patient.dischargeDate}"` : ''}
                           onchange="updateBedMoveDayNumber(${index}, ${patientId})" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                    <input type="number" class="day-input bed-move-day" data-index="${index}" 
                           min="1" ${totalDays ? `max="${totalDays}"` : ''} 
                           onchange="updateBedMoveDate(${index}, ${patientId})" 
                           placeholder="일째" style="width: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; text-align: center;">
                </div>
            </div>
            <div class="form-group" style="margin-top: 15px;">
                <label class="form-label">이동할 베드</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" class="bed-move-bed" data-index="${index}" placeholder="베드를 선택하세요" disabled 
                           style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: #f0f0f0;">
                    <button class="btn" style="background: #17a2b8; padding: 10px 20px; margin: 0; width: auto;" 
                            onclick="selectBedForMove(${index}, ${patientId})">베드 선택</button>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', newRow);
    window.bedMoveData.changes.push({ date: '', dayNumber: '', bed: '' });
    
    const addBtn = document.querySelector('button[onclick^="addBedChangeRow"]');
    if (addBtn) {
        addBtn.remove();
        container.insertAdjacentHTML('afterend', `
            <button class="btn" style="background: #6c757d; margin-top: 10px;" onclick="addBedChangeRow(${patientId}, ${totalDays})">
                + 추가 이동
            </button>
        `);
    }
}

function selectBedForMove(index, patientId) {
    const patient = patients.find(p => p.id === patientId);
    const dateInputs = document.querySelectorAll('.bed-move-date');
    const moveDate = dateInputs[index].value;
    
    if (!moveDate) {
        alert('먼저 이동 날짜를 선택해주세요.');
        return;
    }
    
    window.currentBedMoveIndex = index;
    
    showBedSelectionModal({
        gender: patient.gender,
        condition: patient.condition,
        admissionDate: moveDate,
        dischargeDate: patient.dischargeDate || null,
        roomType: patient.roomType || 'any',
        isLongterm: !patient.dischargeDate,
        excludePatientId: patientId,
        title: '이동할 베드 선택',
        onSelect: 'confirmBedForMove'
    });
}

function saveBedChanges(patientId) {
    const patient = patients.find(p => p.id === patientId);
    
    const changes = window.bedMoveData.changes.filter(c => c.date && c.bed);
    
    if (changes.length === 0) {
        alert('최소 1개 이상의 베드 이동을 설정해주세요.');
        return;
    }
    
    const dates = changes.map(c => c.date);
    const uniqueDates = new Set(dates);
    if (dates.length !== uniqueDates.size) {
        alert('같은 날짜에 중복된 이동이 있습니다.');
        return;
    }
    
    changes.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const bedChanges = [];
    let currentBed = patient.bed;
    
    changes.forEach(change => {
        bedChanges.push({
            date: change.date,
            fromBed: currentBed,
            toBed: change.bed
        });
        currentBed = change.bed;
    });
    
    patient.bedChanges = bedChanges;
    
    savePatients();
    generateScheduleTable();
    closeBedMoveModal();
    
    alert(`${patient.name} 환자의 베드 이동이 저장되었습니다.\n총 ${bedChanges.length}회 이동`);
}