queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const tarjeta = data.events.find( card => card._id == id)
const div = document.querySelector ("#contenedor")
console.log(id)
div.innerHTML = `
<div class="card p-4">
    <img src="${tarjeta.image}" class="img-fluid" alt= "${tarjeta.category}">
    <h5 class= "content-fluid p-3 text-center">${tarjeta.name}</h5>
    <div class = "d-flex row card-body ">
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



