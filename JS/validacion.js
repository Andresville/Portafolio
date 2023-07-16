export function valida(input) {
  const tipoDeInput = input.dataset.tipo; //Busca los data-tipo en el HTML
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
// Pone o quita clases CSS y mensajes de error segun el campo este en valido o no
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";// sino hay error busca la clase y deja el campo vacio
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

// No da distintos tipos de errores segun el campo
const tipoDeErrores = [
  "valueMissing", // se fija que el campo no este vacio
  "typeMismatch", // se fija que sea el formato de un email
  "patternMismatch", // se fija que cumpla las condiciones establecidas en el HTML patter para que sea una contraseña valida
  "customError",  // se fija que la fecha ingresada cumpla la condicion (en este caso ser mayor de 18 años)
];

// Carga los errores segun el campo
const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

//Recorre el arreglo anterior y se fija que tipo de error muestra
function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

// Validacion de la fecha de nacimiento

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
