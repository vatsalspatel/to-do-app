import './App.css';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from 'react';

function App() {
  const queryClient = useQueryClient()

  const [newTask, setNewTask] = useState("")

  const {data: todos, isLoading} = useQuery("get-to-dos", () => {
    return fetch('/api/get-to-dos').then(res => res.json())
  })

  const mutation_add = useMutation((body) => {
    return fetch("/api/post-to-do", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(body)
    })
  }, {
    onSuccess(data) {
      setNewTask("")
      queryClient.invalidateQueries({queryKey: "get-to-dos"})
    }
  }) 

  const mutation_rm = useMutation((body) => {
    return fetch("/api/post-to-do-rm", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(body)
    })
  }, {
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: "get-to-dos"})
    }
  }) 
  
  const addTask = (event) => {
    event.preventDefault()

    mutation_add.mutate({value: newTask})
  }

  const removeTask = (id) => {
    mutation_rm.mutate({id: id})
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div class="grid place-content-center">
      <h1 class="mb-4 font-extrabold tracking-tight text-5xl">
        To Do
      </h1>
      <ul>
        {todos.map(task => {
          return <li class="flex items-center" key={task.id}>
            <svg class="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            {task.value}
            <button class="ml-2 py-2 px-2 rounded-full bg-red-500 hover:bg-red-700" onClick={() => removeTask(task.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 50 50" overflow="visible" stroke="black" stroke-width="10" stroke-linecap="round">
                <line x2="50" y2="50" />
                <line x1="50" y2="50" />
              </svg>
            </button>
          </li>
        })}
        <li>
          <form class=" flex items-center" onSubmit={addTask}>
            <svg class="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <input class="bg-gray-50 border border-gray-300 rounded-lg w-96 py-0" type='text' value={newTask} onChange={e => setNewTask(e.target.value)}/>
            <button class="ml-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center" type="submit">
              Add
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}

export default App;
