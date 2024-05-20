const iniciarJuegoWeb = document.getElementById("resultadoFinal")
const botonReiniciar = document.getElementById("reiniciarJuego")
const personajeElegido = document.getElementById("personajeElegido")
const combate = document.getElementById("ataquesJugadores")
const resultadoActual = document.getElementById("resultadoActual")
const botonesAtaques = document.getElementById("botonesAtaques")
const botonRevisarDatos = document.getElementById("revisarDatos")
const botonVolver = document.getElementById("volver")
const botonContinuar = document.getElementById("botonContinuar")

const personajeSeleccionado = document.getElementById("personajeJugador")
const personajeSeleccionadoEnemigo = document.getElementById("personajeEnemigo")
const eligePersonaje = document.getElementById("eligePersonaje")
const darClickBotonRevisarDatos = document.getElementById("revisarDatos")
const esconderBotonVerResultados = document.getElementById("revisarDatos")
const clickVolver = document.getElementById("volver")

const spanVictoriasEnemigo = document.getElementById("victoriasEnemigo")
const spanVictoriasJugador = document.getElementById("victoriasJugador")
const ganador = document.getElementById("ganador")
const clickBotonReiniciar = document.getElementById("reiniciarJuego")
const seccionAtaquesElegidos = document.getElementById("ataquesJugadores")
const contenedorPersonajes = document.getElementById("contenedorPersonajes")
const imagenPersonajeSeleccionado = document.getElementById("imagenPersonajeSeleccionado")
const imagenPersonajeSeleccionadoEnemigo = document.getElementById("imagenPersonajeSeleccionadoEnemigo")
const ataquesDelJuego = document.getElementById("ataquesDelJuego")
const sectionVerMapa = document.getElementById("verMapa")
const canvasMapa = document.getElementById("mapa")

let jugadorId = null
let figuras = []
let figuraJugador
let objetoFiguraJugador
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesPersonajeEnemigo
let opcionFiguras
let inputKraken
let inputDragon
let inputPhoenix
let ataquesFigura
let clickBotonAire
let clickBotonAgua
let clickBotonFuego
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let indexPersonajeSeleccionadoEnemigo
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mapa.jpg"
let alturaBuscada 
let anchoMapa = window.innerWidth - 20
const maximoAnchoMapa = 650

if (anchoMapa > maximoAnchoMapa) {
    anchoMapa = maximoAnchoMapa - 20
}

alturaBuscada = anchoMapa * 300 / 600

mapa.width = anchoMapa
mapa.height = alturaBuscada

