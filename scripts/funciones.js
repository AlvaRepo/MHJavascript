//traigo la Data
async function getData(){
    try{
    //defino variables necesarias:
    let url = window.location.href;
    const eventsContainer = document.getElementById('contenedorEventos');
    let categories = [];
    let divCategories = document.getElementById('categorias');
    //traigo los datos
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await response.json();

    //creo mensaje por si no encuentra coincidencias.
    
    createCategories (data, categories, divCategories);
    const currentDate = new Date(data.currentDate); //creo la fechita actual ficticia
    for (const event of data.events) { 
        askDate(currentDate, event, eventsContainer, url);
    }
    console.log("se crearon las cards");
    return data;
    } catch {
    console.log('No se pudo traer la data')
    }
}
//Crea Categorías 
function createCategories (data, categories, divCategories){
    for (let evento of data.events) {
        if (!categories.includes(evento.category)){
        categories.push(evento.category);
        let span = document.createElement('span')
        span.classList.add('row');
        span.innerHTML = `
        <label class="checkboxesDiv mx-md-2">
            <input type='checkbox' id='${evento.category}' class='checkboxDiv' >
            <div>${evento.category}</div>
        </label>`
        divCategories.appendChild(span);
        }
    }
    console.log("se crearon categorias")
}
//Pregunto la fecha:
const askDate = (currentDate, event, eventsContainer, url) =>{
    let fecha = new Date(event.date); //paso el texto a formato fecha para comparar
    if (fecha < currentDate && url.includes("pastEvents.html")){ // Caso de ser Pasada
        let card = document.createElement('div'); 
        card.classList.add('card');
        card.name = event.category;
        createCard(event, card); //llamo al procedimiento para crear tarjeta
        eventsContainer.appendChild(card);
    }else if (fecha > currentDate && url.includes("upcoming-events.html")){ // Caso de ser Futura
        let card = document.createElement('div'); 
        card.classList.add('card');
        card.name = event.category;
        createCard(event, card); //llamo al procedimiento para crear tarjeta
        eventsContainer.appendChild(card);
    }else if (url.includes("index.html")){
        let card = document.createElement('div'); 
        card.classList.add('card');
        card.name = event.category;
        createCard(event, card); //llamo al procedimiento para crear tarjeta
        eventsContainer.appendChild(card);
    }
}
//Crea tarjeta
const createCard = (card, div) => {
    // Creo la imágen
    const image = document.createElement('img');
    image.src = card.image;
    image.classList.add('card-img-top');
    div.appendChild(image);
    //Creo el título
    const title = document.createElement('h5'); 
    //traigo el nombre (contenido) de la DDBB
    title.textContent = card.name; 
    title.classList.add('card-title');
    //Creo la descripción
    const description = document.createElement('p');
    description.textContent = card.description;
    description.classList.add("card-text");
    description.classList.add("card-body");
    const cardFooter = document.createElement("div");
    const cardPrice = document.createElement("div");
    cardPrice.classList.add("pricePrin");
    cardPrice.textContent = ("Price: ") + card.price;
    const cardButton = document.createElement("a");
    cardButton.href = "./details.html?id="+card._id;
    cardButton.textContent = ("Details");
    cardFooter.appendChild(cardPrice);
    cardFooter.appendChild(cardButton);
    cardButton.classList.add("btn");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("flex-row-reverse");
    cardFooter.classList.add("row");
    //Agrego los elementos ordenados
    div.appendChild(image);
    div.appendChild(title); // Agrega el elemento title como último hijo del elemento card
    div.appendChild(description); 
    div.appendChild(cardFooter);
    div.id = card._id;
    div.dataset.filter = card.category;
}
// Filtra de acuerdo a lo obtenido del DOM, luego ejecuta la función de messageHidden para ver que ondis
function filtrar() {
    let checkboxes = document.querySelectorAll("input[type='checkbox'");
    // Obtener todas las categorías seleccionadas
    let categoriasSeleccionadas = Array.from(checkboxes).filter(boton => boton.checked).map(boton => boton.id);

    // Obtener todos los elementos que deben ser filtrados
    let elementosFiltrados = document.querySelectorAll(".card");

    // Iterar sobre los elementos y mostrarlos si corresponden al criterio de búsqueda y a las categorías seleccionadas
    elementosFiltrados.forEach(elemento => {
        let nombre = elemento.innerHTML.replace(/<[^>]*>/g, '').toLowerCase(); //use la expresión regular que elimina las etiquetas de html. Agregué el "g" para que elimine de toda la cadena de texto (me daba el error que al buscar sin este filtro tomaba los "<>" y los "div")
        let categoria = elemento.dataset.filter;
        if ((nombre.includes(searchInput.value) || searchInput.value.toLowerCase() === '') && (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria))) {
            elemento.style.display = 'block';
        }else {
            elemento.style.display = 'none';
        }     
        messageHidden(eventsContainer);  
    })
}
// Muestra el mensaje de que modifique los términos de búsqueda
function messageHidden(eventsContainer) {
    let eventos = eventsContainer.children;
    let tieneElementos = false;
    let i = 1;
    while (i < eventos.length) {
        let estilo = window.getComputedStyle(eventos[i]);
        if (estilo.display === 'block') {
            tieneElementos = true;
        }
        i++;
    }
    if (!tieneElementos) {
    message.style.display = 'block';
    } else {
    message.style.display = 'none';
    }
}
