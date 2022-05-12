import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

  //todoList.todos.forEach( todo => crearTodoHtml( todo ) );
 // cuando el argumento que queremos enviar es el unico que mandamo a un fn o metodo ej:todo podemos hacer..
 
todoList.todos.forEach( crearTodoHtml );

console.log( todoList.todos ); //me muestra en consola todas las tareas que voy creando