class Mitological {
    constructor(nombre, imagen, vida, imagenPersonajes, x = 140, y = 220) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 60
        this.alto = 60
        this.mapaImagen = new Image()
        this.mapaImagen.src = imagenPersonajes
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarPersonaje() {
        lienzo.drawImage(
            this.mapaImagen,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let dragon = new Mitological('Dragon', './imagenes/dragon.png', 5, './imagenes/dragon.png')

let phoenix = new Mitological('Phoenix', './imagenes/phoenix.png', 5, './imagenes/phoenix.png')

let kraken = new Mitological('Kraken', './imagenes/kraken.png', 5, './imagenes/kraken.png')

let dragonEnemigo = new Mitological('Dragon', './imagenes/dragon.png', 5, './imagenes/dragon.png', 520, 25)

let phoenixEnemigo = new Mitological('Phoenix', './imagenes/phoenix.png', 5, './imagenes/phoenix.png', 270, 20)

let krakenEnemigo = new Mitological('Kraken', './imagenes/kraken.png', 5, './imagenes/kraken.png', 430, 180)

figuras.push(dragon, phoenix, kraken)

dragon.ataques.push(
    { nombre: '🔥', id: 'fuego' },
    { nombre: '⛈️', id: 'aire' },
    { nombre: '🌎', id: 'tierra' },
    { nombre: '🌶️', id: 'veneno' },
    { nombre: '💿', id: 'metal' }
)

phoenix.ataques.push(
    { nombre: '🔥', id: 'fuego' },
    { nombre: '⛈️', id: 'aire' },
    { nombre: '⚡', id: 'electricidad' },
    { nombre: '🔪', id: 'corte' },
    { nombre: '🔱', id: 'garras' }
)

kraken.ataques.push(
    { nombre: '💦', id: 'agua' },
    { nombre: '🩸', id: 'tinta' },
    { nombre: '⚛️', id: 'camuflaje' },
    { nombre: '⚡', id: 'electricidad' },
    { nombre: '🌴', id: 'tree' }
)

dragonEnemigo.ataques.push(
    { nombre: '🔥', id: 'fuego' },
    { nombre: '⛈️', id: 'aire' },
    { nombre: '🌎', id: 'tierra' },
    { nombre: '🌶️', id: 'veneno' },
    { nombre: '💿', id: 'metal' }
)

phoenixEnemigo.ataques.push(
    { nombre: '🔥', id: 'fuego' },
    { nombre: '⛈️', id: 'aire' },
    { nombre: '⚡', id: 'electricidad' },
    { nombre: '🔪', id: 'corte' },
    { nombre: '🔱', id: 'garras' }
)

krakenEnemigo.ataques.push(
    { nombre: '💦', id: 'agua' },
    { nombre: '🩸', id: 'tinta' },
    { nombre: '⚛️', id: 'camuflaje' },
    { nombre: '⚡', id: 'electricidad' },
    { nombre: '🌴', id: 'tree' }
)

window.addEventListener("load", abrirPagina)

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function abrirPagina() { 
    figuras.forEach((figura) => {
        opcionFiguras = `
        <input type="radio" name="personaje" id=${figura.nombre}>
        <label for=${figura.nombre} class="cuadroPersonajeDragon">
            <p>${figura.nombre}</p>
            <img src=${figura.imagen} alt=${figura.nombre}>
        </label>
        `
        contenedorPersonajes.innerHTML += opcionFiguras

        inputDragon = document.getElementById("Dragon")
        inputPhoenix = document.getElementById("Phoenix")
        inputKraken = document.getElementById("Kraken")
    })

    iniciarJuegoWeb.style.display = "none"
    botonReiniciar.style.display = "none"
    personajeElegido.style.display = "none"
    combate.style.display = "none"
    resultadoActual.style.display = "none"
    botonesAtaques.style.display = "none"
    botonRevisarDatos.style.display = "none"
    botonVolver.style.display = "none"
    sectionVerMapa.style.display = "none"
    botonContinuar.addEventListener("click", clickBotonContinuar)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse") 
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function elegirPersonaje() {
    if (inputDragon.checked) {
        personajeSeleccionado.innerHTML = inputDragon.id
        figuraJugador = inputDragon.id
        imagenPersonajeSeleccionado.src = "./imagenes/dragon.png"

    } else if (inputPhoenix.checked) {
        personajeSeleccionado.innerHTML = inputPhoenix.id
        figuraJugador = inputPhoenix.id
        imagenPersonajeSeleccionado.src = "./imagenes/phoenix.png"

    } else if (inputKraken.checked) {
        personajeSeleccionado.innerHTML = inputKraken.id
        figuraJugador = inputKraken.id
        imagenPersonajeSeleccionado.src = "./imagenes/kraken.png"

    } else {
        alert("¡ELIGE UN PERSONAJE!") 
        StylePropertyMap()
    }
    extraerAtaques(figuraJugador)
}

function extraerAtaques(figuraJugador) {
    let ataques
    for (let i = 0; i < figuras.length; i++) {
        if (figuraJugador === figuras[i].nombre) {
            ataques = figuras[i].ataques
        }
    }
    mostrarAtaques(ataques) 
    console.log(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesFigura = `
        <button id=${ataques.id} class="botonFuego BAtaque">${ataques.nombre}</button>
        `
        botonesAtaques.innerHTML += ataquesFigura
    })
    clickBotonAire = document.getElementById("aire")
    clickBotonAgua = document.getElementById("agua")
    clickBotonFuego = document.getElementById("fuego")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("fuego")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🔥 ATACASTE CON FUEGO 🔥")
            } else if (e.target.textContent === "💦") {
                ataqueJugador.push("agua")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("💦 ATACASTE CON AGUA 💦")
            } else if (e.target.textContent === "⛈️") {
                ataqueJugador.push("aire")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("⛈️ ATACASTE CON AIRE ⛈️")
            } else if (e.target.textContent === "🌎") {
                ataqueJugador.push("tierra")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🌎 ATACASTE CON TIERRA 🌎")
            } else if (e.target.textContent === "🌶️") {
                ataqueJugador.push("veneno")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🌶️ ATACASTE CON VENENO 🌶️")
            } else if (e.target.textContent === "💿") {
                ataqueJugador.push("metal")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("💿 ATACASTE CON METAL 💿")
            } else if (e.target.textContent === "⚡") {
                ataqueJugador.push("electricidad")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("⚡ ATACASTE CON ELECTRICIDAD ⚡")
            } else if (e.target.textContent === "🔪") {
                ataqueJugador.push("corte")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🔪 ATACASTE CON CORTE 🔪")
            } else if (e.target.textContent === "🔱") {
                ataqueJugador.push("garras")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🔱 ATACASTE CON GARRAS 🔱")
            } else if (e.target.textContent === "🩸") {
                ataqueJugador.push("tinta")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🩸 ATACASTE CON TINTA 🩸")
            } else if (e.target.textContent === "⚛️") {
                ataqueJugador.push("energia")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("⚛️ ATACASTE CON ENERGIA ⚛️")
            } else if (e.target.textContent === "🌴") {
                ataqueJugador.push("tree")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
                alert("🌴 ATACASTE CON TREE 🌴")
            } else {
                alert("ELIGE UN ATAQUE")
            }
            ataqueEnemigoAleatorio()
        })
    })
}

