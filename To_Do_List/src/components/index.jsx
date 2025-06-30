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
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  }

  function handleToggleComplete(getCurrentIndex) {
    const works = [...tasks];
    works[getCurrentIndex].completed = !works[getCurrentIndex].completed;
    setTasks(works);
  }

  function handleEdit(getCurrentIndex) {
    setEditIndex(getCurrentIndex);
    setShowEditPopup(true);
  }

  function handleSaveEdit(newTask) {
    const updated = [...tasks];
    updated[editIndex].text = newTask;
    setTasks(updated);
    setShowEditPopup(false);
    setEditIndex(null);
  }

  function handleCancelEdit() {
    setEditIndex(null);
    setShowEditPopup(false);
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
          <div className="flex gap-3 text-center my-3">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
              }}
              className="border border-gray-400 rounded-full py-2 px-6 w-[350px] "
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Add a new task..."
            />
            <Button onClick={handleAddTask} name={"ADD"} className={"px-7 "} />
          </div>
          {tasks
            ? tasks.map((task, index) => (
                <div className="flex items-center justify-between gap-3 p-2">
                  <div
                    className="flex gap-5 items-center text-lg"
                    onClick={() => handleToggleComplete(index)}
                  >
                    <input
                      checked={task.completed}
                      className="w-4 h-4 appearance-none rounded-full border-2 border-purple-500 checked:bg-purple-500 checked:border-purple-800 cursor-pointer "
                      type="checkbox"
                    />
                    <p
                      className={
                        task.completed ? `line-through text-gray-600` : ""
                      }
                    >
                      {task.text}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(index)}
                      name={<FaEdit fill="purple" />}
                      className={" h-[28px] w-[28px] p-2 pt-1 pl-1"}
                    />
                    <Button
                      onClick={() => handleDelete(index)}
                      name={<FaTrash fill="purple" />}
                      className={"h-[28px] w-[28px] p-1 pt-1 pr-1 absolut"}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      {showEditPopup && (
        <EditTask
          task={tasks[editIndex]}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          index={editIndex}
        />
      )}
    </div>
  );
};

export default ToDo;
