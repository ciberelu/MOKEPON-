
    window.addEventListener("load", iniciarJuego)

const sectionataque=document.getElementById('selec_ataque')
const botonMascotaJugador = document.getElementById("botonMascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const botonReiniciar = document.getElementById("botonReiniciar")
const sectionMascota=document.getElementById('selec_mascota')
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
let spanVidasJugador = document.getElementById("vidasJugador")
let spanVidasEnemigo = document.getElementById("vidasEnemigo")
const sectionMensajes = document.getElementById("resultado")

const tipoDeAtaqueJugador = document.getElementById("mensajeJugador")
const tipoDeAtaqueEnemigo = document.getElementById("mensajeEnemigo")
let seccionVerMapa = document.getElementById("verMapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")


let intervalo


let inputHipodoge
let inputCapipepo
let inputRatigueya

let ataqueJugador = []
let ataqueEnemigo = []
let vidasJugador = 3;
let vidasEnemigo = 3;

let opcionDeMokepones
let contenedor = document.getElementById("contenedor")
let contenedorAtaques = document.getElementById("contenedorAtaques")
let mostrarAtaques = []


let mascotaJugador
let opcionaataques
let botones = []
let ataqueAleatorio
let ataquesMokeponEnemigo

let indexJugador
let indexEnemigo

let victoriasJugador = 0 
let victoriasEnemigo = 0

//para crear la clase//
// todas las clases empiezan con mayuscula//

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
     }
}
   
let hipodoge = new Mokepon("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)


//a los arreglos se les puede meter muchas variables, las cuales se deben encerrar entre corchetes//
let mokepones = []

//con lo siguiente se mete información de ataques al atributo ataque del constructor del mokepon//

hipodoge.ataques.push(
    //aqui se crea un objeto instancia, los otros se llaman objetos literales,  el cual es diferente a crear un objeto con clase//
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"🌱", id:"tierra"}
)

capipepo.ataques.push(
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"💧", id:"agua"}
)

ratigueya.ataques.push(
    {nombre:"🔥", id:"fuego"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"💧", id:"agua"},
    {nombre:"🌱", id:"tierra"}
)


//con el nombre del arreglo y .push se meten todas las variables que se quiera//
mokepones.push(hipodoge,capipepo, ratigueya)



function iniciarJuego(){

    sectionataque.style.display='none' 
    seccionVerMapa.style.display='none'

    //para poder recorrer el objeto se utiliza .forEach((mokepon que es la clase creada) => hacer lo siguiente)

    mokepones.forEach((mokepon) => {
        
        //con los templates literarios se manda información de las variables en js a html
       opcionDeMokepones = `
       <input type="radio" name = "mascotas" id=${mokepon.nombre}>
                <label class = "label" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p> 
                    <img src=${mokepon.foto} alt="">
                </label>
       `
        
        contenedor.innerHTML += opcionDeMokepones

    })
    
    
    inputHipodoge = document.getElementById("Hipodogue")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    
    
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
        
    let botonAgua = document.getElementById("agua")
    
     botonReiniciar.style.display = "none"
     botonReiniciar.addEventListener("click", reiniciar)

function seleccionarMascotaJugador() {  

   seccionVerMapa.style.display = "flex" 

   //con setInverval llamas a una función constantemente esperando un poco de tiempo//
   //a la variable intervalo se le metio la función pintarMascota y se le indica que espere 50 milisegundos para volver a llamarla//
   intervalo = setInterval(pintarMascota, 50)


        sectionataque.style.display = "none"
    let jugar = 1
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
    alert("Selecciona tu Mascota Estupido")
    jugar  = 0 
    }

    if (jugar == 1 ) {
        extraerAtaques(mascotaJugador)

        seleccionarMascotaEnemigo()
        sectionMascota.style.display='none'
        sectionataque.style.display='none'

    }  

function extraerAtaques(mascotaJugador) {
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrar(ataques)
    }
}

function mostrar(ataques) {
    ataques.forEach((ataque) => {
        mostrarAtaques = `<button id = ${ataque.id} class = "botonAtaque BAataque" >${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += mostrarAtaques
    }); 

    let botonFuego = document.getElementById("fuego")
    let botonTierra = document.getElementById("tierra")
    let botonAgua = document.getElementById("agua")

    
    

    // con query se hace una consulta en el HTML, con el selector SelectorAll se seleccionan todos los que tengan la misma clase//
    //para indicar la clase el string debe comenzar con un (.)
    botones = document.querySelectorAll(".BAataque")
    
    


}

}
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio ((mokepones.length -1 ),0)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
    
    
    
}



function secuenciaAtaque(params) {
    botones.forEach((boton)=> {
        boton.addEventListener("click", (e) =>{
           
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
                
                
            }
            ataqueAleatorioEnemigo ()
        })

    })

}




function ataqueAleatorioEnemigo () {

    ataqueAleatorio = aleatorio (( ataquesMokeponEnemigo.length- 1),0) 
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1 ) {
        ataqueEnemigo.push ("fuego")
              
    }  else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("agua")
        
    } else {
        ataqueEnemigo.push ("tierra")
        
    }
    
    iniciarPelea()
}

function iniciarPelea(params) {
    if (ataqueJugador.length === 5) {
        combate()
        
    }
    
}

function indexAmbosOperadores(jugador, enemigo) {
    indexJugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]    
}
function combate (){

    for (let index = 0; index < ataqueJugador.length; index++) {
       
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            
            indexAmbosOperadores(index, index)
            crearMensaje("empate")    
            spanVidasJugador.innerHTML= vidasJugador
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }else if (ataqueJugador[index] == "fuego" && ataqueEnemigo[index]=="tierra") {

            
            indexAmbosOperadores(index, index)
            crearMensaje("ganaste")   
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }else if (ataqueJugador[index]== "agua" && ataqueEnemigo[index]=="fuego" ) {
            
            indexAmbosOperadores(index, index)
            crearMensaje("ganaste") 
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            
        }else if (ataqueJugador[index]== "tierra" && ataqueEnemigo[index]=="agua") {
            
            indexAmbosOperadores(index, index)
            crearMensaje("ganaste") 
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            
        }else {
            
            indexAmbosOperadores(index, index)
            crearMensaje("perdiste")     
            victoriasEnemigo++
            
            spanVidasJugador.innerHTML= victoriasJugador
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
        
    }

   
    contadordeVictorias()
}

function contadordeVictorias  () {
    if (victoriasJugador == victoriasEnemigo ) {
        mensajeFinal ("empate")
    } else if (victoriasJugador > victoriasEnemigo ) {
        mensajeFinal ("felicidades, Ganaste 🎇🎆🎋🎈")
    }else if (victoriasJugador < victoriasEnemigo){
        mensajeFinal ("lo siento perdiste")
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

function pintarMascota(params) {
    capipepo.x = capipepo.x + capipepo.velocidadX
    capipepo.y = capipepo.y + capipepo.velocidadY

    //clearRect sirve para limpiar el canvas cada vez que cambia de posición la imagen dibujada
    lienzo.clearRect(0,0,mapa.clientWidth, mapa.clientHeight)
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

function moverArriba(params) {
    capipepo.velocidadY = -5
}

function moverAbajo(params) {
    capipepo.velocidadY = 5
}
function moverIzquierda(params) {
    capipepo.velocidadX = -5 
}
function moverDerecha(params) {
    capipepo.velocidadX = 5
   
}