function personajeEnemigo(enemigo) {
    personajeSeleccionadoEnemigo.innerHTML = enemigo.nombre
    ataquesPersonajeEnemigo = enemigo.ataques

    if (enemigo === dragonEnemigo) {
        imagenPersonajeSeleccionadoEnemigo.src = "./imagenes/dragon.png"
        indexPersonajeSeleccionadoEnemigo = 0

    } else if (enemigo === phoenixEnemigo) {
        imagenPersonajeSeleccionadoEnemigo.src = "./imagenes/phoenix.png"
        indexPersonajeSeleccionadoEnemigo = 1

    } else {
        imagenPersonajeSeleccionadoEnemigo.src = "./imagenes/kraken.png"
        indexPersonajeSeleccionadoEnemigo = 2
    }
    secuenciaAtaque()
}

function clickBotonContinuar() {
    elegirPersonaje()

    eligePersonaje.style.display = "none"
    botonContinuar.style.display = "none"
    sectionVerMapa.style.display = "flex"
    
    iniciarMapa()
    seleccionarPersonaje(figuraJugador)
} 

function seleccionarPersonaje(figuraJugador) {
    fetch(`http://localhost:8080/mitological/${jugadorId}`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            mitological: figuraJugador
        })
    })
}

function clickBotonRevisarDatos() {
    darClickBotonRevisarDatos.addEventListener("click", botonRevisarDatosH)
}

function botonRevisarDatosH() {
    combate.style.display = "flex"
    iniciarJuegoWeb.style.display = "none"
    botonReiniciar.style.display = "none"
    esconderBotonVerResultados.style.display = "none"
    botonVolver.style.display = "flex"
    personajeElegido.style.display = "none"
}

function clickBotonVolver() {
    clickVolver.addEventListener("click", botonVolverH)
}

function botonVolverH() {
    combate.style.display = "none"
    iniciarJuegoWeb.style.display = "flex"
    botonReiniciar.style.display = "flex"
    esconderBotonVerResultados.style.display = "flex"
    botonVolver.style.display = "none"
    personajeElegido.style.display = "flex"
}

