const obtenerUsuarios = () =>{
    fetch(`https://rickandmortyapi.com/api/character`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        tarjeta(data.results)
        clickTarjeta(data.results)
    })
}    

//botones prev y next
const contenedor = document.querySelector(".contenedor")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

let paginaActual = 1

next.onclick = () => {
    paginaActual = paginaActual + 1

    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
    .then((res) => res.json())
    .then((data) => {
        contenedor(data.results)
    })
}




prev.onclick = () => {
    paginaActual = paginaActual - 1

    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
    .then((res) => res.json())
    .then((data) => {
        contenedor(data.results)
    })
}

    
const tarjeta = (info)=>{
    const contenedor = document.querySelector(".contenedor")
    const html = info.reduce ((acc, elemento) => {

        return acc + 
        `<div class="tarjeta">
            <div class="tarjeta-nombre"> ${elemento.name} </div>
            <img class="img-principal" src= "${elemento.image}" id="${elemento.id}" />
        </div>
        `
    }, "")
    contenedor.innerHTML = html
}

const clickTarjeta = ()=>{
    const imgBotones = document.querySelectorAll(".img-principal")
    const contenedor = document.querySelector(".contenedor")
    const contenedorDetalles = document.querySelector(".contenedor-detalles")

    for (let i = 0; i < imgBotones.length; i++) {
        imgBotones[i].onclick=()=>{
            // console.log(imgBotones[i].id);
            contenedor.style.display = "none"
            contenedorDetalles.style.display = "flex"
            const idDelBoton = imgBotones[i].id
            console.log(idDelBoton);
            mostrarTarjetaDetalles(idDelBoton)
        }
    }
}

const detalles = (data) =>{
    const contenedorDetalles = document.querySelector(".contenedor-detalles")
    const detallesEnHTML =
    `
    <div class="tarjeta-detalles">
        <h1 class="titulo-detalles-nombre">${data.name}</h1>
        <h2>Status: ${data.status}</h2>
        <h2>Species: ${data.species}</h2>
        <h2>Gender: ${data.gender}</h2>
        <div class="contenedor-imagen-detalle">
            <img class="img-detalles" src= "${data.image}"/>
        </div>
        <button type="button" class="boton-atras" id="${data.id}"> Atrás </button>
    </div>
    `
    contenedorDetalles.innerHTML= detallesEnHTML
}  

const mostrarTarjetaDetalles = (idDelBoton) => {
    fetch(`https://rickandmortyapi.com/api/character/${idDelBoton}`)
    .then((res) =>  res.json())
    .then((data) => {
    detalles(data)
    volverListadoUsuario()
    })
}

const volverListadoUsuario = ()=>{
    const botonAtras = document.querySelector(".boton-atras")
    botonAtras.onclick =()=>{
        const contenedor = document.querySelector(".contenedor")
        const contenedorDetalles = document.querySelector(".contenedor-detalles")

        contenedor.style.display ="flex"
        contenedorDetalles.style.display="none"

    }  
    
    
}

obtenerUsuarios()
clickTarjeta()
mostrarTarjetaDetalles()


