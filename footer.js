function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');
  
    if (!visitData) {
      visitData = { count: 0, lastVisit: new Date().toLocaleString('pt-BR') };
    } else {
      visitData = JSON.parse(visitData);
    }
  
    visitData.count++;
    visitData.lastVisit = new Date().toLocaleString('pt-BR');
  
    localStorage.setItem('visitData', JSON.stringify(visitData));
  }
  
  function displayVisitInfo() {
    const visitData = JSON.parse(localStorage.getItem('visitData'));
  
    if (visitData) {
      const visitInfoParagraph = document.getElementById('visitInfo');
      visitInfoParagraph.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
    }
  }
  
  updateVisitCounter();
  displayVisitInfo();