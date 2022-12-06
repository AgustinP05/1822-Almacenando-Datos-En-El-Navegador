import { displayTasks } from "./readTasks.js";

const deleteIcon = (id) => {//Genera el elemento 'i' y le agrega las clases.
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', () =>deleteTask(id)); //Se llama a la funcion cada vez que se de click al icono
  return i;
};

const deleteTask = (id) => {
  const li = document.querySelector("[data-list]")
  const tasks= JSON.parse(localStorage.getItem('tasks'));
  const index = tasks.findIndex((item)=> item.id === id);//Queremos buscar la posicion/index de la tarjeta para eliminar su html. 'item' es la tarjeta que recibimos, y miramos su id.
  tasks.splice(index,1);//splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos
  li.innerHTML = '';//Eliminar el contenido
  localStorage.setItem("tasks", JSON.stringify(tasks))//Volver a actualizar el loacalStorage
  displayTasks();//Utilizamos la funcion importada para recargar la pagina con los cambios hechos
};

export default deleteIcon;
