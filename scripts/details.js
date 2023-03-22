getData ();

queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
console.log(data);
const tarjeta = data.events.find( card => card._id == id)
const div = document.querySelector ("#contenedor")
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

async function getData(){
    try {
      //traigo los datos
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await response.json();
    console.log("se crearon las cards");
    queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
console.log(data);
const tarjeta = data.events.find( card => card._id == id)
const div = document.querySelector ("#contenedor")
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
    } catch {
    console.log('No se pudo traer la data')
    }
}



