import React, { useState } from "react";
import Button from "./button";

const EditTask = ({ task,tasks, handleSaveEdit,handleCancelEdit,index }) => {
  const [editedTask, setEditedTask] = useState(task);

  return (
    <div className="fixed bg-black bg-opacity-40 inset-0 flex justify-center items-center">
      <div className="relative h-[22vh] bg-white border-purple-600 border-2 rounded-2xl w-[350px] p-3">
        <input
          className="py-2 border border-gray-400 rounded-full px-6 w-[320px] "
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
        <Button
          onClick={() => handleSaveEdit(editedTask)}
          name={"Save Changes"}
          className={"p-4 absolute right-3 bottom-2"}
        />
        <Button onClick={handleCancelEdit} name={"Cancel"} className={"p-4 absolute left-3 bottom-2"}/>
      </div>
    </div>
  );
};

export default EditTask;
