// ===== 데이터 관리 =====
let patients = [];

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

function resetPatients() {
    if (confirm('⚠️ 모든 환자 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('hospitalPatients');
        patients = [];
        generateScheduleTable();
        alert('✅ 환자 데이터가 초기화되었습니다.');
        console.log('🗑️ 환자 데이터 초기화 완료');
    }
}