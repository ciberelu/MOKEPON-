//se guarda en una variable la libreria express, la cual es llamada con la palabra require
// en otra variable se llama a la variable como funcion
// con control + c se apaga el servidor en la terminal de comandos

// para instalar libreriras, se usa el comando npm install 

//con el verbo get se obtiene un recurso del servidor con el verbo post se manda informacion al servidor

//para meter en una variable la libreria express
const express = require("express")

//para meter en una variable la librerira cors 
const cors = require("cors")


const app = express()
// para que la API utilice cors
app.use(cors())

//para indicarle que se va a utilizar paquetes de datos en formato json
app.use(express.json())

const jugadores = []

class Jugador {
    constructor (id){
        this.id = id 
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
} 

class Mokepon {
    constructor(nombre){
        this.nombre = nombre 
    }
}
app.get ("/unirse", (req, res) =>{

    const id = `${Math.random()}`   
    const jugador = new Jugador(id)
    jugadores.push(jugador)

   
    res.send(id)
})

// para poner una variable en la url se utiliza dos punto : y el nombre de la variable en el lado del servidor

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId == jugador.id)

    if (jugadorIndex => 0) {
        jugadores [jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
} )

app.post("/mokepon/:jugadorId/posicion", (req, res)=>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId == jugador.id)

    if (jugadorIndex => 0) {
        jugadores [jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador)=> jugadorId != jugador.id )
    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || ""
    
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId == jugador.id)

    if (jugadorIndex => 0) {
        jugadores [jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
} )

app.get("/mokepon/:jugadorId/ataques", (req, res)=>{
    const jugadorId = req.params.jugadorId || ""
   const jugador = jugadores.find((jugador)=> jugador.id  === jugadorId)
    res.send({
        ataques:jugador.ataques || [] 
    })
})

app.listen(8080, () => {
    console.log("el servidor ya arranco")
})