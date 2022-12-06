/*
(*1)Empezamos agregandole el calendario al lado del campo de texto, asi luego podemos agregarle fecha a l atarea que queramos hacer.
  const calendar= document.querySelector("[data-form-date]");//Seleccionamos el calendario para nuestras tareas, recordar que los data atributes se ponen entre corchetes dentro de las comillas.
  const date= calendar.value;//Tomar el valor dado en el calendario
  console.log(date); //Vemos la informacion en consola

Ahora vamos a utilizar la libreria 'Moment.js'. Una libreria basicamente es reutilizar codigo funcional ya hecho por alguien, y nosotros reutilizarla para nuestro proyecto.
Esta libreria se ecarga ed trabajar con fechas en el navegador.
Para poder utilizar el codigo de ahi, vamos a utilizar cdnjs y escribir moment.js. Ahi podemos copiar alguna url donde está el codigo y poner esa url en una etiqueta script en el final del html.
Con esto, ya podemos usar moment.

(*2)Definimos el formato de nuestra fecha del calendario y lo imprimimos en consola con:  
  //////////////// |toma la fecha|define el formato  |
  const dateFormat = moment(date).format("DD/MM/YYYY");
  console.log(dateFormat); //imprimimos en consola

(*3)Agregar etiqueta <span> al HTML conteniendo la fecha
  const dateElement = document.createElement("span"); //Decimos que queremos crear una etiqueta span
  dateElement.innerHTML = dateFormat;//Decimos que el contenido del span, debe ser el valor de dateFormat.
  
  //abajo del append del titleContent:
  task.appendChild(dateElement); //Para agregar el span al html
  
(*4) Para acomodar el codigo, creamos una nueva funcion. Esta nueva function es addTask. Mientras que createTask() creará toda la estructura html, tomar los datos y ponerlos donde corresponde. addTask() agregará a la lista la tarjeta con lo de createTask() dentro.  
  const addTask = (evento)=>{ //Recibirá el evento, que son los datos dados por el usuario al dar click al boton
    const list = document.querySelector('[data-list]'); //Selecciona/agarra la etiqueta <ul> que en el futuro contendrá todas nuestras tarjetas
    const task = createTask(evento);//llamada a la funcion
    list.appendChild(task); //la <ul> Contendrá todo lo hecho por createTask, es decir, contendrá todos los elementos de la tarjeta y su contenido
  }

vamos a tomar los datos que esta poniendo el usuario y los vamos a poner en una API nativa del navegador.
//El API de almacenamiento web, proporciona los mecanismos mediante los cuales el navegador peude almacenar informacion de tipo clave/valor, de una forma mucho mas intuitiva que utilizando cookies.
//Tenemos 2 mecanismos:
//sessionStorage: La informacion vive mientras la pestaña esté abierta, si se cierra se pierde esa informacion.
//localStorage: hace lo mismo, pero persiste incluso cuando el navegador se cierre y se reabra.
(*5)//Utilizamos mecanismo sessionStorage:
//Primero tenemos que crear un objeto que almacene la informacion que creamos necesaria.
  const taskObj = {
    value, //Nombres de variables que queremos almacenar, value corresponde al texto de cada tarea. Y dateFormat corresponde al valor de las fechas seleccionadas
    dateFormat
  };

  //sessionStorage.setItem("tasks", taskObj);//setItem recibe dos parametros: la llave y el clave/valor que le quiero almacenar.
  //hay un inconveniente, necesitamos que la clave/valor, en este caso taskObj, este en formato String
  //Para eso vamos a usar el JSON.stringify para transformar codigo JS a JSON String. Entonces:
  sessionStorage.setItem("tasks", JSON.stringify(taskObj));
  //Con eso ahora si tenemos acceso a la infromacion que estamos almacenando. El sessionStorage tiene como desventaja que si cerramos la pestaña, se pierde toda esa info.

(*5b)Utilizamos mecanismo localStorage. Que es la que vamos a dejar en nuestr código.
  localStorage.setItem("tasks", taskObj);
  
(*6)//El problema es que así compo está el codigo, el localStorage solo guarda la ultima tarea agregada.
//Para almacenar todas esas tareas y que no se sobreescriban por la ultima vamos a hacer una lista que contengan todas esas tareas.

  const taskList = []; //Creamos el array vacío

  taskList.push(taskObj);//Al array le agregamos el contenido de cada tarea que se agregue a la lista
(*7)//Aunque ya habíamos almacenado diferentes tareas, se estaban guardando en esta taskList.
  //Cada vez que nosotros regresemos a nuestra página o la recarguemos, la información que ya estaba almacenada en taskList, va a volverse a inicializar como un arreglo vacío. 
  //Entonces, ahora queremos que cada vez que se inicialice nuestro programa, tome la información que existe en localStorage y almacenarla en este arreglo. 

  //Recordemos, una manera de obtener informacion es con localStorage.getItem(""). Su parametro tiene que ser el nombre de la llave del setItem que queremos encontrar. En este caso la llave es "tasks". 
  Entonces borramos el 'const taskList = [];' y hacemos en nuestro código:
  const taskList= localStorage.getItem("tasks");

  En este punto, nos dará error y null, ya que en application no se agregó nada. Esto sucede porque el push() sigue intentando meter las tareas al array, pero no se pude hacer push() en null, por eso el error.
  La forma de arreglar esto es con || que es un operador or.
  taskList= localStorage.getItem("tasks") || [];  
  Con eso, le decimos a la aplicación que en caso de que localStorage este con datos se comporte de una manera, si en caso contrario estuviera vacío, la constante tasks empezaría como un arreglo vacío. Las expresiones lógicas son evaluadas de izquierda a derecha, luego, si la primera declaración sea verdadera se ejecuta normalmente y la segunda declaración no es aplicada, y si el primer es evaluado como falso, ejecutamos el segundo caso.
  true || false // true
  false || true // true
  
  Pero "tasks" está en formato String y no en script, entonces deberíamos usar un JSON para hacerlo script.
  Con JSON.parse() para pasar algo en formato String a script.


(*8) Luego de haber reorganizado el codigo y las funciones, vamos a crear un nuevo componente que se va a encargar de leer la información que tenemos en localStorage y generar toda esta estructura.
  Creamos el nuevo archivo readTasks.js

*/


