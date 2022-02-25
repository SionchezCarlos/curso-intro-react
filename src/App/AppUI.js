import React from 'react';

import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';

function AppUI(){
    const {error, loading, searchedTodos, completeTodo, deleteTodo, completeTodos, openModal, setOpenModal} = React.useContext(TodoContext);

    return(
        <React.Fragment>
            <TodoCounter/>

            <TodoSearch/>
                
            <TodoList>

                {loading && <p>Estamos cargando no desesperes...</p>}
                {error && <p>Desespérate, hubo un error...</p>}
                {(!loading && !searchedTodos.length) && <p>¡Crea tu primir todo!</p>}
    
                {searchedTodos.map(todo => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onCompleteTodo={() => completeTodo(todo.text)}
                        onDeleteTodo={() => deleteTodo(todo.text)}
                        completeTodos={completeTodos}
                    />
                ))}
            </TodoList>

            {openModal && (
                <Modal>
                    <TodoForm/>
                </Modal>
            )}

            <CreateTodoButton setOpenModal={setOpenModal} />
        </React.Fragment>
    );
}

export default AppUI;