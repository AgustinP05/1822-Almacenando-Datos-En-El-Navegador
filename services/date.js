export const uniqueDates = (tasks) =>{//lo exporto a readTasks.js. Esta funcion va a servir para hacer que se muestre una vez la fecha cuando hay mas de una tarea con la misma fecha puesta
    
    //Yo quiero agarrar cada una de las fechas y almacenarlas en un arreglo
    const unique = [];

    
    tasks.forEach((task) => {// Al array que viene por parametro (le pusimos de nombre tasks pero puede ser cualquier nombre), tomará la fecha de la task de cada elemento del array.
        
        if(!unique.includes(task.dateFormat)){ //Si la fecha no existe en el arreglo, nuestro task.dateFormat se agregará al array. Si ya existe, no se agregará nada.
            unique.push(task.dateFormat);
        }
    });

    return unique;

}

//Antes de que se agreguen las fechas a la lista, quiero ordenarlas 
export const orderDates = (dates) =>{
    return dates.sort((a,b)=>{ //Esta funcion .sort(a, b) sirve para ordenar 2 valores comparandolos con una resta. Si la resta da como resultado un valor negativo, el 'a' va primero y el 'b'. Si el resultado es positivo, el 'b' va primero. Si la resta da 0, no hay cambios. Si utilizamos el .sort() sin parametros ordena un array segun el valor Unicode, pero nosotros queremos ordenar los numeros de menor a mayor
        const firstDate= moment(a, "DD/MM/YYYY"); //convierto cada fecha en formato moment para poder utilizarlas. Lo que hace es devolver la fecha del parameto con el formato asignado en el string. Con esto se puede utilizar las fechas para restarlas, sumarlas y crear demas funciones.
        const secondDate= moment(b, "DD/MM/YYYY"); //convierto cada fecha en formato moment para poder utilizarlas
        return firstDate - secondDate; //Resta para ver quien va primero
    }); 
    
}