import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './../features/todos/todosSlice';
import {saveToLocalStorage, loadFromLocalStorage} from './../helpers';

const preloadedState = loadFromLocalStorage('persistentState');

const store = configureStore({
    reducer: {
        todos: todosReducer
    },
    preloadedState
});

store.subscribe(() => saveToLocalStorage('persistentState', store.getState()));

export default store;
