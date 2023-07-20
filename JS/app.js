import { valida } from "./validacion.js";

const inputs = document.querySelectorAll(".inputs");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});