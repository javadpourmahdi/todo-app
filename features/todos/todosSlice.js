import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = [
    {id: nanoid(), content: 'Learn React', completed: true},
    {id: nanoid(), content: 'Learn Redux', completed: false},
    {id: nanoid(), content: 'Build something fun!', completed: false}
];

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: nanoid(),
                content: action.payload.content,
                completed: false
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo) todo.completed = !todo.completed;
        },
        editTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo) todo.content = action.payload.content;
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        }
    }
});

export default todosSlice.reducer;
export const {addTodo, toggleTodo, editTodo, deleteTodo} = todosSlice.actions;
export const selectAllTodos = state => state.todos;
