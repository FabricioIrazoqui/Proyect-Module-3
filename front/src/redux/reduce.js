// redux/reduce.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            const { id } = action.payload;
            const exists = state.todos.some(todo => todo.id === id);
            if (!exists) {    
            state.todos.push(action.payload);
  }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        }
    }
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
