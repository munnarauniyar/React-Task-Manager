import { useState, useEffect } from "react";

import "./App.css";

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {

    const saveTasks = localStorage.getItem("tasks");

    return saveTasks ? JSON.parse(saveTasks) : [];


  });

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [searchText, setSearchText] = useState("");

  function addTask() {
    if (input.trim() === "")
      return;

    setTasks([
      ...tasks,
      {
        text: input.trim(),
        completed: false,
        id: Date.now()
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


  const filteredTasks = tasks.filter((task) => {

    return task.text.toLowerCase().includes(searchText.toLowerCase());

  });


  function saveTask() {
    setTasks(
      tasks.map((item) => {
        if (editId === item.id) {
          return {
            ...item,
            text: editText,
          };
        }
        return item;
      })
    );

    setEditId(null);
    setEditText("");
  }


  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button onClick={addTask}>Add Task</button>

      </div>


      <input
        className="search"
        placeholder="🔍 search task..."
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="stats">

        <div className="card">
          <p>📋<br />Total Tasks:</p>
          <h2>{totalTasks}</h2>
          <p>Total</p>

        </div>

        <div className="card">
          <p>✅ <br />Completed:</p>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div className="card">

          <p>⏳<br /> Remaining:</p>
          <h2>{remainingTasks}</h2>
          <p>Remaining</p>

        </div>

      </div>

      {tasks.length === 0

        ?

        <div className="empty">
          <h3>📭 No tasks yet.</h3>
          <p>Add your first task!</p>
        </div>

        :

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {
                editId === task.id

                  ?

                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveTask();
                        setEditId(null);
                        setEditText("");
                      }
                    }}
                  />
                  :
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>

              }



              <div className="actions">

                <button className="delete"
                  onClick={
                    () => setTasks(tasks.filter((item) => item.id !== task.id))
                  }>Delete</button>


                <button className="edit"
                  onClick={() => {
                    if (editId === task.id) {
                      //save

                      saveTask();

                      setEditId(null);
                      setEditText("");

                    }
                    else {
                      //edit
                      setEditId(task.id);
                      setEditText(task.text);
                    }
                  }
                  }



                >{editId === task.id ? "Save" : "Edit"}
                </button>


                <button className="complete"
                  onClick={() =>
                    setTasks(tasks.map((item) => {
                      if (item.id === task.id) {
                        return {
                          ...item,
                          completed: !item.completed
                        }
                      }
                      return item;
                    }
                    ))
                  }>
                  {task.completed ? "Completed" : "Complete"}
                </button>
              </div>
            </li>
          ))}
        </ul >



      }


    </div>

  )


}

export default App;