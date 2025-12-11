// ===== 환자 관리 =====

let editingPatientId = null;
let isEditLongtermEnabled = false;

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

    const selectedBedValue = document.getElementById('selectedBed').value;
    
    if (selectedBedValue) {
        selectedBed = selectedBedValue;
    } else if (window.selectedBed) {
        selectedBed = window.selectedBed;
    } else {

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
            roomType: roomType
        };
        patients.push(newPatient);
        window.selectedBed = null;
        
        savePatients();
        clearFormData();
       
        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${selectedBed}에 등록되었습니다.`);
    }
}

function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        alert('환자를 찾을 수 없습니다.');
        return;
    }
    
    closePatientDetailModal();
    
    document.getElementById('patientEditModal').querySelector('h3').textContent = '환자 정보 수정';
    document.querySelector('#patientEditModal button[onclick="changeBedForEdit()"]').textContent = '베드 변경';
   
    editingPatientId = patientId;
    
    document.getElementById('editPatientName').value = patient.name;
    document.getElementById('editPatientGender').value = patient.gender;
    document.getElementById('editPatientCondition').value = patient.condition;
    document.getElementById('editAdmissionDate').value = patient.admissionDate;
    document.getElementById('editPatientBed').value = patient.bed;
    document.getElementById('editPatientNotes').value = patient.notes || '';
    document.getElementById('editAdmissionType').value = patient.status;
    document.getElementById('editRoomType').value = patient.roomType || 'any';
    
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
    
    document.getElementById('patientEditModal').style.display = 'flex';
    history.pushState({modal: 'patientEdit'}, '');
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
    const roomType = document.getElementById('editRoomType').value;
    
    if (!name || !admissionDate || (!dischargeDate && !isEditLongtermEnabled)) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }
    
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
        patients[patientIndex].roomType = roomType;
        
        savePatients();
        generateScheduleTable();
        
        alert(`${name} 환자 정보가 수정되었습니다.`);
        closePatientEditModal();
    }
}

function deletePatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
        alert('환자를 찾을 수 없습니다.');
        return;
    }
    
    if (confirm(`⚠️ ${patient.name} 환자를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        patients = patients.filter(p => p.id !== patientId);
        savePatients();
        generateScheduleTable();
        alert('✅ 환자가 삭제되었습니다.');
        console.log('🗑️ 환자 삭제 완료:', patient.name);
    }
}

function deletePatientFromModal(patientId) {
    deletePatient(patientId);
    closePatientDetailModal();
}

function confirmPatientRegistration(name, gender, condition, bedId, admissionDate, dischargeDate, notes, isAutoAssigned = false) {
    const genderText = gender === 'male' ? '남성' : '여성';
    const durationText = isLongtermEnabled ? '장기입원 (퇴원일 미정)' : `${admissionDate} ~ ${dischargeDate}`;
    const bedText = isAutoAssigned ? `${bedId} (자동배정)` : `${bedId}`;
    
    const confirmMessage = `환자 정보 확인\n\n환자명: ${name}\n성별: ${genderText}\n진료과: ${condition}\n베드: ${bedText}\n입원기간: ${durationText}\n특이사항: ${notes || '없음'}\n\n등록하시겠습니까?`;
    
    return confirm(confirmMessage);
}

function addPatientToBed(bedId, dateStr = '') {
    document.getElementById('patientModal').style.display = 'none';
    document.getElementById('patientDetailModal').style.display = 'none';
    document.getElementById('bedScheduleModal').style.display = 'none';
    
    window.selectedBed = bedId;
    
    if (dateStr) {
        document.getElementById('admissionDate').value = dateStr;
        updateDischargeFromDuration();
    }
    
    const sidebar = document.querySelector('.sidebar');
    sidebar.scrollTop = 0;
    sidebar.style.background = '#fff3cd';
    
    setTimeout(() => {
        sidebar.style.background = '#f8f9fa';
    }, 2000);
    
    alert(`${bedId}에 환자를 등록합니다. 환자 정보를 입력해주세요.`);
}

function confirmReservation(bedId) {
    const name = document.getElementById('patientName').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const dischargeDate = document.getElementById('dischargeDate').value;
    const roomType = document.getElementById('roomType').value;
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
            roomType: roomType
        };
        
        patients.push(newPatient);
        savePatients();
        
        clearFormData();

        document.getElementById('recommendations').style.display = 'none';
        
        generateScheduleTable();
        alert(`${name} 환자가 ${bedId}에 등록되었습니다.`);
    }
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

function selectBed(bedId) {
    const bed = beds.find(b => b.bed === bedId);
    const roomType = getBedRoomType(bed.room);
    const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
    
    // 바로 선택
    window.selectedBed = bedId;
    document.getElementById('selectedBed').value = bedId;
    formData.selectedBed = bedId;
    closeBedSelectionModal();
    
    alert(`${bedId} (${roomType}, ${bed.floor}층 ${deptText}) 베드가 선택되었습니다.`);
}

function selectBedWithWarning(bedId, warningType) {
    const bed = beds.find(b => b.bed === bedId);
    const roomType = getBedRoomType(bed.room);
    const deptText = bed.department === 'rehabilitation' ? '재활' : '암';
    
    let warningMessage = '';
    if (warningType === 'gender') {
        warningMessage = `⚠️ 경고: 이 병실은 성별이 맞지 않습니다.\n같은 방에 다른 성별 환자가 있거나 배정될 수 있습니다.\n\n그래도 ${bedId}를 선택하시겠습니까?`;
    }
    
    if (confirm(warningMessage)) {
        window.selectedBed = bedId;
        document.getElementById('selectedBed').value = bedId;
        formData.selectedBed = bedId;
        closeBedSelectionModal();
        
        alert(`${bedId} (${roomType}, ${bed.floor}층 ${deptText}) 베드가 선택되었습니다.`);
    }
}

function savePatientFromModal() {
    if (editingPatientId === null) {
        // 새 환자 등록
        // 모달 데이터를 formData에 저장
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
        
        // 사이드바에 반영
        loadFormData();
        
        // 모달 닫기
        document.getElementById('patientEditModal').style.display = 'none';
        
        // addPatient 호출
        addPatient();
    } else {
        // 기존 환자 수정
        savePatientEdit();
    }
}

function cancelPatientModal() {
    if (editingPatientId === null) {
        // 새 환자 등록 취소 - 데이터 초기화
        if (confirm('입력한 정보를 모두 지우시겠습니까?')) {
            clearFormData();
            document.getElementById('patientEditModal').style.display = 'none';
        }
    } else {
        // 기존 환자 수정 취소 - 그냥 닫기
        closePatientEditModal();
    }
}