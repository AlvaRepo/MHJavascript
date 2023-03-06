queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const tarjeta = data.events.find( card => card._id == id)
const div = document.querySelector ("#contenedor")
console.log(id)
div.innerHTML = `
<div class="card p-3">
    <img src="${tarjeta.image}" class="card-img-top" alt= "${tarjeta.category}">
    <h5 class= "content-fluid">${tarjeta.name}</h5>
    <div class = "card-body card-text row">
        <p><strong>Date:</strong> ${tarjeta.date}</p>
        <p><strong>Description:</strong> ${tarjeta.description}</p>
        <p><strong>Category:</strong> ${tarjeta.category}</p>
        <p><strong>Place:</strong> ${tarjeta.place}</p>
        <p><strong>Capacity:</strong> ${tarjeta.capacity}</p>
        <p><strong>Assistance:</strong> ${tarjeta.assistance}</p>
        <p><strong>Price:</strong> ${tarjeta.price}</strong></p>
    </div>
</div>
`



