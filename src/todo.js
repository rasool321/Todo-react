import React, { useState } from "react";
import './todo.css';

const generateId = () => crypto.randomUUID();

const TodoApp = () => {
   const [todos, setTodos] = useState([]);
   const [inputValue, setInputValue] = useState("");
   const [editId, setEditId] = useState(null);

    
   const handleInputChange = (e) => {
     setInputValue(e.target.value);
   };
   
   const handleAddTodo = () => {
     if (inputValue.trim() === "") return;
     if (editId) {
        const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: inputValue } : todo
     );
    setTodos(updatedTodos);
    setEditId(null);
    } else {
      const newTodo = {
      id: generateId(),
      text: inputValue,
    };
      setTodos([...todos, newTodo]);
    }

    setInputValue(""); 
   };

   
   const handleRemoveTodo = (id) => {
      const updateTodo = todos.filter((todo) => todo.id !== id);
      setTodos(updateTodo);
   }
  
    const handleEditTodo = (id) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      setInputValue(todoToEdit.text);
      setEditId(id);
   };

    
   return(
     <div className="container">
       <h1>TODO App - React</h1>
       <input
         type="text"
         name="input"
         placeholder="add task"
         value={inputValue}
         onChange={handleInputChange}
       />
        <button onClick={handleAddTodo}>Add</button>
        <ul>
            {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
           </li>
           ))}
        </ul>

     </div>
   );
};
export default TodoApp;