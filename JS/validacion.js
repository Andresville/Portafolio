export function valida(input){
	const tipoDeInput = input.dataset.tipo;
	if(validadores[tipoDeInput]){
		validadores[tipoDeInput](input);
	}

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
  }
}

const tipoDeErrores = [
  "valueMissing", // se fija que el campo no este vacio
  "typeMismatch" // se fija que sea el formato de un email
 
]

const mensajesDeError = {

  //Inputs contactanos

  nombre:{
    valueMissing:"El campo Nombre no puede estar vacio",
  },
  email:{
    valueMissing:"El campo Email no puede estar vacio",
    typeMismatch: "El correo no es válido",
  },
  asunto:{
    valueMissing:"El campo Asunto no puede estar vacio",
  },
  mensaje:{
    valueMissing:"El campo Mensaje no puede estar vacio",
  },

}

const validadores = {

};

function mostrarMensajeDeError(tipoDeInput,input){
  let mensaje = "";
  tipoDeErrores.forEach(error => {
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });

  return mensaje;
}