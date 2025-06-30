import React, { useEffect, useState } from "react";
import Button from "./button";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  function handleAddTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  }

  function handleEdit(getCurrentIndex) {}

  function handleDelete(getCurrentIndex) {
    const updatedTasks = tasks.filter((_, index) => index !== getCurrentIndex);
    setTasks(updatedTasks);
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
    <div className="bg-purple-300 h-screen p-10">
      <div className="h-[70vh] bg-white border-purple-600 border-2   rounded-2xl w-[430px] m-auto">
        <h1 className="font-bold text-2xl text-center p-4">To-Do List</h1>
        <div className="w-[90%] m-auto">
          <div className="flex gap-3 text-center">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
              }}
              className="border border-gray-400 rounded-full p-2 pr-[80px] pl-6 "
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Add a new task..."
            />
            <Button onClick={handleAddTask} name={"ADD"} />
          </div>
          {tasks
            ? tasks.map((task, index) => (
                <div className="flex gap-5 p-2">
                  <input type="checkbox" />
                  <p>{task}</p>
                  <Button onClick={()=>handleEdit(index)} name={"Edit"} />
                  <Button onClick={()=>handleDelete(index)} name={"Delete"} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
