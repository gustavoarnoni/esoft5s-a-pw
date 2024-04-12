function guardaLocalStorage() {
  localStorage.getItem('visits')
  let visits = JSON.parse(localStorage.getItem('visits'));
  visits.count++;

  const date = new Date();
  options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
  };
  let accessDate = new Intl.DateTimeFormat("pt-BR", options).format(date);
  
  visitas.lastVisit = dataAcesso;
  localStorage.setItem('visits', JSON.stringify(visits));

  document.getElementById('contadorFooter').innerHTML = "Esta página foi visitada " + visits.count + " vezes. A última visita foi: " + visits.lastVisit;
}

guardaLocalStorage();