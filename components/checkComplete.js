const checkComplete = (id) => {
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');
  i.addEventListener('click', (event)=> completeTask(event,id)); //Cada vez que se le haga click a este icono, se ejecutará la funcion completeTask que recibirá como parametro el evento y el id.
  return i;
};
// Immediately invoked function expression IIFE
const completeTask = (event, id) => {
  const element = event.target;
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');

  const tasks= JSON.parse(localStorage.getItem("tasks"));
  const index= tasks.findIndex(item => item.id === id);
  tasks[index]["complete"]=!tasks[index]["complete"];
  localStorage.setItem("tasks", JSON.stringify(tasks));//Para guardar el estado de la tarea segun el check
};

export default checkComplete;
