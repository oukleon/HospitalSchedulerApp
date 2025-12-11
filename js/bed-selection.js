// ===== 베드 선택 시스템 =====

function showBedSelectionModal(config) {
    const { gender, condition, admissionDate, dischargeDate, roomType, isLongterm, excludePatientId, title, onSelect } = config;
    
    if (!admissionDate || (!dischargeDate && !isLongterm)) {
        alert('입원 날짜를 먼저 입력해주세요.');
        return;
    }
    
    const startDate = new Date(admissionDate);
    const endDate = isLongterm ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(dischargeDate);
    
    let originalPatients;
    if (excludePatientId) {
        originalPatients = [...patients];
        patients = patients.filter(p => p.id !== excludePatientId);
    }
    
    const bedList = beds.map(bed => {
        const available = isBedAvailable(bed.bed, startDate, endDate);
        const genderOk = isGenderCompatible(bed.room, gender, startDate, endDate);
        const conditionMatch = isConditionMatch(bed.department, condition);
        const roomTypeMatch = roomType === 'any' || getBedRoomType(bed.room) === roomType;
        
        let status, reason, score = 0;
        
        if (!available) {
            status = 'unavailable';
            reason = '기간 중 사용 중';
        } else if (!genderOk) {
            status = 'incompatible';
            reason = '성별 불일치';
        } else if (conditionMatch && roomTypeMatch) {
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
    
    if (excludePatientId) {
        patients = originalPatients;
    }
    
    bedList.sort((a, b) => {
        const order = { recommended: 0, available: 1, incompatible: 2, unavailable: 3 };
        if (order[a.status] !== order[b.status]) {
            return order[a.status] - order[b.status];
        }
        return b.score - a.score;
    });
    
    displayBedSelection(bedList, title, onSelect);
}

function displayBedSelection(bedList, title, onSelect) {
    const modal = document.getElementById('bedSelectionModal');
    const modalBody = document.getElementById('bedSelectionBody');
    
    const recommended = bedList.filter(b => b.status === 'recommended').length;
    const available = bedList.filter(b => b.status === 'available').length;
    const incompatible = bedList.filter(b => b.status === 'incompatible').length;
    const unavailable = bedList.filter(b => b.status === 'unavailable').length;
    
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0;">${title}</h3>
            <select id="bedSortOrder" onchange="sortBedList()" style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; margin-right: 15px;">
                <option value="recommended">정렬: 추천순</option>
                <option value="bed">정렬: 베드 순서</option>
            </select>
        </div>
        <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
            <small>
                <span style="color: #28a745;">✓ 추천 ${recommended}개</span> | 
                <span style="color: #17a2b8;">○ 가능 ${available}개</span> | 
                <span style="color: #fd7e14;">△ 성별불일치 ${incompatible}개</span> | 
                <span style="color: #6c757d;">× 사용중 ${unavailable}개</span>
            </small>
            <a href="javascript:void(0)" onclick="showBedMoveModal()" style="color: #2c5aa0; font-size: 13px; text-decoration: none; margin-right: 15px;">베드 이동</a>
        </div>
        <div id="bedListContainer" style="max-height: 400px; overflow-y: auto;">
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
            clickEvent = `onclick="${onSelect}('${bed.bed}')"`;
        } else if (bed.status === 'available') {
            icon = '○';
            color = '#17a2b8';
            borderColor = '#17a2b8';
            clickEvent = `onclick="${onSelect}('${bed.bed}')"`;
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
            <div class="bed-item" data-bed="${bed.bed}" data-status="${bed.status}" style="border: 2px solid ${borderColor}; border-radius: 6px; padding: 12px; margin: 8px 0; ${disabledStyle}" ${clickEvent}>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 20px; color: ${color}; margin-right: 8px;">${icon}</span>
                        <strong style="font-size: 16px;">${bed.bed}</strong>
                        <span style="margin-left: 8px; color: #666; font-size: 13px;">
                            ${roomTypeText}, ${bed.floor}층 ${deptText}
                        </span>
                    </div>
                    <span style="color: ${color}; font-size: 13px;">${bed.reason}</span>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
    
    window.currentBedList = bedList;
    window.currentOnSelect = onSelect;
}

function sortBedList() {
    const sortOrder = document.getElementById('bedSortOrder').value;
    const bedListContainer = document.getElementById('bedListContainer');
    const bedItems = Array.from(bedListContainer.querySelectorAll('.bed-item'));
    
    if (sortOrder === 'recommended') {
        bedItems.sort((a, b) => {
            const order = { recommended: 0, available: 1, incompatible: 2, unavailable: 3 };
            const statusA = a.dataset.status;
            const statusB = b.dataset.status;
            return order[statusA] - order[statusB];
        });
    } else {
        bedItems.sort((a, b) => {
            const bedA = a.dataset.bed;
            const bedB = b.dataset.bed;
            return bedA.localeCompare(bedB);
        });
    }
    
    bedListContainer.innerHTML = '';
    bedItems.forEach(item => bedListContainer.appendChild(item));
}

function confirmBedForMove(bedId) {
    const index = window.currentBedMoveIndex;
    const bedInputs = document.querySelectorAll('.bed-move-bed');
    bedInputs[index].value = bedId;
    window.bedMoveData.changes[index].bed = bedId;
    closeBedSelectionModal();
}