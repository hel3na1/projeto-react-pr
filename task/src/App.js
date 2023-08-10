import './App.css';
import {useState, useEffect} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";
import { api } from './api/api';

const API = "https://localhost:5000"

function App() {
  const [name, setName] = useState("")
  const [duration, setDuration] = useState ("")
  const [todos, setTodos] = useState ([]);
  const [loading, setLoading] = useState (false);

  async function loadData() {
    try {
      const response = await api.get();    
      setTodos(response.data)
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');

    }
  }

  async function Delete(id) {
    try {
      const response = await api.delete(`${id}`);

      console.log(response.data)
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');
    }
  }

  async function Create(data) {
    try {
      const response = await api.post("", data);      

      console.log(response.data)
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      name,
      duration,
      done: false, 
    };

    Create({name, duration})

    setTodos ((prevState) => [...prevState,todo]);
    setName("");
    setDuration("");
  };

  const handleDelete = async (id) => {
    Delete(id)
    setTodos((prevState) => prevState.filter ((todo) => todo.id !==id));
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='App'>
      <div className='todo-header'>
          <h1>React task</h1>
      </div>

      <div className='form-todo'>
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer?</label>
            <input type='text' name='title' placeholder='Título da tarefa' onChange={(e) => setName(e.target.value)}
            value={name || ""}
            required
          ></input>
            </div>

            <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
            <input type='text' name='title' placeholder='Tempo estimado (em horas)' onChange={(e) => setDuration(e.target.value)}
            value={duration || ""}
            required
          ></input>
            </div>


          <input type='submit' value={'Criar tarefa'}></input>
        </form>
      </div>

      <div className='list-todo'>
      <h2>Lista de tarefas:</h2>
      {todos.length === 0 && <p>Não há tarefas!</p>}
      {todos.map((todo) => (
        <div className='todo' key={todo.id}>
          <h3 className={todo.done ? "todo-done": ""}>{todo.name}</h3>
          <p>Duração {todo.duration}</p>
          <div className='actions'></div>
          <span>
            {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill />}
          </span>
          <BsTrash onClick={() => handleDelete(todo.id)}/>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;