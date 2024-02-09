// DOM selector

const btnInicio = document.querySelector(".btn-inicio");
const formInicio = document.querySelector(".form-inicio");
const btnAceptar = document.querySelector(".btn-aceptar");
const btnGenerar = document.querySelector(".btn-generar");
const cuentas = document.querySelector(".cuentas");
const btnJugadores = document.querySelector(".btn-jugadores");
const btnJ1 = document.getElementById("btn-j1");
const btnJ2 = document.getElementById("btn-j2");
const btnJ3 = document.getElementById("btn-j3");
const btnJ4 = document.getElementById("btn-j4");

let numRonda = 0;
let puntaje = 0;
let ganador = "";

// Despliegue form para nombrar jugadores
btnInicio.addEventListener("click", function () {
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
    text = "Error. Alguno de los nombres no es valido";
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

  displayTable(tabla1, "tabla1", j1);
  displayTable(tabla2, "tabla2", j2);
  displayTable(tabla3, "tabla3", j3);
  displayTable(tabla4, "tabla4", j4);

  document.getElementById("btn-j1").innerHTML = j1;
  document.getElementById("btn-j2").innerHTML = j2;
  document.getElementById("btn-j3").innerHTML = j3;
  document.getElementById("btn-j4").innerHTML = j4;
}

// btnAceptar.addEventListener("click", function () {
//   btnInicio.classList.add("hidden");
//   formInicio.classList.add("hidden");
//   cuentas.classList.remove("hidden");
//   btnJugadores.classList.remove("hidden");

//   let tabla1 = generateArray(3, 1, 50);
//   let tabla2 = generateArray(3, 1, 50);
//   let tabla3 = generateArray(3, 1, 50);
//   let tabla4 = generateArray(3, 1, 50);

//   displayTable(tabla1, "tabla1", "jugador1");
//   displayTable(tabla2, "tabla2", "jugador2");
//   displayTable(tabla3, "tabla3", "jugador3");
//   displayTable(tabla4, "tabla4", "jugador4");
// });

btnJ1.addEventListener("click", () => {
  tabla1 = document.getElementById("tabla1");
  if (tabla1.classList.contains("hidden")) {
    tabla1.classList.remove("hidden");
    tabla2.classList.add("hidden");
    tabla3.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ2.addEventListener("click", () => {
  tabla2 = document.getElementById("tabla2");
  if (tabla2.classList.contains("hidden")) {
    tabla2.classList.remove("hidden");
    tabla1.classList.add("hidden");
    tabla3.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ3.addEventListener("click", () => {
  tabla3 = document.getElementById("tabla3");
  if (tabla3.classList.contains("hidden")) {
    tabla3.classList.remove("hidden");
    tabla1.classList.add("hidden");
    tabla2.classList.add("hidden");
    tabla4.classList.add("hidden");
  }
});

btnJ4.addEventListener("click", () => {
  tabla4 = document.getElementById("tabla4");
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

// Generador de un numero random
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

// Muestra el numero random en pantalla
btnGenerar.addEventListener("click", function () {
  let num = randomNum(1, 50);
  numRonda++;
  document.getElementById("ronda").innerHTML = "Ronda: " + numRonda;
  numAcertado("tabla1", num, "acertados");
  numAcertado("tabla2", num, "acertados");
  numAcertado("tabla3", num, "acertados");
  numAcertado("tabla4", num, "acertados");
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
}

function checkHighlightedRowsAndColumns(tableId, classA) {
  const table = document.getElementById(tableId);
  const rows = table.rows;
  let fullyHighlightedRows = [];
  let fullyHighlightedCols = [];
  let numRows = rows.length;
  let numCols = rows[0].cells.length;

  // Check each row
  for (let i = 0; i < numRows; i++) {
    let allHighlighted = true;
    for (let j = 0; j < numCols; j++) {
      if (!rows[i].cells[j].classList.contains(classA)) {
        allHighlighted = false;
        break;
      }
    }
    if (allHighlighted) {
      fullyHighlightedRows.push(i); // Store the index of the fully highlighted row
    }
  }

  // Check each column
  for (let i = 0; i < numCols; i++) {
    let allHighlighted = true;
    for (let j = 0; j < numRows; j++) {
      if (!rows[j].cells[i].classList.contains(classA)) {
        allHighlighted = false;
        break;
      }
    }
    if (allHighlighted) {
      fullyHighlightedCols.push(i); // Store the index of the fully highlighted column
    }
  }

  return { fullyHighlightedRows, fullyHighlightedCols };
}

// let { fullyHighlightedRows, fullyHighlightedCols } =
//     checkHighlightedRowsAndColumns("tabla1", "acertados");
//   console.log("Fully highlighted rows: ", fullyHighlightedRows);
//   console.log("Fully highlighted columns: ", fullyHighlightedCols);

// Example usage
// let { fullyHighlightedRows, fullyHighlightedCols } =
//   checkHighlightedRowsAndColumns("t", "classA");
// console.log("Fully highlighted rows: ", fullyHighlightedRows);
// console.log("Fully highlighted columns: ", fullyHighlightedCols);
