import { useState } from "react";

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

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
          <li key={index}>
            {task.text}
            <button onClick={
              () => setTasks(tasks.filter((item, i) => i !== index))
            }>Delete</button>


            <button onClick={() =>
              setTasks(tasks.map((task, i) => {
                if (i == index) {
                  return {
                    ...task,
                    completed: !task.completed
                  }
                }
                return task;
              }
              ))
            }>Complete</button>
          </li>
        ))}
      </ul >
    </>

  )


}

export default App;