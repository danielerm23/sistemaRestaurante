
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
const spanTotal=document.getElementById('total')
const historial=document.getElementById("historia")
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
const botonRacionesMenu=document.querySelectorAll(".boton-raciones")
const botonComidasMenu=document.querySelectorAll(".boton-comidas")
const aHistorial=document.getElementById("a-historial")

let montoPagarCliente=document.getElementById("vuelto")
let resultadoCobro=document.getElementById("resultado-cobro")
let montoPagar=document.getElementById("monto-pagar")

const inputElement=document.getElementById("n-mesas")

//CONFIGURACION VENTANA MODAL

aHistorial.disabled=true

document.getElementById("boton-modal-cerrar-mesa").addEventListener('click', ()=>{
    document.getElementById("modal-cerrar-mesa").style.display="block"
})
document.getElementById("boton-modal-pagar").addEventListener('click', ()=>{
    document.getElementById('mi-modal').style.display='block'
})

document.querySelector(".cerrar").addEventListener('click', ()=>{
    document.getElementById('mi-modal').style.display='none'
    vaciarModal()
})
document.querySelector(".cerrar1").addEventListener('click', ()=>{
    document.getElementById("modal-cerrar-mesa").style.display='none'
})
window.addEventListener('click', (event)=>{
    if(event.target==document.getElementById('mi-modal')){
        document.getElementById('mi-modal').style.display='none'
        vaciarModal()
    } else if (event.target==document.getElementById("modal-cerrar-mesa")){
        document.getElementById('modal-cerrar-mesa').style.display='none'
    }
})

document.getElementById("si-cerrar").addEventListener("click", ()=> {
    borrarMesa()
    document.getElementById('modal-cerrar-mesa').style.display='none'
})
document.getElementById("no-cerrar").addEventListener("click", ()=> {
    document.getElementById("modal-cerrar-mesa").style.display='none'
})

const precio=2.50
let objetoMesa=[]
let registroMesasUl
let elementLi
let botonEliminar
let valorBoton
let mesaSeleccionada 
let mesaSeleccion
let mesa
let intervalo
let listaId
let cadenaEliminada
let vuelto
let historialMesas=[]
let objetoMesaRap
let historialDeMesasUl
let historialDeMesasLi

class objetoMesas{
    constructor(bebidas, comidas, raciones, total, mesa){

        this.bebidas=bebidas
        this.comidas=comidas
        this.raciones=raciones
        this.total=total
        this.mesa=mesa
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
            bebidas()
        }) 
    }); 
    botonRacionesMenu.forEach(boton=> {
        boton.addEventListener('click', () => {
            valorBoton=boton.textContent
            raciones()
        }) 
    }); 
    botonComidasMenu.forEach(boton=>{
        boton.addEventListener('click', ()=>{
            valorBoton=boton.textContent
            comidas()
        })
    })
}
function autorizacion(){
    if (inputElement.value>0 && inputElement.value<101){
        for (let i = 1; i <= inputElement.value; i++) {
            objetoMesa.push(new objetoMesas([], [], [], 0, i))
        }
        creacionMesas()
        aHistorial.disabled=false
    }
}
function creacionMesas(){
    mesas.innerHTML=""
    document.getElementById("tabla").style.display="none"
    seccionInicio.style.display='none'
    seccionMesas.style.display='flex'
    divBebidas.style.display="none"
    divRaciones.style.display="none"
    divComidas.style.display="none"
    contenedor.style.display='none'

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
            clearInterval(intervalo)
            break
        }
    }
}

function funcionProductos(){
    
    mesaSeleccion=`<h4>${mesa}</h4>`
    divProductos.innerHTML=mesaSeleccion
    registroPedidos()
}

