import { useState, useEffect } from "react";

import "./App.css";

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {

    const saveTasks = localStorage.getItem("tasks");

    return saveTasks ? JSON.parse(saveTasks) : [];


  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function addTask() {
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

      <button onClick={addTask}>Add Task</button>

      <div className="stats">

        <p>📋 Total Tasks:{totalTasks}</p>
        <p>✅ Completed:{completedTasks} </p>
        <p>⏳ Remaining:{remainingTasks} </p>

      </div>

      {tasks.length === 0

        ?

        <div className="empty">
          <h3>📭 No tasks yet.</h3>
          <p>Add your first task!</p>
        </div>

        :
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {
                editIndex === index

                  ?

                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  :
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>

              }

              <button onClick={
                () => setTasks(tasks.filter((item, i) => i !== index))
              }>Delete</button>


              <button onClick={() => {
                if (editIndex === index) {
                  //save

                  setTasks(tasks.map((task, i) => {

                    if (i === index) {
                      return {
                        ...task,
                        text: editText
                      }
                    }
                    return task;
                  })

                  );

                  setEditIndex(null);
                  setEditText("");

                }
                else {
                  //edit
                  setEditIndex(index);
                  setEditText(task.text);
                }
              }
              }

              >{editIndex === index ? "Save" : "Edit"}
              </button>


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
                {task.completed ? "Completed" : "Complete"}
              </button>
            </li>
          ))}
        </ul >



      }


    </div>

  )


}

export default App;