
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
let mapabackground = new Image()
mapabackground.src= "./assets/mokemap.png"


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
let mascotaJugadorObjeto
let opcionaataques
let botones = []
let ataqueAleatorio
let ataquesMokeponEnemigo

let indexJugador
let indexEnemigo

let victoriasJugador = 0 
let victoriasEnemigo = 0

let alturaQueBuscamos
let anchodelMapa = window.innerWidth-20
const anchoMaximoMapa = 350

if (anchodelMapa > anchoMaximoMapa ) {
    anchodelMapa = anchoMaximoMapa -20

    
}

alturaQueBuscamos = anchodelMapa * 600 / 800
mapa.width = anchodelMapa
mapa.height = alturaQueBuscamos





//para crear la clase//
// todas las clases empiezan con mayuscula//
//cuando se pasan valores por parametros se puede definir para que escojan por default en caso no se pasen


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(mapa.width - this.ancho, 0)
        this.y = aleatorio(mapa.height - this.alto, 0)
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
     }
     pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
     }
     
    
}
   
let hipodoge = new Mokepon("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")

let hipodogeEnemigo = new Mokepon("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")


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

//se meten los ataques del enemigo

hipodogeEnemigo.ataques.push(
    //aqui se crea un objeto instancia, los otros se llaman objetos literales,  el cual es diferente a crear un objeto con clase//
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"💧", id:"agua"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"🌱", id:"tierra"}
)

capipepoEnemigo.ataques.push(
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🌱", id:"tierra"},
    {nombre:"🔥", id:"fuego"},
    {nombre:"💧", id:"agua"}
)

ratigueyaEnemigo.ataques.push(
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

   
   //con setInverval llamas a una función constantemente esperando un poco de tiempo//
   //a la variable intervalo se le metio la función pintarMascota y se le indica que espere 50 milisegundos para volver a llamarla//
   


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
        seccionVerMapa.style.display = "flex" 

        iniciarMapa()
        
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

    //let botonFuego = document.getElementById("fuego")
    //let botonTierra = document.getElementById("tierra")
   // let botonAgua = document.getElementById("agua")

    
    

    // con query se hace una consulta en el HTML, con el selector SelectorAll se seleccionan todos los que tengan la misma clase//
    //para indicar la clase el string debe comenzar con un (.)
    botones = document.querySelectorAll(".BAataque")
    
    


}

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

function pintarCanvas(params) {
    

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    //clearRect sirve para limpiar el canvas cada vez que cambia de posición la imagen dibujada
    lienzo.clearRect(0,0,mapa.clientWidth, mapa.clientHeight)
    lienzo.drawImage (
        mapabackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()
   if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
   }

}

function moverArriba(params) {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo(params) {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverIzquierda(params) {
    mascotaJugadorObjeto.velocidadX = -5 
}
function moverDerecha(params) {
    mascotaJugadorObjeto.velocidadX = 5
   
}
function detenerMovimiento(params) {
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
    
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case  "ArrowUp":
            moverArriba()
            break;
        case  "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
        default:
            break;
    }
    
}
 function iniciarMapa(params) {
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)
    

   window.addEventListener("keydown", sePresionoUnaTecla)
   window.addEventListener("keyup", detenerMovimiento)
    
 }

 function obtenerObjetoMascota(params) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
 }

 function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y+ enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y+ mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x


    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
       return; 
    }
    

    detenerMovimiento()
    clearInterval(intervalo)
    sectionataque.style.display = "flex"
    seccionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
    
 }
 function seleccionarMascotaEnemigo(enemigo) {
    
    
    
    spanMascotaEnemigo.innerHTML =  enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
    
    
    
}