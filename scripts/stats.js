getStats()
async function getStats(){
    try{
    //obtengo los contenedores de la tabla
    const eventStats = document.getElementById('eventStats');
    const pastEvents = document.getElementById('pastStats');
    const pastStats = document.getElementById('upComStats');
    //traigo los datos
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await response.json();
    //declaro array de eventos pasados y eventos futuros
    const pasados = getpastEvents(data);
    const futuros = getfutureEvents(data);
    let categories = getCategFunc2(data);
    let mayor = highestPerc(pasados);
    let menor = lowestPerc(pasados);
    //creo la unica row de la primera parte (son 3 col, no creo que sea necesaria una función)
    const eStatsRow = document.createElement('tr');
    eStatsRow.innerHTML = `
        <td>${mayor.name}: ${(getPoA(mayor).toFixed(1))}%</td>
        <td>${menor.name}: ${(getPoA(menor).toFixed(1))}%</td>
        <td>${mayor.name}: ${mayor.capacity}</td>`;
    eventStats.appendChild(eStatsRow);
    createStats(categories, pasados);
    atachStats(categories, pastEvents);
    
    createStats(categories, futuros);
    atachStats(categories, pastStats);

    console.log("se trajo la data");
    } catch {
    //creo mensaje por si no encuentra coincidencias.
    console.log('No se pudo traer la data')
    }
}

function getpastEvents(data) { //obtengo eventos pasados
    const currentDate = new Date(data.currentDate);
    return data.events.filter(evento => new Date(evento.date) < currentDate);
}
function getfutureEvents(data) { // obtengo eventos futuros
    const currentDate = new Date(data.currentDate);
    return data.events.filter(evento => new Date(evento.date) > currentDate);
}
function getCategObj(data) { // obtengo eventos futuros (versión mas simple del ya usado en funciones)
    let categories = {};
    for (let evento of data.events) {
        if (!categories.includes(evento.category)){
        categories.push(evento.category);
        }

    }
    return categories;
}
function getCategFunc2(data) { //Crea un objeto que contiene las categorías
    return data.events.reduce((categories, evento) => {
    if (!categories[evento.category]) {
        //aca le doy las propiedades de revenue, asistencia y capacity para que puedan ser completadas mas adelante
        categories[evento.category] = { 
            price: evento.price,
            assistance: evento.assistance,
            capacity: evento.capacity }; 
    } else {
        categories[evento.category].price += evento.price;
        categories[evento.category].assistance += evento.assistance;
        categories[evento.category].capacity += evento.capacity;
    }
    return categories;
    }, {});
}
function highestPerc(pasados){    // obtengo el porcentaje mas alto de eventos
    let mayor = pasados.reduce((highest, actual) => {
        const highestPoA = getPoA(highest);
        const actualPoA = getPoA(actual);
        return highestPoA < actualPoA ? actual : highest;
    })
    return mayor;
}
function lowestPerc(pasados){    // obtengo el porcentaje mas alto de eventos
    let menor = pasados.reduce((lowest, actual) => {
        const lowestPoA = getPoA(lowest);
        const actualPoA = getPoA(actual);
        return lowestPoA > actualPoA ? actual : lowest;
    })
    return menor;
}
function getPoA (evento){ // obtengo el porcentaje de un solo evento
    const PoA = (evento.assistance / evento.capacity) * 100;
    return PoA;
}
//creo una función porque siempre se pide las mismas tres cosas: Categoría, Ingresos, y Porcentaje de asistencia (PoA)
function createPolRow (nombre, elemento){ 
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><strong>${nombre}</strong></td>
        <td>${parseInt(elemento.price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
        <td>${((elemento.assistance / elemento.capacity) * 100).toFixed(1)}%</td>`;
    return fila
}
// getRevenue(eventos, category){};
function createStats(categories, eventos){
    for (const category in categories) {
        let acumAss = 0;
        let acumCap = 0;
        let acumRev = 0;
        for (const event of eventos) {
                if (category == event.category){
                    //en caso ded futuros pide el estimate en caso de pasados la asistencuia
                    if (event.assistance) { 
                    acumAss += event.assistance;
                    acumRev += (event.price * event.assistance);
                    }
                    else{
                    acumAss += event.estimate;
                    acumRev += (event.price * event.estimate);
                    }
                    acumCap += event.capacity;
                }
        };
        categories[category].assistance = acumAss;
        categories[category].capacity = acumCap;
        categories[category].price = acumRev;

    }
}
function atachStats (categories, lugar) {
    for (const category in categories) {
        //Un if en caso de que no exista algún parametro (par evitar erores)
        if (categories[category].price!=0 || categories[category].assistance!=0 ){
            let fila = createPolRow(category, categories[category]);
            lugar.appendChild(fila);
        }
    }
}