import React from "react";
import moment from "moment/moment";
import TaskOptions from "./Popup";
import logo from "../assets/icons/logo.svg";
import state from "../store";
import { markAsDone } from "../store";
import { useSnapshot } from "valtio";
const Task = ({ todo }) => {
  const snap = useSnapshot(state);

  const formattedDate = moment(todo.createdAt).format(
    "DD/MM/YYYY • HH:mm • ddd"
  );
  const handleMarkAsDone = () => {
    markAsDone(todo._id);
  };
  const deadline = moment(todo.date).format("DD/MM/YYYY • HH:mm • ddd");

  return (
    <div className="h-auto w-[90%] md:w-[70%] lg:w-[50%] flex items-center justify-center  shadow">
      <div
        className={`w-full h-auto  rounded-xl flex items-center justify-between flex-col gap-4 px-8 py-8 bg-[#5061FF] ${
          todo.completed ? "border-s-4" : ""
        }`}
        style={{ backgroundColor: todo?.category?.bg || "#5061FF" }}
      >
        {todo.completed ? (
          <>
            <div className="w-[44px]">
              <img src={logo} />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between gap-2 w-full">
          <div
            className={`font-bold  w-full text-2xl text-white ${
              todo.completed ? "line-through" : ""
            }`}
            style={{ color: todo?.category?.text || "#fff" }}
          >
            {todo.task}
          </div>
          <div
            className="text-base text-gray-300"
            style={{ color: todo?.category?.text || "#fff" }}
          >
            {formattedDate}
          </div>
        </div>
        <div className=" flex items-center justify-between  w-full ">
          <div className="flex items-start justify-start flex-col gap-4">
            <div
              className={`text-slate-200 font-medium ${
                todo.completed ? "line-through" : ""
              }`}
              style={{ color: todo?.category?.text || "#fff" }}
            >
              {todo.discription}
            </div>
            <div
              className={`text-slate-200  ${
                todo.completed ? "line-through" : ""
              }`}
              style={{ color: todo?.category?.text || "#fff" }}
            >
              {deadline}
            </div>
          </div>
          <div className="text-white mx-1 my-1">
            <TaskOptions
              id={todo._id}
              userId={snap.loggedUser.user._id}
              todo={todo}
            />
          </div>
        </div>
        <div className="w-full flex items-start justify-start">
          {/* <div
            className={`w-[100px] border flex items-center justify-center font-bold text-black border-yellow-400 rounded-2xl px-1 py-1 bg-white shadow-lg shadow-yellow-500/50`}
          >
            {todo?.category ? `${todo.category}` : ""}
          </div> */}

          <div
            className={`w-[150px]   flex items-center justify-center border-2 border-gray-50 font-bold text-black  rounded-2xl px-1 py-1 category-badge shadow-lg shadow-${
              todo?.category?.color || "white"
            }-500/50`}
            style={{
              backgroundColor: todo?.category?.color || "#bdc2ff",
              color: todo?.category?.text || "black",
              borderColor: todo?.category?.border || "white",
            }}
          >
            {todo?.category ? `${todo.category.name}` : ""}
          </div>
        </div>
        <div className="w-full flex items-start justify-start ">
          <button
            onClick={handleMarkAsDone}
            className="px-4 py-2 mx-1 my-1 bg-slate-100 rounded-2xl"
          >
            {todo.completed ? "mark not done" : "mark done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
