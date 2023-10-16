import './App.css';
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';


export function App() {

  const [todos, setTodos] = useState([]);
  const [todoDesc, setTodoDesc]=useState('');

  const fetchTodos= async () => {
    try {
      const response = await fetch('http://localhost:8000/todos/');
      if(response.ok) {
        const data=await response.json();
        setTodos(data);
      }
    } catch(error) {
      console.error('Error fetching TODOs:', error);
    }
  };

  const createTodo = async () => {
    try {
      const response=await fetch('http://localhost:8000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({description : todoDesc}),
      });
      if(response.ok) {
        setTodoDesc('');
        fetchTodos();
      }
    } catch (error) {
      console.error('Error creating a TODO:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <ul>
          {todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label for="todo">ToDo: </label>
            <input type="text" 
            id="todo"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
             />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button type="button" onClick={createTodo}>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
