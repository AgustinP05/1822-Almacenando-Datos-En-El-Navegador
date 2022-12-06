//la idea es que podamos agrupar las tareas por fecha. Es decir, que se separe por secciones en la cual nos muestre todas las tareas de una fecha.

export default(date)=>{ //El default va a exportar directamente la funcion. En esta funcion vamos a crear la estructura html, para poder agregarla al DOM cuando se crea una tarea con fecha no utilizada. En el parametro 'date' recibimos la fecha, podría ser cualquier nombre, pero la idea es ahi recibir la fecha al llamar la funcion
    const dateElement = document.createElement("li"); //Aquí creamos una <li> ya que esta etiqueta con la fecha dentro, se agregará al <ul> principal como parte de la lista.
    dateElement.classList.add("date");//Le vamos a agregar una clase 'date'. Y tambien lo creamos y le damos estilo en nuestro archivo CSS.
    dateElement.innerHTML=date;//El contenido de esta <li> va a ser el 'date' que viene por parametro. Recordemos que eso es la fecha puesta por el usuario en la tarea.
    return dateElement;//Retornar la estructura que se está creando.
}
//Lo importamos a readTask.js