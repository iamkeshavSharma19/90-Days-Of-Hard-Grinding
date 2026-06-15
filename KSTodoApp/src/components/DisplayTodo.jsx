import React, { useContext } from "react";
import { TodoContext } from "../ContextProvider/TodoContextProvider";

const DisplayTodo = () => {
  const { allTodos, handleDeleteTodo, handleEditTodo } =
    useContext(TodoContext);

  return (
    <>
      <div className="flex flex-row justify-center items-center text-2xl font-bold">
        <h1 className="text-white">My Tasks</h1>
      </div>
      <div className="m-6 ml-32">
        <table className="text-white bg-[#212529] w-[95%] rounded-lg glitter">
          <thead>
            <tr className="text-[15px] h-8 border-b border-gray-600">
              <th className="text-left px-4 py-2 border-r border-gray-600">
                Title
              </th>

              <th className="text-left px-4 py-2 border-r border-gray-600">
                Description
              </th>

              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>

          {/* All Todos will come here */}

          {allTodos.length !== 0 && (
            <tbody>
              {allTodos.map((ele) => {
                return (
                  <tr
                    className="text-[15px] h-8 border-b border-gray-600"
                    key={ele.id}
                  >
                    <td className="text-left px-4 py-2 border-r border-gray-600">
                      {ele.todo}
                    </td>

                    <td className="text-left px-4 py-2 border-r border-gray-600">
                      {ele.description}
                    </td>

                    <td className="text-left px-4 py-2">
                      <button
                        className=" text-[14px] px-3 py-1 rounded-md w-20 h-8 bg-white text-black border-2 border-red-500"
                        onClick={() => {
                          handleDeleteTodo(ele.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className=" text-[14px] px-3 py-1 rounded-md w-20 h-8 bg-white text-black ml-4 border-2 border-red-500"
                        onClick={() => handleEditTodo(ele)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default DisplayTodo;
