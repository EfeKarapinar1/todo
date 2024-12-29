import axios from "axios";
import { useEffect, useState } from "react";

import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");

  useEffect(()=> {
    const fetchData = async () => {
      await axios.get('http://localhost:5000/todos')
        .then((response) => {
          setTodos(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    };

    fetchData();
  },[])

  const doneTodo = async (id) => {
    await axios.delete(`http://localhost:5000/deltodo/${id}`)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/addtodo`, {
      description : desc
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center gap-20">

      <form onSubmit={addTodo} className="w-screen flex justify-center gap-10">
        <h1>Todo Ekle</h1>
        <input type="text" className="rounded border-black border" value={desc} onChange={e => setDesc(e.target.value)}/>
        <button type="submit" className="py-2 px-3 bg-blue-400 rounded">Ekle</button>
      </form>

      <table className="w-screen text-center bg-gray-200">
        <thead>
          <tr className="font-extrabold text-2xl h-16">
            <th>id</th>
            <th>Description</th>
            <th>Done?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, key) => {
            return(
              <tr key={key} className="text-xl h-16 border-y-2 border-black">
                <td>{item.id}</td>
                <td>{item.todo_desc}</td>
                <td>{JSON.stringify(item.todo_done)}</td>
                <td><a onClick={() => doneTodo(item.id)} className="cursor-pointer py-2 px-3 bg-red-500 rounded hover:bg-red-700">Sil</a></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
