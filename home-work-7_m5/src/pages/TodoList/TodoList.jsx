import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosActions } from "../../store/todosSlice";

const TodoList = () => {
  const [initialState, setInitialState] = useState({
    id: 0,
    text: "",
    completed: false,
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);

  const handleAddClick = () => {
    if (initialState.text !== "") {
      setInitialState((prev) => ({ ...prev, id: prev.id + 1 }));
      dispatch(todosActions.addTodo(initialState));

      setInitialState((prev) => ({ ...prev, text: "" }));
    } else {
      alert("объязательно");
    }
  };

  const handleDeleteClick = (id) => {
    const question = confirm("delete");
    question ? dispatch(todosActions.deleteTodo(id)) : null;
  };

  const handleValueChange = (e) => {
    setInitialState((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleChangeCompleted = (id) => {
    dispatch(todosActions.completedTodo(id));
  };

  const handleEditTodo = (todo, index) => {
    const newTextTodo = prompt("new");
    const dispatchContent = {
      id: index,
      newText: newTextTodo,
    };
    if (newTextTodo !== null && newTextTodo !== "") {
      dispatch(todosActions.editTodo(dispatchContent));
    }
  };

  return (
    <div className="bg-slate-200 h-screen">
      <h1 className="text-center text-2xl font-semibold py-4 bg-slate-100">
        Todo List
      </h1>
      <div className="container m-auto">
        <div className="flex justify-center py-4">
          <input
            className="w-full p-2"
            type="text"
            value={initialState.text}
            onChange={handleValueChange}
          />
          <button
            className="p-2 border-2 border-slate-500"
            onClick={handleAddClick}
          >
            add
          </button>
        </div>
        <ul>
          {state &&
            state.map((todo, index) => (
              <li
                key={todo.id}
                className="flex justify-between border-2 border-slate-300 my-2 p-2"
              >
                <input
                  type="checkbox"
                  onChange={() => {
                    handleChangeCompleted(index);
                  }}
                />
                <span
                  onClick={() => {
                    handleEditTodo(todo, index);
                  }}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "",
                  }}
                >
                  {todo.text}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleDeleteClick(index);
                  }}
                >
                  delete
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