function bebidas() {
    divBebidas.style.display="flex"
    divRaciones.style.display="none"
    divComidas.style.display="none"
    if (valorBoton !==null && valorBoton!==undefined){
        objetoMesa[mesa-1].bebidas.push(valorBoton)
        objetoMesa[mesa-1].total=objetoMesa[mesa-1].total+precio
    }
    registroPedidos()
    valorBoton=null
}
function raciones() {
    divRaciones.style.display="flex"
    divBebidas.style.display="none"
    divComidas.style.display="none"
    if (valorBoton !==null && valorBoton!==undefined){
        objetoMesa[mesa-1].raciones.push(valorBoton)
        objetoMesa[mesa-1].total=objetoMesa[mesa-1].total+precio
    }
    registroPedidos()
    valorBoton=null
}
function comidas() {
    divComidas.style.display="flex"
    divBebidas.style.display="none"
    divRaciones.style.display="none"

    if (valorBoton !==null && valorBoton!==undefined){
        objetoMesa[mesa-1].comidas.push(valorBoton)
        objetoMesa[mesa-1].total=objetoMesa[mesa-1].total+precio
    }
    registroPedidos()
    valorBoton=null
}
function registroPedidos(){
    
    resumen.innerHTML=""
    spanTotal.innerHTML=""
    registroMesasUl=document.createElement('ul')
    
    objetoMesa[mesa-1].bebidas.forEach(item=> {
        elementLi=document.createElement('li')
        elementLi.textContent=item + "" 

        botonEliminar=document.createElement("button")
        botonEliminar.className="eliminar"
        botonEliminar.textContent="Eliminar"
        elementLi.appendChild(botonEliminar)
        botonEliminar.addEventListener("click", (event)=>{   
            listaId=event.target.parentElement
            listaId.parentNode.removeChild(listaId)
            objetoMesa[mesa-1].total=objetoMesa[mesa-1].total-precio
            montoPagar.innerHTML=objetoMesa[mesa-1].total
            spanTotal.innerHTML=objetoMesa[mesa-1].total

            listaId=listaId.textContent
            cadenaEliminada=listaId.slice(0, -8)
            for (let i = 0; i < objetoMesa[mesa-1].bebidas.length ; i++) {
                if(cadenaEliminada==objetoMesa[mesa-1].bebidas[i]){
                    objetoMesa[mesa-1].bebidas.splice(i, 1)
                    break
                }
            }

        })
        elementLi.appendChild(botonEliminar)
        registroMesasUl.appendChild(elementLi)
    })
    
    objetoMesa[mesa-1].raciones.forEach(item=> {
        elementLi=document.createElement('li')
        elementLi.textContent=item
        botonEliminar=document.createElement("button")
        botonEliminar.className="eliminar"
        botonEliminar.textContent="Eliminar"
        botonEliminar.addEventListener("click", (event)=>{
            listaId=event.target.parentElement
            listaId.parentNode.removeChild(listaId)
            objetoMesa[mesa-1].total=objetoMesa[mesa-1].total-precio
            montoPagar.innerHTML=objetoMesa[mesa-1].total
            spanTotal.innerHTML=objetoMesa[mesa-1].total

            listaId=listaId.textContent
            cadenaEliminada=listaId.slice(0, -8)
            for (let i = 0; i < objetoMesa[mesa-1].raciones.length ; i++) {
                if(cadenaEliminada==objetoMesa[mesa-1].raciones[i]){
                    objetoMesa[mesa-1].raciones.splice(i, 1)
                    break
                }
            }
        })
        elementLi.appendChild(botonEliminar)
        registroMesasUl.appendChild(elementLi)
    })
    
    objetoMesa[mesa-1].comidas.forEach(item=>{
        elementLi=document.createElement("li")
        elementLi.textContent=item
        botonEliminar=document.createElement("button")
        botonEliminar.className="eliminar"
        botonEliminar.textContent="Eliminar"
        botonEliminar.addEventListener("click", (event)=>{
            listaId=event.target.parentElement
            listaId.parentNode.removeChild(listaId)
            objetoMesa[mesa-1].total=objetoMesa[mesa-1].total-precio
            montoPagar.innerHTML=objetoMesa[mesa-1].total
            spanTotal.innerHTML=objetoMesa[mesa-1].total

            listaId=listaId.textContent
            cadenaEliminada=listaId.slice(0, -8)
            for (let i = 0; i < objetoMesa[mesa-1].comidas.length ; i++) {
                if(cadenaEliminada==objetoMesa[mesa-1].comidas[i]){
                    objetoMesa[mesa-1].comidas.splice(i, 1)
                    break
                }
            }
            
        })

        elementLi.appendChild(botonEliminar)
        registroMesasUl.appendChild(elementLi)
    })
    montoPagar.innerHTML=objetoMesa[mesa-1].total
    resumen.appendChild(registroMesasUl)
    spanTotal.innerHTML=objetoMesa[mesa-1].total
}
document.getElementById("label-efectivo").addEventListener('click', ()=>{
    if(document.getElementById("pago-efectivo").checked){
        document.getElementById('label-vuelto').style.display="block"
        document.getElementById('continuar-pago').style.display="block"
        document.getElementById("boton-finalizar").style.display="none"
    }
    pagoEfectivo()
})
document.getElementById("label-tarjeta").addEventListener("click", ()=>{
    if(document.getElementById("pago-tarjeta").checked){
        document.getElementById("label-vuelto").style.display="none"
        document.getElementById("continuar-pago").style.display="none"
        resultadoCobro.style.display="none"
        document.getElementById("boton-finalizar").style.display="block"
        document.getElementById("boton-finalizar").addEventListener("click", finalizarMesas)
    }
})
function pagoEfectivo (){
    document.getElementById("continuar-pago").addEventListener('click', ()=>{
        resultadoCobro.style.display="block"
        if(montoPagarCliente.value==objetoMesa[mesa-1].total){
            resultadoCobro.innerHTML='Completo :)'
            document.getElementById("continuar-pago").style.display="none"
            document.getElementById("boton-finalizar").style.display="block"
            document.getElementById("boton-finalizar").addEventListener("click", finalizarMesas)
        } else if (montoPagarCliente.value>objetoMesa[mesa-1].total){
            vuelto=montoPagarCliente.value-objetoMesa[mesa-1].total
            resultadoCobro.innerHTML="a devolver " + vuelto
            document.getElementById("continuar-pago").style.display="none"
            document.getElementById("boton-finalizar").style.display="block"
            document.getElementById("boton-finalizar").addEventListener("click", finalizarMesas)
        } else if (montoPagarCliente.value<objetoMesa[mesa-1].total){
            resultadoCobro.innerHTML="monto insuficiente " 
        }


    })

}
function finalizarMesas(){
    
    document.getElementById("mi-modal").style.display="none"
    objetoMesaRap=(JSON.parse(JSON.stringify(objetoMesa[mesa-1])))
    historialMesas.push(objetoMesaRap)
    borrarMesa()
    vaciarModal()
    
}
function vaciarModal(){
    document.getElementById("pago-tarjeta").checked=false
    document.getElementById("pago-efectivo").checked=false
    montoPagarCliente.value=""
    document.getElementById("label-vuelto").style.display="none"
    document.getElementById("boton-finalizar").style.display="none"
    resultadoCobro.style.display="none"
}
function borrarMesa(){
    creacionMesas()
    objetoMesa[mesa-1].bebidas.splice(0, objetoMesa[mesa-1].bebidas.length)
    objetoMesa[mesa-1].raciones.splice(0, objetoMesa[mesa-1].raciones.length)
    objetoMesa[mesa-1].comidas.splice(0, objetoMesa[mesa-1].comidas.length)
    objetoMesa[mesa-1].total=0
}
function historialDeMesas(){
    document.getElementById("tabla").style.display="flex"
    document.getElementById("seccion-inicio").style.display="none"
    document.getElementById("seccion-mesas").style.display="none"
    document.getElementById("contenedor").style.display="none"
    historialDeMesasUl=document.createElement("ul")

    for (let i = 0; i < historialMesas.length; i++) {

        historialDeMesasLi=document.createElement("li")

        const mesaLength=document.createElement("span")
        mesaLength.textContent=historialMesas[i].mesa
        historialDeMesasLi.appendChild(mesaLength)

        const bebidasLength=document.createElement("span")
        bebidasLength.textContent=historialMesas[i].bebidas.length
        historialDeMesasLi.appendChild(bebidasLength)

        const racionesLength=document.createElement("span")
        racionesLength.textContent=historialMesas[i].raciones.length
        historialDeMesasLi.appendChild(racionesLength)

        const comidasLength=document.createElement("span")
        comidasLength.textContent=historialMesas[i].comidas.length
        historialDeMesasLi.appendChild(comidasLength)

        const totalLength=document.createElement("span")
        totalLength.textContent=historialMesas[i].total
        historialDeMesasLi.appendChild(totalLength)

        historialDeMesasUl.appendChild(historialDeMesasLi)
    }

    historial.appendChild(historialDeMesasUl)
    document.getElementById("boton-regresar").addEventListener('click', ()=>{
        creacionMesas()
        historial.innerHTML=""
    })
    
}
function reniciarPagina(){
    location.reload()
}
window.addEventListener('load', iniciarBoton)