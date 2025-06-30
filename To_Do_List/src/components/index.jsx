import React, { useEffect, useState } from "react";
import Button from "./button";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTask from "./edit";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleAddTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  }

  function handleEdit(getCurrentIndex) {
    setEditIndex(getCurrentIndex);
    setShowEditPopup(true);
  }

  function handleSaveEdit(newTask) {
    const updated = [...tasks];
    updated[editIndex] = newTask;
    setTasks(updated);
    setShowEditPopup(false);
    setEditIndex(null);
  }

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
      <div className="h-[70vh] bg-white border-purple-600 border-2 rounded-2xl w-[430px] m-auto">
        <h1 className="font-bold text-2xl text-center p-4">To-Do List</h1>
        <div className="w-[90%] m-auto">
          <div className="flex gap-3 text-center">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
              }}
              className="border border-gray-400 rounded-full py-2 px-6 w-[350px]"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Add a new task..."
            />
            <Button onClick={handleAddTask} name={"ADD"} className={"px-7"} />
          </div>
          {tasks
            ? tasks.map((task, index) => (
                <div className="flex gap-5 p-2 relative">
                  <input type="checkbox" />
                  <p>{task}</p>
                  <Button
                    onClick={() => handleEdit(index)}
                    name={<FaEdit fill="purple" />}
                    className={
                      " h-[28px] w-[28px] p-2 pt-1 pl-1 absolute right-9"
                    }
                  />
                  <Button
                    onClick={() => handleDelete(index)}
                    name={<FaTrash fill="purple" />}
                    className={
                      "h-[28px] w-[28px] p-1 pt-1 pr-1 absolute right-0"
                    }
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      {showEditPopup && <EditTask task={tasks[editIndex]} handleSaveEdit={handleSaveEdit} index={editIndex}/>}
    </div>
  );
};

export default ToDo;
