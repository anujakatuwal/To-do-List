import React, { useEffect, useState } from "react";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  function handleAddTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  }

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  return (
    <div className="bg-teal-300 h-screen p-10">
      <div className="h-[70vh] bg-white rounded-2xl w-[430px] m-auto">
        <h1 className="font-bold text-2xl">To-Do List</h1>
        <div className="flex gap-3 mx-2">
          <input
            className="border border-gray-400 rounded-full p-2 pr-[100px] pl-5 "
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-teal-300 border-black rounded-full px-8 py-2"
          >
            ADD
          </button>
        </div>
        {tasks
          ? tasks.map((task) => (
              <div className="flex gap-5">
                <input type="checkbox" />
                <p>{task}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ToDo;
