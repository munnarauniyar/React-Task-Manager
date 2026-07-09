import { useState } from "react";

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  function AddTask() {
    if (input.trim() === "")
      return;

    setTasks([
      ...tasks,
      input
    ])
    setInput("");
  }


  return (
    <>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={AddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <>
            <li key={index}>
              {task}
              <button onClick={
                () => setTasks(tasks.filter((item, i) => i !== index))
              }>Delete</button>
            </li>
          </>
        ))}
      </ul>
    </>

  )


}

export default App;