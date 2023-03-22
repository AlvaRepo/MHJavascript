const eventsContainer = document.getElementById('contenedorEventos');
//Elijo el contendor de las tarjetas
const message = document.createElement('p');
message.classList.add('container-fluid')
message.textContent = 'No matches to your search, you Should try to modify the filters or the search parameters. Sorry!';
message.style.display = 'none';
eventsContainer.appendChild(message);
getData();
//Creo mensaje
const searchInput = document.getElementById ("searchMach");
filtrar();
searchInput.addEventListener('input', filtrar);
categorias.addEventListener('click', filtrar);
