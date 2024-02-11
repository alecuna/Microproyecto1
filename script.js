// DOM selector

const btnInicio = document.querySelector(".btn-inicio");
const formInicio = document.querySelector(".form-inicio");
const btnAceptar = document.querySelector(".btn-aceptar");
const btnGenerar = document.querySelector(".btn-generar");
const btnFin = document.getElementById("btn-fin");
const cuentas = document.querySelector(".cuentas");
const btnJugadores = document.querySelector(".btn-jugadores");
const btnJ1 = document.getElementById("btn-j1");
const btnJ2 = document.getElementById("btn-j2");
const btnJ3 = document.getElementById("btn-j3");
const btnJ4 = document.getElementById("btn-j4");
const juego = document.getElementById("juego");
const fin = document.querySelector(".fin");

let numRonda = 0;
let puntaje = 0;
let ganador = "";
resJ1 = 0;
resJ2 = 0;
resJ3 = 0;
resJ4 = 0;

function inicio() {
  btnFin.classList.add("hidden");
  fin.classList.add("hidden");
  btnInicio.classList.remove("hidden");
  btnInicio.innerHTML = "Iniciar juego";
  document.getElementById("text").innerHTML = "";
}

// Despliegue form para nombrar jugadores
btnInicio.addEventListener("click", () => {
  if (formInicio.classList.contains("hidden")) {
    formInicio.classList.remove("hidden");
    btnInicio.textContent = "Ocultar";
  } else {
    formInicio.classList.add("hidden");
    btnInicio.textContent = "Iniciar Juego";
  }
});

// Funcion para validar que no queden nombres vacios
function validate() {
  let j1 = document.getElementById("j1").value.trim();
  let j2 = document.getElementById("j2").value.trim();
  let j3 = document.getElementById("j3").value.trim();
  let j4 = document.getElementById("j4").value.trim();
  let n = document.getElementById("size").value;
  let text;
  if (j1 === "" || j2 === "" || j3 === "" || j4 === "" || n < 3 || n > 5) {
    text = "Error. Alguno de los datos no es valido";
  } else {
    iniciar(n, j1, j2, j3, j4);
  }
  document.getElementById("text").innerHTML = text;
}

// Funcion para ocultar el boton de inicio y el form despues de llenar los nombres de los jugadores
let tabla1;
let tabla2;
let tabla3;
let tabla4;

function iniciar(n, j1, j2, j3, j4) {
  btnInicio.classList.add("hidden");
  formInicio.classList.add("hidden");
  cuentas.classList.remove("hidden");
  btnJugadores.classList.remove("hidden");

  let tabla1 = generateArray(n, 1, 50);
  let tabla2 = generateArray(n, 1, 50);
  let tabla3 = generateArray(n, 1, 50);
  let tabla4 = generateArray(n, 1, 50);

  displayTable(tabla1, "carton1", j1);
  displayTable(tabla2, "carton2", j2);
  displayTable(tabla3, "carton3", j3);
  displayTable(tabla4, "carton4", j4);

  document.getElementById("btn-j1").innerHTML = j1;
  document.getElementById("btn-j2").innerHTML = j2;
  document.getElementById("btn-j3").innerHTML = j3;
  document.getElementById("btn-j4").innerHTML = j4;
}