import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';

import { displayTasks } from './readTasks.js';

//Toda la informacion de las tareas y fecha puestas por el usuario quedan en addTask() para luego que sean recibidas por createTask(). Para que este las reciba, en lugar de mandar en su funcion el parametro 'evento', debemos pasar el taskObj. En el parametro de la creacion de createTask, debemos poner las propiedades del objeto que queramos recibir ahí.
//(*4)Nueva funcion para agregar tarjeta al <ul>. La exportamos al archivo script.js
export const addTask = (evento)=>{ //Recibirá el evento, que son los datos dados por el usuario al dar click al boton. //En resumen de la funcion. La funcion addTask va a recibir un evento y este evento es el que genera el formulario.
  evento.preventDefault();
  
  //Los querySelector
  const list = document.querySelector('[data-list]'); //Selecciona/agarra la etiqueta <ul> que en el futuro contendrá todas nuestras tarjetas.    //En otras palabras, este codigo lo que va a hacer es traernos la lista (con el [data-list]), es el elemento en el cual nosotros vamos a ir agregando las tareas
  const input = document.querySelector('[data-form-input]'); // Tenemos el input ([data-form-input]), el cual el usuario llena con el título de la tarea que quiere hacer.
  const calendar= document.querySelector("[data-form-date]");//Seleccionar calendario (*1)//Seleccionamos el calendario para las fechas de nuestras tareas, recordar que los data atributes se ponen entre corchetes dentro de las comillas.
  
  //Lo del tiempo
  const value = input.value;//Aquí está el texto que puso el usuario.
  const date = calendar.value;//Aquí está el valor puesto en el calendario por el usuario.
  const dateFormat = moment(date).format("DD/MM/YYYY");//(*2) implementamos funcion de libreria 'moment' //En la variable dateFormat tenemos a moment(date), donde el parametro 'date' corresponde a la fecha dada por el usuario. A esa fecha le damos el formato 'DD/MM/YYYY' como pusimos en el parametro de format().  
  
  if(value == "" || date == ""){ //Si se quiere agregar una tarea que no tenga texto o que no tenga fecha, returnará. Es decir, saldrá ed la funcion y por ende no agrerá la tarea a la lsita
    return;
  }
  //Vaciar automaticamente campos luego de agregar tarjeta.
  input.value = '';//Vacía el campo de texto donde ingresamos la tarea
  calendar.value="";//Vacía el campo del calendario

  const complete = false;  //Para verificar el estado de


    //(*5) 
    const taskObj = { //Objeto donde guardamos value y dateFormat.
      value, //Nombres de variables que queremos almacenar, value corresponde al texto de cada tarea. Y dateFormat corresponde al valor de las fechas seleccionadas
      dateFormat,
      complete,
      id: uuid.v4() //Para que cada tarea con fecha, tenga un id unico
    };

    list.innerHTML =""; //Por cada tarea que agreguemos, inicialmente su estrucutra va a estar vacía. Y luego la funcion readTasks() le agregarpá cada na de las tareas.
    
    //Lo del localStorage
    
    //const taskList = []; //(*6)Creamos el array vacío  
    const taskList= JSON.parse(localStorage.getItem("tasks")) || []; //(*7)  //La variable taskList tenemos la informacion almacenada en el localStorage con la llave 'tasks'. Entonces, lee la informacion que está almacenada. Luego,esto se regresa en un formato JSON, y ara que nosotros lo podamos utilizar, necesitamos pasarlo por la función JSON.parse() para que genere un objeto de formato JavaScript con el cual podamos utilizarlo. En el caso que retorne null, no existirá esta tarea. Esto ultimo puede suceder por ejemplo la primera vez que estás creando o que estás cargando tu página. 
  
    taskList.push(taskObj);//(*6)Al array taskList le agregamos el taskObj, que es el contenido de cada tarea que se agregue a la lista

    localStorage.setItem("tasks", JSON.stringify(taskList));//(*5b)setItem recibe dos parametros: la llave y el clave/valor que le quiero almacenar. En este caso, el valor es la lista que contiene la informacion de cada tarjeta. //En otras palabras, va a  volver a almacenar nuestro arreglo de tareas ya actualizado y convirtiéndolo con JSON.stringify a un formato JSON.
  
    //Estas dos lineas las sustituimos por la siguiente funcion displayTasks()
    //const task = createTask(taskObj);//declaramos llamada a la funcion. Y que tenga como parametro el objeto con los datos de la tarea  //En otras palabras, creará una tarea y recibirá como parametro el taskObj
    //list.appendChild(task); //A la <ul> se le agregará la llamada a la funcion (todo lo hecho por createTask), es decir, contendrá todos los elementos de la tarjeta y su contenido
    displayTasks();//Hace todo lo explicado en su archivo. Aquí lo usamos para que al instante de agregar una tarea, se ejecute la funcion que accede a las tarjetas del localStorage, verifica si las fechas se repiten y agrupa a las tarjetas. 
  }



