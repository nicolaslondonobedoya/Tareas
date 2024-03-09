// **VARIABLES GLOBALES**

const SUBSIDIOS_ESTRATO = {
    1: 0.15,
    2: 0.1,
    3: 0.05,
  };
  
  const SUBSIDIO_SECTOR_RURAL = 35000;
  
  let SUBSIDIO_HIJO_PRIMARIA = 0;
  let SUBSIDIO_HIJO_SECUNDARIA = 0;
  let SUBSIDIO_HIJO_UNIVERSIDAD = 0;
  
  let nominaTotal = 0;
  let nominaHombres = 0;
  let nominaMujeres = 0;
  
  let empleadoMasCaro = {
    nombre: "",
    costo: 0,
  };
  
  let gastoSubsidioSecundaria = 0;
  let gastoPasajesExtranjeros = 0;
  
  // **FUNCIONES**
  
  function obtenerDatosEmpleado() {
    const nombre = prompt("Ingrese el nombre del empleado:");
    const salario = parseFloat(prompt("Ingrese el salario del empleado:"));
    const estrato = parseInt(prompt("Ingrese el estrato delvenci empleado (1, 2 o 3):"));
    const sectorRural = confirm(
      "¿El empleado vive en el sector rural? (Presione OK para sí)"
    );
    const genero = prompt("Ingrese el genero del empleado (Hombre/Mujer):").toLowerCase();
    const numeroHijosPrimaria = parseInt(
      prompt("Ingrese el número de hijos que estudian primaria:")
    );
    const numeroHijosSecundaria = parseInt(
      prompt("Ingrese el número de hijos que estudian secundaria:")
    );
    const numeroHijosUniversidad = parseInt(
      prompt("Ingrese el número de hijos que estudian universidad:")
    );
    const extranjero = confirm(
      "¿El empleado es extranjero? (Presione OK para sí)"
    );
  
    return {
      nombre,
      salario,
      estrato,
      sectorRural,
      genero,
      numeroHijosPrimaria,
      numeroHijosSecundaria,
      numeroHijosUniversidad,
      extranjero,
    };
  }
  
  function calcularSubsidioEstrato(salario, estrato) {
    return salario * SUBSIDIOS_ESTRATO[estrato];
  }
  
  function calcularSubsidioHijos(
    numeroHijosPrimaria,
    numeroHijosSecundaria,
    numeroHijosUniversidad
  ) {
    return (
      numeroHijosPrimaria * SUBSIDIO_HIJO_PRIMARIA +
      numeroHijosSecundaria * SUBSIDIO_HIJO_SECUNDARIA +
      numeroHijosUniversidad * SUBSIDIO_HIJO_UNIVERSIDAD
    );
  }
  
  function calcularCostoTotalEmpleado(
    salario,
    subsidioEstrato,
    subsidioSectorRural,
    subsidioHijos,
    extranjero
  ) {
    let costoTotal = salario;
    costoTotal -= subsidioEstrato;
    if (subsidioSectorRural) {
      costoTotal -= subsidioSectorRural;
    }
    costoTotal += subsidioHijos;
    if (extranjero) {
      costoTotal += 2 * 500000; // Costo de 2 vuelos al año
    }
    return costoTotal;
  }
  
  function actualizarTotales(
    costoTotal,
    genero,
    empleadoMasCaroActual,
    numeroHijosSecundaria,
    extranjero
  ) {
    nominaTotal += costoTotal;
    if (genero === "hombre") {
      nominaHombres += costoTotal;
    } else {
      nominaMujeres += costoTotal;
    }
  
    if (costoTotal > empleadoMasCaroActual.costo) {
      empleadoMasCaroActual.nombre = nombre;
      empleadoMasCaroActual.costo = costoTotal;
    }
  
    gastoSubsidioSecundaria +=
      numeroHijosSecundaria * SUBSIDIO_HIJO_SECUNDARIA;
    if (extranjero) {
      gastoPasajesExtranjeros += 2 * 500000;
    }
  }
  
// **EJECUCIÓN**

// Pedir valores de subsidios por hijos
SUBSIDIO_HIJO_PRIMARIA = parseFloat(
  prompt("Ingrese el subsidio por hijo en primaria:")
);
SUBSIDIO_HIJO_SECUNDARIA = parseFloat(
  prompt("Ingrese el subsidio por hijo en secundaria:")
);
SUBSIDIO_HIJO_UNIVERSIDAD = parseFloat(
  prompt("Ingrese el subsidio por hijo en universidad:")
);

// Bucle para procesar empleados
while (true) {
  const empleado = obtenerDatosEmpleado();

  const subsidioEstrato = calcularSubsidioEstrato(
    empleado.salario,
    empleado.estrato
  );

  const subsidioSectorRural = empleado.sectorRural
    ? SUBSIDIO_SECTOR_RURAL
    : 0;

  const subsidioHijos = calcularSubsidioHijos(
    empleado.numeroHijosPrimaria,
    empleado.numeroHijosSecundaria,
    empleado.numeroHijosUniversidad
  );

  const costoTotalEmpleado = calcularCostoTotalEmpleado(
    empleado.salario,
    subsidioEstrato,
    subsidioSectorRural,
    subsidioHijos,
    empleado.extranjero
  );

  actualizarTotales(
    costoTotalEmpleado,
    empleado.genero,
    empleadoMasCaro,
    empleado.numeroHijosSecundaria,
    empleado.extranjero
  );

  // Preguntar si se desea procesar otro empleado
  const continuar = confirm(
    "¿Desea procesar otro empleado? (Presione OK para sí)"
  );
  if (!continuar) {
    break;
  }
}

// **IMPRIMIR RESULTADOS**

console.log("**Costo total de la nómina:**", nominaTotal);
console.log("**Costo de la nómina de hombres:**", nominaHombres);
console.log("**Costo de la nómina de mujeres:**", nominaMujeres);
console.log(
  "**Empleado que más dinero le cuesta a la empresa:**",
  empleadoMasCaro.nombre,
  "-",
  empleadoMasCaro.costo
);
console.log(
  "**Gasto en subsidios para hijos en secundaria:**",
  gastoSubsidioSecundaria
);
console.log(
  "**Gasto en pasajes para empleados extranjeros:**",
  gastoPasajesExtranjeros
);