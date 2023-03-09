//Elijo el contendor de las tarjetas
const eventsContainer = document.getElementById('contenedorEventos');
const currentDate = new Date(data.currentDate); //creo la fechita actual ficticia
let categories = [];
let divCategories = document.getElementById('categorias');
//creo mensaje por si no encuentra coincidencias.
const message = document.createElement('p');
message.classList.add('container-fluid')
message.textContent = 'No matches to your search, you Should try to modify the filters or the search parameters. Sorry!';
eventsContainer.appendChild(message);
message.style.display = 'none';

//creo las categorías
createCategories (data, categories, divCategories);


//recorro con un ciclo for la DDBB
for (const event of data.events) { 
        let fecha = new Date(event.date) //paso el texto a formato fecha para comparar
            // Creo la Tarjeta ("card desde ahora")
            let card = document.createElement('div'); 
            card.classList.add('card');
            card.name = event.category;
            createCard(event, card); //llamo al procedimiento para crear tarjeta
            eventsContainer.appendChild(card);
        
}

let checkboxes = document.querySelectorAll("input[type='checkbox']")
const searchInput = document.getElementById ("searchMach");

checkboxes.forEach(boton => boton.addEventListener('change',filtrar));
searchInput.addEventListener('keyup', filtrar);

