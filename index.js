const API = 'https://rickandmortyapi.com/api/character/';

const getData = (apiURL) => {
  return fetch(apiURL)
    .then(response => response.json())
    .then(json => {
      printData(json),
        printPagination(json.info)
    })

  console.log("json -->", json)
}


const printData = (data) => {
  let html = '';
  data.results.forEach(c => {
    html += '<div class="col mt-5">';
    html += '<div class= "card" style="width: 13rem;">'
    html += `<img src="${c.image}" class="card-img-top" alt="...">`
    html += '<div class="card-body">'
    html += `<h5 class="card-title">${c.name}</h5>`
    html += `<p class="card-text">Genero: ${c.gender}</p>`
    html += `<p class="card-text">Especie: ${c.species}</p>`
    html += '</div>'

    html += '</div>'
    html += '</div>'
  });
  document.getElementById('infoCharecters').innerHTML = html
}

//botones prev y next

const printPagination = (info) => {

  let preDisable = info.prev == null ? 'disabled' : '';
  let nextDisable = info.next == null ? 'disabled' : '';

  let html = `<li class="page-item ${preDisable} "><a class= "page-link" onclick="getData('${info.prev}')" >Previous</a></li>`
  html += `<li class="page-item ${nextDisable} "><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`
  document.getElementById('pagination').innerHTML = html;
}

getData(API);