//Para lo unico de lo que se va a encargar, va a ser para recibir e texto que puso el usuario y la fecha. Tambien se va a encargar  de generar toda la estructura HTML, agregar clases, inyectarle cuál va a ser el contenido de cada uno de los elementos y al final de cuenta nos va a regresar la tarea.
//Vamos a exportar createTask() a readTask.js, para crear las tarjetas de tareas con la informacion de cada tarea y fecha que  esten guardadas en el localStorage.
export const createTask = ({value, dateFormat, complete, id}) => { //Tiene como parametro las propiedades del objeto que queremos recibir aquí
  
  // const list = document.querySelector('[data-list]'); //Lo pasamos a addTask()
  const task = document.createElement('li');//Se crea la tarjeta dentro de la lista, que contendrá el check, la tarea, el date y el tacho. Es decir, se crea el <li> que contenga todo eso
        task.classList.add('card'); // Al li se le agrega una clase llamada 'card'
  

  const taskContent = document.createElement('div'); //Se crea un div

  const check =checkComplete(id);
  if(complete){ //Si cuando se reinicie la pagina, complete es true, se deja el css como check marcado. Esto es para cuando le damos al check y reiniciamos la pagina para que se quede con el check.
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  const titleTask = document.createElement('span'); //Se crea un span
        titleTask.classList.add('task'); //Le agregar al span titleTask la clase task
        titleTask.innerText = value;  //Al span se le agrega el texto que escribio el usuario
        task.appendChild(taskContent);//La tarjeta contendrá un div que contiene el check y el span con el mensaje de la tarea
        taskContent.appendChild(check);//check dentro del div taskContent. Tiene el id para sabe rcuand tiene que hacer el cambio.
        taskContent.appendChild(titleTask); //se le agregará al div taskContent, el mensaje de la tarea del span titleTask 
  // task.innerHTML = content;
  

  const dateElement = document.createElement("span");//(*3) Crear el span
        dateElement.innerHTML = dateFormat;               //Agregarle la fecha dentro del span
        task.appendChild(dateElement); //(*3) Span con la fecha dentro de la tarjeta
        task.appendChild(deleteIcon(id));//tacho de basura dentro de la tarjeta
        // list.appendChild(task);//Lo pasamos a addTask()  //Agregar tarjeta con todo lo anterior
        // console.log(task);// Para ver en consola la etiqueta <li> que contiene cada tarea
  return task; //para retornar hacia afuera todo lo hecho hasta ahora, asi addTask puede tomar lo retornado aquí para agregarlo a la <ul>. Si no escribimos este return, las cosas se quedarían solo dentro de la function createTask
};