btnJ1.addEventListener("click", () => {
  tabla1 = document.getElementById("carton1");
  if (tabla1.classList.contains("hidden")) {
    tabla1.classList.remove("hidden");
    tabla2.classList.add("hidden");
    tabla3.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ2.addEventListener("click", () => {
  tabla2 = document.getElementById("carton2");
  if (tabla2.classList.contains("hidden")) {
    tabla2.classList.remove("hidden");
    tabla1.classList.add("hidden");
    tabla3.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ3.addEventListener("click", () => {
  tabla3 = document.getElementById("carton3");
  if (tabla3.classList.contains("hidden")) {
    tabla3.classList.remove("hidden");
    tabla1.classList.add("hidden");
    tabla2.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ4.addEventListener("click", () => {
  tabla4 = document.getElementById("carton4");
  if (tabla4.classList.contains("hidden")) {
    tabla4.classList.remove("hidden");
    tabla1.classList.add("hidden");
    tabla2.classList.add("hidden");
    tabla3.classList.add("hidden");
  }
});

// Funcion para gerenerar un array 2D (matriz nxn) con numeros del 1 al 100
function generateArray(n, min, max) {
  let array2D = [];
  let usedNumbers = new Set();

  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (usedNumbers.has(randomNum));

      usedNumbers.add(randomNum);
      row.push(randomNum);
    }
    array2D.push(row);
  }

  return array2D;
  let Array = array2D;
}

// Funcion para mostrar el array que se creo en 'generateArray' en forma de tabla
// el parametro 'tabla' es para saber a que jugador le pertenece y el 'title' para mostrar el nombre de dicho jugador
function displayTable(array2D, tabla, title) {
  const container = document.getElementById(tabla);

  let table = document.createElement("table");
  let caption = table.createCaption();
  caption.textContent = title;

  array2D.forEach((row) => {
    let tableRow = document.createElement("tr");

    row.forEach((cell) => {
      let tableCell = document.createElement("td");
      tableCell.textContent = cell;
      tableRow.appendChild(tableCell);
    });

    table.appendChild(tableRow);
  });

  container.appendChild(table);
}

// Generador de un numero random sin repeticiones
let usedNumbers = new Set();

function randomNum(min, max) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (usedNumbers.has(num));
  usedNumbers.add(num);
  document.getElementById("randomNum").innerHTML = "Número: " + num;
  return num;
}

// Muestra el numero de ronda
btnGenerar.addEventListener("click", function () {
  let num = randomNum(1, 50);
  if (numRonda === 25) {
    game_over();
  } else {
    numRonda++;
    document.getElementById("ronda").innerHTML = "Ronda: " + numRonda;
    numAcertado("carton1", num, "acertados");
    numAcertado("carton2", num, "acertados");
    numAcertado("carton3", num, "acertados");
    numAcertado("carton4", num, "acertados");
  }
});

// Funcion para colorear el numero acertado
function numAcertado(tableId, num, classA) {
  const table = document.getElementById(tableId);
  const cells = table.getElementsByTagName("td");

  for (let cell of cells) {
    if (parseInt(cell.textContent, 10) === num) {
      cell.classList.add(classA);
    }
  }

  // let { rowsCompletas, colsCompletas } = checkCompleta(
  //   document.getElementById("tabla1"),
  //   "acertados"
  // );
  // console.log("Fully highlighted rows: ", rowsCompletas);
  // console.log("Fully highlighted columns: ", colsCompletas);
}

// revisa si una fila o culmna esta completa
function checkCompleta(table, classA) {
  console.log(table);
  const rows = table.rows;
  let rowsCompletas = [];
  let colsCompletas = [];
  let numRows = rows.length; // por alguna razon este .legth nunca quizo funcionar
  let numCols = rows[0].cells.length;

  // revisa cada fila
  for (let i = 0; i < numRows; i++) {
    let completa = true;
    for (let j = 0; j < numCols; j++) {
      if (!rows[i].cells[j].classList.contains(classA)) {
        completa = false;
        break;
      }
    }
    if (completa) {
      rowsCompletas.push(i);
    }
  }

  // revisa cada columna
  for (let i = 0; i < numCols; i++) {
    let completa = true;
    for (let j = 0; j < numRows; j++) {
      if (!rows[j].cells[i].classList.contains(classA)) {
        completa = false;
        break;
      }
    }
    if (completa) {
      colsCompletas.push(i);
    }
  }

  return { rowsCompletas, colsCompletas };
}

let { rowsCompletas, colsCompletas } = checkCompleta(
  document.getElementById("carton1"),
  "acertados"
);
console.log("Filas completas: ", rowsCompletas);
console.log("Columnas completas: ", colsCompletas);

function game_over() {
  juego.classList.add("hidden");
  cuentas.classList.add("hidden");
  fin.classList.remove("hidden");
  btnFin.classList.remove("hidden");
  btnFin.addEventListener("click", () => {
    inicio();
  });
  let j1 = document.getElementById("j1").value.trim();
  let j2 = document.getElementById("j2").value.trim();
  let j3 = document.getElementById("j3").value.trim();
  let j4 = document.getElementById("j4").value.trim();
  document.getElementById("resJ1").innerHTML = j1 + " obtuvo: " + resJ1 + "pts";
  document.getElementById("resJ2").innerHTML = j2 + " obtuvo: " + resJ2 + "pts";
  document.getElementById("resJ3").innerHTML = j3 + " obtuvo: " + resJ3 + "pts";
  document.getElementById("resJ4").innerHTML = j4 + " obtuvo: " + resJ4 + "pts";
}
