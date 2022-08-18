import React, { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import Header from './Components/Header';
import Tasks from './Components/Tasks';



function App() {
  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTask()
  }, [])

  // FETCH TASKS 
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    return data
  }

  // FETCH SINGLE TASK 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // ADD TASK 
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // TOGGLE REMINDER
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      }
    })

    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !data.reminder } : task

    ))
  }


  // Toggle Reminder
  const toggleReminder2 = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }


  // DELETE TASK 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }


  return (
    <div className='container'>
      <Header title="Task Tracker" onAdd={() => { setShowAddTask(!showAddTask) }} showAdd={showAddTask} />
      {showAddTask ? <AddTask onAdd={addTask} /> : ""}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No Tasks"}
    </div>
  );
}

export default App;
