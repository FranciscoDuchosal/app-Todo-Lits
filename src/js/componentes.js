import { todoList } from "..";
import { Todo } from "../classes";

import { TodoList } from "../classes";


//Referencia en el HTML
const divTodoList      = document.querySelector('.todo-list');
const txtInput         = document.querySelector('.new-todo');
const btnBorrar        = document.querySelector('.clear-completed');
const ulFiltros        = document.querySelector('.filters');
const anchorFiltros    = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo =`
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
	    <div class="view">
		    <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }/>
		    <label>${ todo.tarea }</label>
		    <button class="destroy"></button>
	    </div>
        <input class="edit" value="Create a TodoMVC template"/>
	</li>`;

    //creacion del elemento html
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}


// EVENTOS

txtInput.addEventListener('keyup', ( event ) => {

if ( event.keyCode === 13 && txtInput.value.length > 0 ){

    console.log(txtInput.value);
    const nuevoTodo = new Todo( txtInput.value );
    todoList.nuevoTodo( nuevoTodo );

    crearTodoHtml( nuevoTodo );
    txtInput.value = '';


}


});

// marcar el check y tachar la taea completada 

divTodoList.addEventListener('click', (event) =>{
    
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement; //Obtengo todo el elemento donde esta el nuevo Todo
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes( 'input' ) ) {  //porque hizo click en check

        console.log(txtInput.value);
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); //para que se tache la tarea cuando hace click en el check
    
    }else if( nombreElemento.includes('button') ){ //condicion para borrar la tarea con el boton X

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento ); //elimina el elemneto HTML (el texto de la tarea)

    }


});

btnBorrar.addEventListener('click', () =>{

    todoList.eliminarCompletados(); // lo elimina de mi [], pero siguen existiendo en el html

    for ( let i = divTodoList.children.length-1; i >= 0; i-- ) { // Eliminar elelmento del HTML
       
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) { //contains : si el elemento tiene la clase espesificada, ej ('completed')
            divTodoList.removeChild(elemento);
            
        }

      
        
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if ( !filtro ){ return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');


    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                
            break;

            case 'Completados':
                    if( !completado ){
                        elemento.classList.add('hidden');
                    }
                    
                break;        
                
        }
        

    }

})