function ataqueEnemigoAleatorio() { 
    console.log("AtaquesEnemigo: ", ataqueEnemigo)   
    let ataqueAleatorio = aleatorio(0, ataqueEnemigo.length - 1)
        
    if (ataqueAleatorio === 0 && (indexPersonajeSeleccionadoEnemigo === 0 || indexPersonajeSeleccionadoEnemigo === 1)) {
        ataqueEnemigo.push("fuego")

    } else if (ataqueAleatorio === 0 && indexPersonajeSeleccionadoEnemigo === 2) {
        ataqueEnemigo.push("agua")
        
    } else if (ataqueAleatorio === 1 && (indexPersonajeSeleccionadoEnemigo === 0 || indexPersonajeSeleccionadoEnemigo === 1)) {
        ataqueEnemigo.push("aire")

    } else if (ataqueAleatorio === 1 && indexPersonajeSeleccionadoEnemigo === 2) {
        ataqueEnemigo.push("tinta")
    
    } else if (ataqueAleatorio === 2) {
        if (indexPersonajeSeleccionadoEnemigo === 0) {
            ataqueEnemigo.push("tierra")
        } else if (indexPersonajeSeleccionadoEnemigo === 1) {
            ataqueEnemigo.push("electricidad")
        } else if (indexPersonajeSeleccionadoEnemigo === 2) {
            ataqueEnemigo.push("energia")
        } else {
            alert("Error 2")
        }

    } else if (ataqueAleatorio === 3) {
        if (indexPersonajeSeleccionadoEnemigo === 0) {
            ataqueEnemigo.push("metal")
        } else if (indexPersonajeSeleccionadoEnemigo === 1) {
            ataqueEnemigo.push("corte")
        } else if (indexPersonajeSeleccionadoEnemigo === 2) {
            ataqueEnemigo.push("electricidad")
        } else {
            alert("Error 2")
        }

    } else if (ataqueAleatorio === 4) {
        if (indexPersonajeSeleccionadoEnemigo === 0) {
            ataqueEnemigo.push("veneno")
        } else if (indexPersonajeSeleccionadoEnemigo === 1) {
            ataqueEnemigo.push("garras")
        } else if (indexPersonajeSeleccionadoEnemigo === 2) {
            ataqueEnemigo.push("tree")
        } else {
            alert("Error 2")
        } 
        
    } else {
        alert("Error")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combateH()
    }
}

function indexAmbosJugadores(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combateH() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosJugadores(index, index)
/* 1 */
        } else if (ataqueJugador[index] === "fuego") {
            if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
            /* 2 */
        } else if (ataqueJugador[index] === "aire") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 3 */
        } else if (ataqueJugador[index] === "tierra") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 4 */      
        } else if (ataqueJugador[index] === "veneno") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 5 */            
        } else if (ataqueJugador[index] === "metal") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } 
/* 6 */        
        } else if (ataqueJugador[index] === "electricidad") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
            }
/* 7 */
        } else if (ataqueJugador[index] === "corte") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 8 */           
        } else if (ataqueJugador[index] === "garras") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 9 */           
        } else if (ataqueJugador[index] === "agua") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            
            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 10 */
        } else if (ataqueJugador[index] === "tinta") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
            }
/* 11 */
        } else if (ataqueJugador[index] === "camuflaje") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
            
            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tree") {
                indexAmbosJugadores(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            }
/* 12 */
        } else if (ataqueJugador[index] === "tree") {
            if (ataqueEnemigo[index] == "fuego") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "aire") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tierra") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "veneno") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "metal") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            
            } else if (ataqueEnemigo[index] == "electricidad") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "corte") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "garras") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "agua") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo

            } else if (ataqueEnemigo[index] == "tinta") {
                indexAmbosJugadores(index, index)

            } else if (ataqueEnemigo[index] == "camuflaje") {
                indexAmbosJugadores(index, index)
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            }
        }
    }
    verificadorVidas()
    ataquesElegidos()
}

function verificadorVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        ganador.innerHTML = "¡😴ES UN EMPATE😴!"
        resultadoActual.style.display = "none"
        combate.style.display = "none"
        iniciarJuegoWeb.style.display = "flex"
        botonReiniciar.style.display = "flex"
        botonesAtaques.style.display = "none"
        botonRevisarDatos.style.display = "flex"

    } else if (victoriasJugador > victoriasEnemigo) {
        ganador.innerHTML = "¡🥳GANA EL JUGADOR🥳!"
        resultadoActual.style.display = "none"
        combate.style.display = "none"
        iniciarJuegoWeb.style.display = "flex"
        botonReiniciar.style.display = "flex"
        botonesAtaques.style.display = "none"
        botonRevisarDatos.style.display = "flex"
    } else {
        ganador.innerHTML = "¡😥GANA EL ENEMIGO😥!"
        resultadoActual.style.display = "none"
        combate.style.display = "none"
        iniciarJuegoWeb.style.display = "flex"
        botonReiniciar.style.display = "flex"
        botonesAtaques.style.display = "none"
        botonRevisarDatos.style.display = "flex"
    }
    jugarNuevamente()
    clickBotonRevisarDatos()
    clickBotonVolver()
}

function jugarNuevamente() {
    clickBotonReiniciar.addEventListener("click", funcionBotonReiniciar)
}

function funcionBotonReiniciar() {
    location.reload()
}

function ataquesElegidos() {
    let verAtaques = document.createElement("h4")
    verAtaques.innerHTML = "JUGADOR:" + "\n" + ataqueJugador + "\n" + "ENEMIGO:" + "\n" + ataqueEnemigo
    ataquesDelJuego.appendChild(verAtaques)
}

function pintarCanvas() {
    objetoFiguraJugador.x = objetoFiguraJugador.x + objetoFiguraJugador.velocidadX
    objetoFiguraJugador.y = objetoFiguraJugador.y + objetoFiguraJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground, 
        0,
        0,
    )
    objetoFiguraJugador.pintarPersonaje()

    enviarPosicion(objetoFiguraJugador.x, objetoFiguraJugador.y)

    dragonEnemigo.pintarPersonaje()
    phoenixEnemigo.pintarPersonaje()
    krakenEnemigo.pintarPersonaje()

    if (objetoFiguraJugador.velocidadX !== 0 || objetoFiguraJugador.velocidadY !== 0) {
        revisarColision(dragonEnemigo)
        revisarColision(phoenixEnemigo)
        revisarColision(krakenEnemigo)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mitological/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                })
        }
    })
}

function moverDerecha() {
    objetoFiguraJugador.velocidadX = 5
    pintarCanvas()
}

function moverIzquierda() {
    objetoFiguraJugador.velocidadX = - 5
    pintarCanvas()
}

function moverArriba() {
    objetoFiguraJugador.velocidadY = - 5
    pintarCanvas()
}

function moverAbajo() {
    objetoFiguraJugador.velocidadY = 5
    pintarCanvas()
}

function detenerMovimiento() {
    objetoFiguraJugador.velocidadX = 0
    objetoFiguraJugador.velocidadY = 0
}

function iniciarMapa() {
    objetoFiguraJugador = objetoPersonaje(figuraJugador)

    intervalo = setInterval(pintarCanvas, 50)
}

function objetoPersonaje() {
    for (let i = 0; i < figuras.length; i++) {
        if (figuraJugador === figuras[i].nombre) {
            return figuras[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaJugador = objetoFiguraJugador.y
    const abajoJugador = objetoFiguraJugador.y + objetoFiguraJugador.alto
    const derechaJugador = objetoFiguraJugador.x + objetoFiguraJugador.ancho
    const izquierdaJugador = objetoFiguraJugador.x

    if (abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
        ) {
        return;   
    }

    detenerMovimiento()
    console.log("Se detecto una colision")
    personajeElegido.style.display = "flex"
    botonesAtaques.style.display = "flex"
    sectionVerMapa.style.display = "none"
    personajeEnemigo(enemigo)
}