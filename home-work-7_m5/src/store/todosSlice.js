import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo, index) => index !== action.payload);
    },
    completedTodo: (state, action) => {
      const index = action.payload;
      const taskToMove = state[index];
      taskToMove.completed = !taskToMove.completed;

      if (!taskToMove.completed) {
        state.splice(index, 1);
        state.unshift(taskToMove);
      } else {
        state.splice(index, 1);
        state.push(taskToMove);
      }
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      state[id].text = newText;
    },
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
