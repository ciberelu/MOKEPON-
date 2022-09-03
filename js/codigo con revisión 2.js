
window.addEventListener("load", iniciarJuego)

const sectionataque=document.getElementById('selec_ataque')
const botonMascotaJugador = document.getElementById("botonMascota")
const botonFuego = document.getElementById("fuego")
const botonAgua = document.getElementById("agua")
const botonTierra = document.getElementById("tierra")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const botonReiniciar = document.getElementById("botonReiniciar")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")
const sectionMensajes = document.getElementById("resultado")
const tipoDeAtaqueJugador = document.getElementById("mensajeJugador")
const tipoDeAtaqueEnemigo = document.getElementById("mensajeEnemigo")
const contenedorMokepones = document.getElementById("contenedor")

const sectionMascota=document.getElementById('selec_mascota')
const contenedorAtaqueJugador = document.getElementById("contenedorAtaques")


let inputHipodoge
let inputCapipepo
let inputRatigueya

let mokepones = []

class Mokepon {
    constructor (nombre, foto, vidas){
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
    }
    
}

let Hipodogue = new Mokepon ("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let Capipepo = new Mokepon ("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let Ratigueya = new Mokepon ("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

mokepones.push(Hipodogue, Capipepo, Ratigueya)

Hipodogue.ataques.push(
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"🌱", id:"tierra"}
)

Capipepo.ataques.push(
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"💧", id:"agua"}
)
Ratigueya.ataques.push(
    {nombre:"🔥", id:"fuego"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"💧", id:"agua"},
    {nombre:"🌱", id:"tierra"}
    
)

let opcionDeMokepones
let extraerAtaquesJugador
let ataquesMokepon
let botones = []
let indexJugador
let indexEnemigo


let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador = 3
let victoriasEnemigo = 3


function iniciarJuego(){
   
    sectionataque.style.display='none'
 
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)


    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name = "mascotas" id=${mokepon.nombre}>
                 <label class = "label" for=${mokepon.nombre}>
                     <p>${mokepon.nombre}</p> 
                     <img src=${mokepon.foto} alt="">
                 </label>
        `
        contenedorMokepones.innerHTML += opcionDeMokepones
    }) 

    inputHipodoge = document.getElementById("Hipodogue")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    
    botonReiniciar.style.display = "none"
    botonReiniciar.addEventListener("click", reiniciar)

function seleccionarMascotaJugador() {  
    

    let jugar = 1
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = Hipodogue.nombre 
        extraerAtaquesJugador = Hipodogue.ataques
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = Capipepo.nombre
        extraerAtaquesJugador = Capipepo.ataques
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = Ratigueya.nombre
        extraerAtaquesJugador = Ratigueya.ataques
    }else {
    alert("Selecciona tu Mascota Estupido")
    jugar  = 0 
    }

    if (jugar == 1 ) {
        seleccionarMascotaEnemigo()
        sectionMascota.style.display='none'
        sectionataque.style.display='flex'

    }  

}
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio (mokepones.length -1,0)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre 
    
    mostrarAtaques(extraerAtaquesJugador)
    secuenciaAtaque()
    
}

function mostrarAtaques(extraerAtaquesJugador) {
    extraerAtaquesJugador.forEach((ataque)=>{
        ataquesMokepon = `<button id = ${ataque.id} class = "botonAtaque BAataque" >${ataque.nombre}</button>`
        contenedorAtaqueJugador.innerHTML += ataquesMokepon

    });
    
    botones = document.querySelectorAll(".BAataque")
    
}

function  secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener("click", (e)=>{
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("fuego")
                boton.style.background = "black"
                boton.disabled = true
                
            }else if (e.target.textContent === "💧") {
                ataqueJugador.push("agua")
                boton.style.background = "black"
                
                boton.disabled = true
            }else {
                ataqueJugador.push("tierra")
                boton.style.background = "black"
                
                boton.disabled = true
            }ataqueAleatorioEnemigo ()

        })
        
    })
}


function ataqueAleatorioEnemigo () {
    let ataqueAleatorio = aleatorio (extraerAtaquesJugador.length-1,0) 
    if (ataqueAleatorio == 0|| ataqueAleatorio == 1 ) {
        ataqueEnemigo.push("fuego")     
        
    }  else if (ataqueAleatorio == 3|| ataqueAleatorio == 4) {
        ataqueEnemigo.push("agua")
       
    } else {
        ataqueEnemigo.push("tierra")
       
    }
    iniciarPelea()
}

function iniciarPelea(params) {
    if (ataqueJugador.length == 5) {
        combate()
     }
    
}
function combate (){

    for (let index = 0; index < ataqueJugador.length; index++) {
        
        if (ataqueJugador[index]=== ataqueEnemigo) {           
            indexAmbosOponentes(index, index)
            crearMensaje("empate")
        }else if (ataqueJugador[index] ==="fuego" && ataqueEnemigo == "tierra") {
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
        }else if (ataqueJugador[index] ==="agua" && ataqueEnemigo == "fuego") {
            
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
        }else if (ataqueJugador[index] ==="tierra" && ataqueEnemigo == "agua") {
            
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
        }else {
            
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
        }
        
    }
   
    
   
    contadordeVidas()
}

function indexAmbosOponentes(jugador, enemigo) {
    indexJugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]
}
function contadordeVidas  () {
    if (vidasJugador == vidasEnemigo ) {
        mensajeFinal ("oops lo siento, perdiste 😈👿😈😈")
    } else if (vidasEnemigo == 0 ) {
        mensajeFinal ("felicidades, Ganaste 🎇🎆🎋🎈")
    }
    
}


function mensajeFinal(resultadoFinal) {

    
    sectionMensajes.innerHTML = resultadoFinal
    


    
    
   
    botonReiniciar.style.display = "inline-block"

    
 }

function crearMensaje(resultado) {

    
    


    
    sectionMensajes.innerHTML = resultado

    
   

    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = indexJugador
    tipoDeAtaqueJugador.appendChild(parrafo)

    
    

    
    let parrafoEnemigo = document.createElement("p")
    parrafoEnemigo.innerHTML = indexEnemigo
    tipoDeAtaqueEnemigo.appendChild(parrafoEnemigo)

   






}
function aleatorio(max, min) {
    return Math.floor (Math.random()*(max - min + 1)+min);
}

function reiniciar() {
    location.reload()
}