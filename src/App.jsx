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


      <div className="search-box">
        <i className="bi bi-search"></i>
        <input
          className="search"
          placeholder="search task..."
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>

      <div className="stats">

        <div className="card">

          <i className="bi bi-list-check"></i>
          <h2>{totalTasks}</h2>
          <p>Total</p>

        </div>

        <div className="card">

          <i className="bi bi-check2-circle"></i>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div className="card">
          <i className="bi bi-hourglass-split"></i>
          <h2>{remainingTasks}</h2>
          <p>Remaining</p>

        </div>

      </div>

      {tasks.length === 0

        ?

        <div className="empty">
          <i className="bi bi-inbox"></i>

          <h3>No Tasks Yet</h3>

          <p>Add your first task</p>
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
                  }><i className="bi bi-trash"></i></button>


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



                >{editId === task.id ? <i className="bi bi-check-lg"></i> : <i className="bi bi-pencil"></i>}
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
                  {task.completed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-check-circle-fill"></i>}
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