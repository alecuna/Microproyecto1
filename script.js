// DOM selector

const btnInicio = document.querySelector(".btn-inicio");
const formInicio = document.querySelector(".form-inicio");
const btnAceptar = document.querySelector(".btn-aceptar");
const btnGenerar = document.querySelector(".btn-generar");
const cuentas = document.querySelector(".cuentas");
let j1 = document.getElementById("j1").value.trim();
let j2 = document.getElementById("j2").value.trim();
let j3 = document.getElementById("j3").value.trim();
let j4 = document.getElementById("j4").value.trim();

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
  let text;
  if (j1 === "" || j2 === "" || j3 === "" || j4 === "") {
    text = "Error. Alguno de los nombres no es valido";
    console.log(j1);
  } else {
    text = "Todos los nombres son validos.";
  }
  document.getElementById("demo").innerHTML = text;
}

// Funcion para ocultar el boton de inicio y el form despues de llenar los nombres de los jugadores
btnAceptar.addEventListener("click", function () {
  btnInicio.classList.add("hidden");
  formInicio.classList.add("hidden");
  cuentas.classList.remove("hidden");
  let tabla1 = generateArray(3, 1, 50);
  let tabla2 = generateArray(3, 1, 50);
  let tabla3 = generateArray(3, 1, 50);
  let tabla4 = generateArray(3, 1, 50);
  displayTable(tabla1, "tabla1", "jugador1");
  displayTable(tabla2, "tabla2", "jugador2");
  displayTable(tabla3, "tabla3", "jugador3");
  displayTable(tabla4, "tabla4", "jugador4");
});

// Funcion para gerenerar un array 2D (matriz nxn) con numeros del 1 al 100
function generateArray(n, min, max) {
  let array2D = [];

  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
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
function randomNum(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
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

// numAcertado("tabla1", 11, "acertados");
// numAcertado("tabla2", 11, "acertados");
// numAcertado("tabla3", 11, "acertados");
// numAcertado("tabla4", 11, "acertados");

// numAcertado("tabla1", 20, "acertados");
// numAcertado("tabla2", 20, "acertados");
// numAcertado("tabla3", 20, "acertados");
// numAcertado("tabla4", 20, "acertados");
