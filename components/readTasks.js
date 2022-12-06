import { createTask } from "./addTask.js"; //Para traer esa funcion hacia aquí
import { uniqueDates, orderDates } from "../services/date.js";
import dateElement from "./dateElement.js";

//Para usar esta funcion tenemos que exportarla con 'export'
export const displayTasks = () =>{//Funcion para leer la informacion almacenada en localStorage.   Esta funcion NO queremos que se ejecute cuando se haga addTask, es decir, NO cada vez que se agrega una nueva tarea, sino que se ejecute cuando cargue nuestra pagina. Por eso la vamos a exportar al archivo script.js y ejecutar la funcion ahí, asi cada vez que se inicie la pagina, se ejecuta esta funcion.
    const list = document.querySelector("[data-list]"); //Seleccionamos el <ul> donde despues vamos a agregar los <li> de cada tarea
    
    const taskList= JSON.parse(localStorage.getItem("tasks")) || [];//Hacemos lo mismo de (*7) para que tome lo almacenado en localStorage, transformarlo de String a script y almacenar todo eso en la variable taskList.

    const dates = uniqueDates(taskList);//Aquí uniqueDates() tiene como parametro la lista de tareas y fechas almacenadas en el localStorage.
    console.log(dates);//Muestra el array con las fechas sin repetir

    const order = orderDates(dates);//Va a comparar y ordenar las fechas dentro de la variable 'dates'. Recordar que dentro de esta está la funcion que agrega las fechas unicas.

    dates.forEach((date)=> { //el parametro con nombre 'date' se refiere a cada elemento de array (podria ser cualquier nombre), es decir a cada fecha dentro. Por cada una de las fechas dentro del arreglo, va a taskList y generar la estructura 
        console.log(date);

        const dateMoment = moment(date, "DD/MM/YYYY"); //Agarramos y pasamos la fecha divisoria a moment para poder usar una funcion de moment.

        list.appendChild(dateElement(date));//Nosotros con este forEach queremos que se haga el siguiente appendChild por cada una de las fechas dentro del arreglo y no por cada tarea
            
        taskList.forEach((task) => { //Para cada uno de los elementos de la taskList, se ejecutará la funcion. Nota: El parametro 'tasks' es un nombre para darle a cada uno de los elementos del arreglo, podría ser cualquier nombre. 
            
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskDate);//Para ver la diferencia entre la fecha divisoria entre las tarjetas y la fecha que hay dentro de cada tarjeta. Si la diferencia es igual a 0, significa que es la misma fecha.
            if(diff == 0){//Si no hay diferencia entre las fechas, crea la tarjeta en esa seccion de la misma fecha.
                list.appendChild(createTask(task)); // createTask creará el html con el contenido del parametro 'tasks', es decir, creará el <li> con la informacion (la tarjeta con la informacion guardada de tarea y fecha del localStorage). 
                //El appendChild() agregará cada tarjeta (es decir, cada <li>) creada por createTask a la list (<ul> donde se va a mostrar cada tarea).   
            }

        });
    });

   
}