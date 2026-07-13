import { useState, useEffect } from "react";

import "./App.css";

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {

    const saveTasks = localStorage.getItem("tasks");

    return saveTasks ? JSON.parse(saveTasks) : [];


  });

  function AddTask() {
    if (input.trim() === "")
      return;

    setTasks([
      ...tasks,
      {
        text: input,
        completed: false
      }

    ])
    setInput("");
  }

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;



  return (
    <div className="container">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={AddTask}>Add Task</button>

      <div className="stats">

        <p>📋 Total Tasks:{totalTasks}</p>
        <p>✅ Completed:{completedTasks} </p>
        <p>⏳ Remaining:{remainingTasks} </p>

      </div>

      {tasks.length === 0

        ?

        <div>
          <p>📭 No tasks yet.</p>
          <p>Add your first task!</p>
        </div>

        :
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>

              <button onClick={
                () => setTasks(tasks.filter((item, i) => i !== index))
              }>Delete</button>


              <button onClick={() =>
                setTasks(tasks.map((task, i) => {
                  if (i === index) {
                    return {
                      ...task,
                      completed: !task.completed
                    }
                  }
                  return task;
                }
                ))
              }>
                {task.completed ? "completed" : "complete"}
              </button>
            </li>
          ))}
        </ul >



      }


    </div>

  )


}

export default App;