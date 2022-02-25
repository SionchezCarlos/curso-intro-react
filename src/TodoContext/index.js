import React from 'react';
import useLocalStorage from './UseLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props){
    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error
      } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setsearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(todo => todo.completed === true).length;
    const totalTodos = todos.length;

    let searchedTodos = [];

    if(!searchValue.length >= 1){
        searchedTodos = todos;
    }else{
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLocaleLowerCase();
            const searchText = searchValue.toLocaleLowerCase();

            return todoText.includes(searchText);
        });
    }

    const addTodo = (text) => {
        const newTodos = [...todos];

        newTodos.push({
            completed: false,
            text: text
        });

        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);

        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;

        saveTodos(newTodos);
    };

    const deleteTodo = (text) =>{
        const todoIndex = todos.findIndex(todo => todo.text === text);

        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);

        saveTodos(newTodos);
    };

    return (
        <TodoContext.Provider value={{
            error,
            loading,
            completedTodos,
            totalTodos,
            searchValue,
            setsearchValue,
            searchedTodos,
            completeTodo,
            addTodo,
            deleteTodo,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoProvider, TodoContext};