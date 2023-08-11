import './App.css';
import {useState, useEffect} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";
import { api } from './api/api';

const API = "http://teste-api-node-production.up.railway.app/"

function App() {
  const [nome, setName] = useState("")
  const [duracao, setDuration] = useState ("")
  const [todos, setTodos] = useState ([]);
  const [loading, setLoading] = useState (false);

  async function loadData() {
    try {
      const response = await api.get("object/showall");      ;    
      setTodos(response.data)
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');

    }
  }

  async function Delete(id) {
    try {
      await api.delete(`object/delete/${id}`);
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');
    }
  }

  async function Create(data) {
    try {
      const response = await api.post("object/create", data);      

      return response.data
    } catch (error) {
      console.error('Erro:', error);
      throw new Error('Erro na requisição');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resTodo = await Create({nome, duracao})

    if (resTodo) {
      const todo = {
        id: resTodo.id,
        nome,
        duracao,
        done: false, 
      };
  
      setTodos ((prevState) => [...prevState,todo]);
      setName("");
      setDuration("");
    }
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
          <h1>MINHAS TAREFAS SEMANAIS</h1>
      </div>

      <div className='form-todo'>
        <h2>ATIVIDADES:</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='title'>O QUE VOCÊ VAI FAZER:</label>
            <input type='text' name='title' placeholder='Título da tarefa' onChange={(e) => setName(e.target.value)}
            value={nome || ""}
            required
          ></input>
            </div>

            <div className='form-control'>
            <label htmlFor='time'>DURAÇÃO:</label>
            <input type='text' name='title' placeholder='Tempo estimado (em horas)' onChange={(e) => setDuration(e.target.value)}
            value={duracao || ""}
            required
          ></input>
            </div>


          <input type='submit' value={'CRIAR TAREFA'}></input>
        </form>
      </div>

      <div className='list-todo'>
      <h2>Lista de tarefas:</h2>
      {todos.length === 0 && <p>Não há tarefas!</p>}
      {todos.map((todo) => (
        <div className='todo' key={todo.id}>
          <h3 className={todo.done ? "todo-done": ""}>{todo.nome}</h3>
          <p>Duração {todo.duracao}</p>
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