

export class TodoList {

    constructor(){

       this.cargarLocalStorage();

    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id) //que los todos que recibo sea diferente al id
        this.guardarLocalStorage();


    }

    marcarCompletado( id ){

        for (const todo of this.todos ) {

            if( todo.id == id ){ // es == porque estamos recibiendo un string pero lo que tenemos en la clase es un numero

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
            
        }

    }

    eliminarCompletados(){

        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
        
    }


    guardarLocalStorage(){

        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );

    }

    cargarLocalStorage(){

        // if ( localStorage.getItem( 'todo' ) ){ //es para verificar si el objeto existe (siempre hay que hacerlo)
            
        //     this.todos = JSON.parse( localStorage.getItem( 'todo' ) );    //si existe, lo recupero.


        // } else {                               //sino existe en el localStorage me devuleve un [] vacio.
        //     this.todos = [];

        // }
        /*/mismo codigo pero con operador ternario /*/

        this.todos = ( localStorage.getItem( 'todo' ) ) 
                        ? JSON.parse( localStorage.getItem( 'todo' ) )
                        :  [];

    }

}