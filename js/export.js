// ===== 데이터 입출력 =====

function showDownloadOptions() {
    if (patients.length === 0) {
        alert('저장된 환자 데이터가 없습니다.');
        return;
    }
    
    const modal = document.getElementById('downloadOptionModal');
    const countText = modal.querySelector('p strong');
    if (countText) {
        countText.textContent = `${patients.length}명`;
    }
    modal.style.display = 'flex';
}

function exportPatients(format) {
    if (patients.length === 0) {
        alert('저장된 환자 데이터가 없습니다.');
        return;
    }
    
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (format === 'json') {
        const dataStr = JSON.stringify(patients, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `hospital-patients-${dateStr}.json`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        closeDownloadOptionModal();
        alert(`✅ JSON 형식으로 ${patients.length}명의 환자 데이터가 다운로드되었습니다.`);
        
    } else if (format === 'excel') {
        const excelData = patients.map(patient => {
            const bed = beds.find(b => b.bed === patient.bed);
            return {
                'ID': patient.id,
                '환자명': patient.name,
                '성별': patient.gender === 'male' ? '남성' : '여성',
                '진료과': patient.condition,
                '베드': patient.bed,
                '층': bed ? bed.floor : '',
                '병실타입': patient.roomType === 'any' ? '상관없음' : patient.roomType,
                '입원일': patient.admissionDate,
                '퇴원일': patient.dischargeDate || '미정',
                '상태': patient.status === 'admitted' ? '입원중' : '예약',
                '특이사항': patient.notes || ''
            };
        });
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        
        ws['!cols'] = [
            { wch: 6 },
            { wch: 12 },
            { wch: 8 },
            { wch: 10 },
            { wch: 10 },
            { wch: 6 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
            { wch: 10 },
            { wch: 20 }
        ];
        
        XLSX.utils.book_append_sheet(wb, ws, '환자목록');
        XLSX.writeFile(wb, `hospital-patients-${dateStr}.xlsx`);
        
        closeDownloadOptionModal();
        alert(`✅ Excel 형식으로 ${patients.length}명의 환자 데이터가 다운로드되었습니다.`);
    }
}

function importPatients(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.json')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (!Array.isArray(importedData)) {
                    alert('❌ 올바른 형식의 환자 데이터가 아닙니다.');
                    return;
                }
                
                const isValid = importedData.every(patient => 
                    patient.name && patient.gender && patient.bed && patient.admissionDate
                );
                
                if (!isValid) {
                    alert('❌ 데이터에 필수 정보가 누락되어 있습니다.');
                    return;
                }
                
                const confirmMsg = `현재 저장된 환자: ${patients.length}명\n업로드할 환자: ${importedData.length}명\n\n⚠️ 기존 데이터를 덮어쓰시겠습니까?\n(기존 데이터는 삭제됩니다)`;
                
                if (confirm(confirmMsg)) {
                    patients = importedData;
                    savePatients();
                    generateScheduleTable();
                    alert(`✅ ${patients.length}명의 환자 데이터가 업로드되었습니다.`);
                }
                
            } catch (error) {
                console.error('Import error:', error);
                alert('❌ 파일을 읽는 중 오류가 발생했습니다.\nJSON 형식이 올바른지 확인해주세요.');
            }
        };
        
        reader.onerror = function() {
            alert('❌ 파일을 읽을 수 없습니다.');
        };
        
        reader.readAsText(file);
    }
    else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                
                const importedData = jsonData.map(row => {
                    return {
                        id: row['ID'] || patients.length + 1,
                        name: row['환자명'],
                        gender: row['성별'] === '남성' ? 'male' : 'female',
                        condition: row['진료과'],
                        bed: row['베드'],
                        roomType: row['병실타입'] === '상관없음' ? 'any' : (row['병실타입'] || 'any'),
                        admissionDate: row['입원일'],
                        dischargeDate: row['퇴원일'] === '미정' ? null : row['퇴원일'],
                        status: row['상태'] === '입원중' ? 'admitted' : 'reserved',
                        notes: row['특이사항'] || ''
                    };
                });
                
                const isValid = importedData.every(patient => 
                    patient.name && patient.gender && patient.bed && patient.admissionDate
                );
                
                if (!isValid) {
                    alert('❌ Excel 파일에 필수 정보가 누락되어 있습니다.\n(환자명, 성별, 베드, 입원일은 필수입니다)');
                    return;
                }
                
                const confirmMsg = `현재 저장된 환자: ${patients.length}명\n업로드할 환자: ${importedData.length}명\n\n⚠️ 기존 데이터를 덮어쓰시겠습니까?\n(기존 데이터는 삭제됩니다)`;
                
                if (confirm(confirmMsg)) {
                    patients = importedData;
                    savePatients();
                    generateScheduleTable();
                    alert(`✅ ${patients.length}명의 환자 데이터가 업로드되었습니다.`);
                }
                
            } catch (error) {
                console.error('Excel import error:', error);
                alert('❌ Excel 파일을 읽는 중 오류가 발생했습니다.\n파일 형식을 확인해주세요.');
            }
        };
        
        reader.onerror = function() {
            alert('❌ 파일을 읽을 수 없습니다.');
        };
        
        reader.readAsArrayBuffer(file);
    }
    else {
        alert('❌ JSON 또는 Excel 파일만 업로드 가능합니다.');
    }
    
    event.target.value = '';
}