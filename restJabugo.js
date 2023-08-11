
let seccionInicio=document.getElementById("seccion-inicio")
let seccionMesas=document.getElementById("seccion-mesas")
let seccionProductos=document.getElementById("seccion-productos")
let mesas=document.getElementById("mesas")
let divProductos=document.getElementById("div-productos2")
let botonNumeroMesas=document.getElementById("boton-numero-mesas")
const inputElement=document.getElementById("n-mesas")
let botonGuardar=document.getElementById("boton-guardar")
let mesaSeleccionada 
let mesaSeleccion
let mesa
let intervalo

function iniciarBoton(){
    seccionMesas.style.display='none'
    seccionProductos.style.display='none'
    botonNumeroMesas.addEventListener('click', autorizacion)
    botonGuardar.addEventListener('click', creacionMesas)
    
}

function autorizacion(){
    if (inputElement.value>0 && inputElement.value<101){
        creacionMesas()
    }
}
function creacionMesas(){
    seccionInicio.style.display='none'
    seccionMesas.style.display='flex'
    seccionProductos.style.display='none'
    let con=1
    let creacionMesas
    while(con<=inputElement.value){
        creacionMesas = ` 
            <input type="radio" name="mesas" id="mesa${con}" class="input-mesas"/>
            <label class="tarjeta-mesas" for="mesa${con}"><p id='id-mesa'>mesa ${con}</p><img src='./img/mesa.png'></label>
        `
        mesas.innerHTML += creacionMesas
        con++
    }
    inputMesas=document.querySelector('input[name="mesas"]')
    inputMesas.style.display="none"
    intervalo=setInterval(detectarMesaSeleccionada,50)
}

function detectarMesaSeleccionada(){
    
    for (let i = 0; i < inputElement.value; i++) {
        mesaSeleccionada=document.getElementById(`mesa${i+1}`)
        if (mesaSeleccionada.checked){
            seccionMesas.style.display='none'
            seccionProductos.style.display='flex'
            mesa=mesaSeleccionada.id
            mesas.innerHTML=""
            funcionProductos ()
        }
    }
}

function funcionProductos(){
    clearInterval(intervalo)
    mesaSeleccion=`<h4>${mesa}</h4>`
    divProductos.innerHTML=mesaSeleccion
}

window.addEventListener('load', iniciarBoton)