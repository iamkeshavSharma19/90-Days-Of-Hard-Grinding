import React, { useContext } from "react";
import { TodoContext } from "../ContextProvider/TodoContextProvider";

const CreateTodo = () => {
  const { todo, description, handleTodo, handleDescription, handleSaveTask } =
    useContext(TodoContext);
  return (
    <>
      <form>
        <div className="flex flex-col gap-2 m-6 ml-32">
          <h5 className=" text-white text-[14px]">Add Title</h5>
          <input
            type="text"
            className="bg-amber-50 p-0 mt-0 w-[95%] rounded-[7px] h-8 placeholder:text-[13px] placeholder:pl-2 pl-3 text-[14px]"
            placeholder="Add Title Here"
            value={todo}
            onChange={handleTodo}
            required
          />
        </div>
        <div className="flex flex-col gap-2 m-6 ml-32">
          <h5 className=" text-white text-[14px]">Add Description</h5>
          <textarea
            className="bg-amber-50 p-0 mt-0 w-[95%] rounded-[7px] pl-3 text-[14px]"
            rows={3}
            value={description}
            onChange={handleDescription}
            required
          />
        </div>
        <div className="m-6 ml-32 flex flex-row gap-6">
          <button
            className="text-white text-xs px-3 py-1 rounded-md w-20 h-9 glitters glitter hover:text-black hover:bg-white bg-[#262626]"
            onClick={handleSaveTask}
          >
            Save Task
          </button>
          <button
            className="text-white text-xs px-3 py-1 rounded-md glitters glitter"
            style={{ backgroundColor: "#262626" }}
          >
            Clear All Tasks
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
