const preguntas = {
    matematicas: [
        {
            texto: "¿Cuál es el resultado de 2 + 2 * 3?",
            opciones: ["8", "12", "6", "10"],
            correcta: "8"
        },
        {
            texto: "¿Cuál es la raíz cuadrada de 16?",
            opciones: ["4", "8", "2", "16"],
            correcta: "4"
        },
        {
            texto: "¿Cuánto es 3! (factorial de 3)?",
            opciones: ["6", "9", "3", "12"],
            correcta: "6"
        }
    ],
    quimica: [
        {
            texto: "¿Cuál es el símbolo del oxígeno en la tabla periódica?",
            opciones: ["O", "Ox", "Oi", "Og"],
            correcta: "O"
        },
        {
            texto: "¿Qué gas es el más abundante en la atmósfera terrestre?",
            opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Argón"],
            correcta: "Nitrógeno"
        },
        {
            texto: "¿Cuál es la fórmula del agua?",
            opciones: ["H2O", "CO2", "H2SO4", "O2"],
            correcta: "H2O"
        }
    ],
    historia: [
        {
            texto: "¿En qué año comenzó la Segunda Guerra Mundial?",
            opciones: ["1939", "1945", "1914", "1929"],
            correcta: "1939"
        },
        {
            texto: "¿Quién fue el primer presidente de México?",
            opciones: ["Benito Juárez", "Guadalupe Victoria", "Porfirio Díaz", "Miguel Hidalgo"],
            correcta: "Guadalupe Victoria"
        },
        {
            texto: "¿Qué civilización construyó Chichén Itzá?",
            opciones: ["Azteca", "Maya", "Inca", "Olmeca"],
            correcta: "Maya"
        }
    ]
};

let materiaActual = "";
const progresos = {
    matematicas: 0,
    quimica: 0,
    historia: 0
};

function redirigirPractica(materia) {
    window.location.href = `index.html?materia=${materia}`;
}

function mostrarCuestionario() {
    // Obtener la materia desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    materiaActual = urlParams.get('materia');
    if (!materiaActual || !preguntas[materiaActual]) {
        document.getElementById("materias").style.display = "block";
        document.getElementById("practica-materia").style.display = "none";
        document.title = "AIDA - Apoyo para Exámenes"; // Título de la página principal
        return;
    }

    const practicaMateria = document.getElementById("practica-materia");
    const preguntaTexto = document.getElementById("pregunta-texto");
    const opcionesDiv = document.getElementById("opciones");
    const materiaTitulo = document.getElementById("materia-practica-titulo");
    const resultado = document.getElementById("resultado");
    const progresoTexto = document.getElementById("progreso-texto");
    const progresoBarra = document.getElementById("progreso-barra");

    document.getElementById("materias").style.display = "none";
    practicaMateria.style.display = "block";
    materiaTitulo.textContent = `${materiaActual.charAt(0).toUpperCase() + materiaActual.slice(1)}`;
    progresoTexto.textContent = `${progresos[materiaActual]}%`;
    progresoBarra.style.width = `${progresos[materiaActual]}%`;
    resultado.style.display = "none";

    // Actualizar el título de la pestaña
    document.title = `AIDA - ${materiaActual.charAt(0).toUpperCase() + materiaActual.slice(1)}`;

    const pregunta = preguntas[materiaActual][Math.floor(Math.random() * preguntas[materiaActual].length)];
    preguntaTexto.textContent = pregunta.texto;
    opcionesDiv.innerHTML = "";

    pregunta.opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.textContent = opcion;
        btn.className = "opcion";
        btn.onclick = () => verificarRespuesta(opcion, pregunta.correcta, btn);
        opcionesDiv.appendChild(btn);
    });

    // Limpiar botones de acción previos
    const botonesAccion = document.getElementById("botones-accion");
    if (botonesAccion) botonesAccion.remove();
}

// Llamar a mostrarCuestionario al cargar la página
window.onload = mostrarCuestionario;

function verificarRespuesta(respuesta, correcta, botonSeleccionado) {
    const resultado = document.getElementById("resultado");
    const opcionesDiv = document.getElementById("opciones");
    const opciones = opcionesDiv.querySelectorAll(".opcion");

    // Deshabilitar todas las opciones para evitar múltiples clics
    opciones.forEach(btn => btn.disabled = true);

    // Marcar la respuesta seleccionada
    if (respuesta === correcta) {
        botonSeleccionado.classList.add("correcto");
        resultado.textContent = "¡Correcto! Progreso aumentado.";
        progresos[materiaActual] = Math.min(progresos[materiaActual] + 2, 100);
        actualizarProgreso();
        mostrarBotonSiguiente();
    } else {
        botonSeleccionado.classList.add("incorrecto");
        resultado.textContent = "Incorrecto. Intenta de nuevo.";
        mostrarBotonIntentar();
    }
    resultado.style.display = "block";
}

function mostrarBotonSiguiente() {
    let botonesAccion = document.getElementById("botones-accion");
    if (!botonesAccion) {
        botonesAccion = document.createElement("div");
        botonesAccion.id = "botones-accion";
        document.getElementById("practica-materia").appendChild(botonesAccion);
    }
    botonesAccion.innerHTML = `
        <button class="btn" onclick="siguientePregunta()">Siguiente</button>
        <button class="btn" onclick="cerrarCuestionario()">Cerrar</button>
    `;
}

function mostrarBotonIntentar() {
    let botonesAccion = document.getElementById("botones-accion");
    if (!botonesAccion) {
        botonesAccion = document.createElement("div");
        botonesAccion.id = "botones-accion";
        document.getElementById("practica-materia").appendChild(botonesAccion);
    }
    botonesAccion.innerHTML = `
        <button class="btn" onclick="mostrarCuestionario()">Volver a intentar</button>
        <button class="btn" onclick="cerrarCuestionario()">Cerrar</button>
    `;
}

function siguientePregunta() {
    mostrarCuestionario();
}

function actualizarProgreso() {
    const progresoTexto = document.getElementById("progreso-texto");
    const progresoBarra = document.getElementById("progreso-barra");
    progresoTexto.textContent = `${progresos[materiaActual]}%`;
    progresoBarra.style.width = `${progresos[materiaActual]}%`;
}

function cerrarCuestionario() {
    window.location.href = "index.html";
}