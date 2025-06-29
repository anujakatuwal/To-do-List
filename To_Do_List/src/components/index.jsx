import React, { useState } from "react";

const ToDo = () => {
  const [input,setInput]=useState("")
  const [task, setTask] = useState("");

  function handleAddTask(){
    setTask(input)
  }

  return (
    <div className="bg-teal-300 h-screen p-10">
      <div className="h-[75vh] bg-white rounded-2xl w-[30vw] m-auto">
        <h1 className="font-bold text-2xl">To-Do List</h1>
        <div className="flex gap-3 mx-6">
          <input
            className="border border-gray-400 rounded-full p-2 pr-[100px] pl-5 "
            type="text"
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={handleAddTask} className="bg-teal-300 border-black rounded-full px-8 py-2">
            ADD
          </button>
        </div>
        {task ? <p>{task}</p> : null}
      </div>
    </div>
  );
};

export default ToDo;
