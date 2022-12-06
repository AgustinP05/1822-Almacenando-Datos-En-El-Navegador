
import { addTask } from "./components/addTask.js";
import { displayTasks } from "./components/readTasks.js";

const btn = document.querySelector('[data-form-btn]');//Selecciona el boton

//Arrow functions o funciones anonimas
btn.addEventListener('click', addTask);//Que ejecute la funcion addTask cuando se le de al boton 'Agregar tarea'.

displayTasks();