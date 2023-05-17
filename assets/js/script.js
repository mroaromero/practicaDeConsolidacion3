$(document).ready(() => { // Carga de documento HTML y manejo del DOM
  let presupuesto = 0; // Declaración de variables de ES6
  let gastos = []; // Arreglo de las variables
  let saldo = 0;
 //FORMULARIO N°1
  $("#btnPresupuesto").click(() => { // Evento Click para botón añadir presupuesto y ejecuta la función =>
    presupuesto = $("#presupuestoinicial").val(); // Almacena el dato de un formulario con el método .val() de jQuery
    presupuesto = parseInt(presupuesto); // Valor en números enteros
    if (presupuesto === '') { // Bucle if para validación que no existan un campos en blanco y devuelve una alerta al evento click
      alert("Por favor, complete el campo de presupuesto."); 
      return;
    }
    if (!isNaN(presupuesto)) { // Verifica si el valor es un número válido
      $("#presupuesto").text(`$${presupuesto}`);
      saldo = presupuesto;
      console.log(presupuesto);
      console.log(saldo);
      $("#saldo").text(`$${saldo}`); // Concatena símbolo $
    $("#presupuestoinicial").val(""); // Limpia el campo de entrada después del evento click
    } else { // Si no es un número válido, devuelve alerta al evento click
      alert("Por favor, ingrese un presupuesto válido.");
    }
  });
  //FORMULARIO N°2
  $("#btnAgregarGasto").click(() => {
    let nombreGasto = $("#nombreDelGasto").val();
    let cantidadGasto = $("#cantidadDelGasto").val();
    cantidadGasto = parseInt(cantidadGasto);
    if (!isNaN(cantidadGasto)) {
      if (nombreGasto.trim() === '' || cantidadGasto === '') { // Verifica que la cadena de texto creada devuelva una nueva cadena con
        alert("Por favor, complete todos los campos de entrada."); // los espacios en blanco eliminados al inicio y al final por el método .trim()
        return;
      }
      if (saldo - cantidadGasto < 0) { // Si la resta es menor a cero, devuelve alerta
        alert("¡Los gastos exceden el presupuesto!");
        $("#nombreDelGasto").val("");
        $("#cantidadDelGasto").val("");
        return;
      }
      gastos.push({ nombre: nombreGasto, cantidad: cantidadGasto }); // Objeto
      console.log(gastos);
      saldo -= cantidadGasto; // Actualiza valor del saldo, restando la cantidad del gasto actual
      $("#gastos").text(`$${calcularTotalGastos()}`);
      $("#saldo").text(`$${saldo}`);
      console.log(saldo);
      $("#nombreDelGasto").val("");
      $("#cantidadDelGasto").val("");
      actualizarListaGastos(); // LLama a la función para agregar los objetos a las fila de la lista de gastos
    } else {
      alert("Por favor, ingrese una cantidad válida para el gasto.");
    }
  });
  //FUNCIÓN PARA ELIMINAR FILAS DE LA LISTA DE GASTOS
  $(document).on("click", ".btnEliminarGasto", function () { // Controlador de eventos para el botón que elimina, los objetos creados de la lista de gastos
    let index = $(this).data("index"); // Obtiene el valor del atributo index almacenado en el elemento actual (this), con el método .data() de jQuery
    let cantidadGasto = gastos[index].cantidad; // Obtiene el valor de la propiedad "cantidad" del objeto, en la posición index del arreglo gastos
    gastos.splice(index, 1); // .splice elimina un elemento (gastos) de la posición index del arreglo, eliminando 1 elemento de un total
    saldo += cantidadGasto; // Actualiza valor del saldo, sumando la cantidad del gasto actual
    $("#gastos").text(`$${calcularTotalGastos()}`); // Obtiene el valor de la función
    $("#saldo").text(`$${saldo}`);
    actualizarListaGastos();
  });
  // FUNCIÓN 
  function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  } // La función suma las cantidades de gasto utilizando el método .reduce(), combinando los valores del arreglo en un solo resultado

  function actualizarListaGastos() {
    let listaDeGastos = $("#listaDeGastos");
    listaDeGastos.empty(); // Elimina todos los elementos hijos de un elemento HTML con el método .empty()
    for (let i = 0; i < gastos.length; i++) { // bucle for para generar filas de una tabla HTML a partir de los objetos en el arreglo gastos
      let fila = `<tr>
      <td>${gastos[i].nombre}</td>
      <td>$${gastos[i].cantidad}</td>
      <td><button class="btnEliminarGasto" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button></td>
      </tr>`; // interpolación de los valores nombre y cantidad en cada fila
      listaDeGastos.append(fila); // Añade contenido (fila) con el método .append() de jQuery al elemento HTML seleccionado
    }
  }
});

