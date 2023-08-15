
const seccionInicio=document.getElementById("seccion-inicio")
const seccionMesas=document.getElementById("seccion-mesas")
const seccionProductos=document.getElementById("seccion-productos")
const contenedor=document.getElementById("contenedor")

const divProductos=document.getElementById("div-productos2")
const divBebidas=document.getElementById("div-bebidas")
const divRaciones=document.getElementById("div-raciones")
const divComidas=document.getElementById("div-comidas")
const mesas=document.getElementById("mesas")
const resumen=document.getElementById("resumen")

const botonNumeroMesas=document.getElementById("boton-numero-mesas")
const botonGuardar=document.getElementById("boton-guardar")
const botonComidas=document.getElementById("boton-comidas")
const botonRaciones=document.getElementById("boton-raciones")
const botonBebidas=document.getElementById("boton-bebidas")
const botonCocaColaOriginal=document.getElementById("boton-coca-cola-original")
const botonCocaColaZero=document.getElementById("boton-coca-cola-zero")
const botonCocaColaZeroZero=document.getElementById("boton-coca-cola-zero-zero")
const botonAguaConGas=document.getElementById("boton-agua-con-gas")
const botonAguaSinGas=document.getElementById("boton-agua-sin-gas")
const botonCerveza=document.getElementById("boton-cerveza")
const botonCervezaSinAlcohol=document.getElementById("boton-cerveza-sin-alcohol")
const botonNestea=document.getElementById("boton-nestea")
const botonBebidasMenu=document.querySelectorAll(".boton-bebidas")

const inputElement=document.getElementById("n-mesas")

let objetoMesa=[]
let registroMesas=[]
let registroMesasUl
let elementLi
let valorBoton
let mesaSeleccionada 
let mesaSeleccion
let mesa
let intervalo

class objetoMesas{
    constructor(bebidas, comidas, raciones, total){

        this.bebidas=bebidas
        this.comidas=comidas
        this.raciones=raciones
        this.total=total
    }
}

function iniciarBoton(){
    divBebidas.style.display="none"
    divRaciones.style.display="none"
    divComidas.style.display="none"
    seccionMesas.style.display='none'
    contenedor.style.display='none'

    botonNumeroMesas.addEventListener('click', autorizacion)
    botonGuardar.addEventListener('click', creacionMesas)
    botonComidas.addEventListener('click', comidas)
    botonRaciones.addEventListener('click', raciones)
    botonBebidas.addEventListener('click', bebidas)
    botonBebidasMenu.forEach(boton=> {
        boton.addEventListener('click', () => {
            valorBoton=boton.textContent
            registroPedidos()
        }) 
    }); 
}
function autorizacion(){
    if (inputElement.value>0 && inputElement.value<101){
        for (let i = 1; i <= inputElement.value; i++) {
            objetoMesa.push(new objetoMesas([], [], [], []))
        }
        creacionMesas()
    }
}
function creacionMesas(){
    seccionInicio.style.display='none'
    seccionMesas.style.display='flex'
    divBebidas.style.display="none"
    divRaciones.style.display="none"
    divComidas.style.display="none"
    contenedor.style.display='none'
    resumen.innerHTML=""

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
    
    for (let i = 1; i <= inputElement.value; i++) {
        mesaSeleccionada=document.getElementById(`mesa${i}`)
        if (mesaSeleccionada.checked){
            seccionMesas.style.display='none'
            contenedor.style.display='flex'
            mesa=i
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

function bebidas() {
    divBebidas.style.display="flex"
    divRaciones.style.display="none"
    divComidas.style.display="none"
}
function raciones() {
    divRaciones.style.display="flex"
    divBebidas.style.display="none"
    divComidas.style.display="none"
}
function comidas() {
    divComidas.style.display="flex"
    divBebidas.style.display="none"
    divRaciones.style.display="none"
}
function registroPedidos(){
    
    resumen.innerHTML=""
    registroMesasUl=document.createElement('ul')
    objetoMesa[mesa-1].bebidas.forEach(item => {
        elementLi=document.createElement('li')
        elementLi.textContent=item

        registroMesasUl.appendChild(elementLi)
    });
    resumen.appendChild(registroMesasUl)
    
    registroMesas=document.createElement('p')
    registroMesas.innerHTML=valorBoton
    objetoMesa[mesa-1].bebidas.push(valorBoton)
    resumen.appendChild(registroMesas)
}


window.addEventListener('load', iniciarBoton)