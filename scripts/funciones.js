
//Crea Categorías 
function createCategories (data, categories, divCategories){
    for (let evento of data.events) {
        if (!categories.includes(evento.category)){
        let span = document.createElement('span')
        span.classList.add('row');
        categories.push(evento.category);
        span.innerHTML = `
        <label class="checkboxesDiv mx-md-2">
            <input type='checkbox')" id='${evento.category}'>
            <div>${evento.category}</div>
        </label>`
        divCategories.appendChild(span);
        
        }
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
    return card;
}
// Filtra de acuerdo a lo obtenido del DOM, luego ejecuta la función de messageHidden para ver que ondis
function filtrar() {
    // Obtener todas las categorías seleccionadas
    let categoriasSeleccionadas = Array.from(checkboxes).filter(boton => boton.checked).map(boton => boton.id);

    // Obtener todos los elementos que deben ser filtrados
    let elementosFiltrados = document.querySelectorAll(".card");

    // Iterar sobre los elementos y mostrarlos si corresponden al criterio de búsqueda y a las categorías seleccionadas
    elementosFiltrados.forEach(elemento => {
        let nombre = elemento.innerHTML.toLowerCase();
        let categoria = elemento.dataset.filter;
        
        if ((nombre.includes(searchInput.value) || searchInput.value.toLowerCase() === '') && (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria))) {
            elemento.style.display = 'block';
        }else {
            elemento.style.display = 'none';
        }
        
        
    }
    )
    messageHidden(eventsContainer);
}
// Muestra el mensaje de que modifique los términos de búsqueda
function messageHidden (eventsContainer) {
    let eventos = eventsContainer.children;
    let tieneElementos = false;
    let i = 1;
    while (!tieneElementos && i < eventos.length){
        if (eventsContainer.children[i].style.display == 'block'){
            tieneElementos = true;
        };
        i++
    }
    if (!tieneElementos) {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}
