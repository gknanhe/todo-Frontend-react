import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import close from "../assets/icons/x-close.svg";
import Categories from "./Categories";
import state, { addTodo, openModal, closeModal, editTodo } from "../store";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";
//ARRAY OF CATEGORIES
const categories = [
  {
    name: "Heath",
    color: "#4942E4",
    bg: "#190482",
    border: "#4942E4",
    text: "#C4B0FF",
  },
  {
    name: "Education",
    color: "#FEFFAC",
    bg: "#45FFCA",
    border: "#FFB6D9",
    text: "#D67BFF",
  },
  {
    name: "Persional",
    color: "#00337C",
    bg: "#13005A",
    border: "#1C82AD",
    text: "#03C988",
  },
  {
    name: "Family",
    color: "#3C79F5",
    bg: "#6C00FF",
    border: "#2DCDDF",
    text: "#F2DEBA",
  },
  {
    name: "Work",
    color: "#176B87",
    bg: "#04364A",
    border: "#64CCC5",
    text: "#DAFFFB",
  },
];

// categories: [
//   { id: 1, name: "Home", emoji: "1f3e0", color: "#1fff44" },
//   { id: 2, name: "Work", emoji: "1f3e2", color: "#248eff" },
//   { id: 3, name: "Personal", emoji: "1f464", color: "#e843fe" },
//   { id: 4, name: "Health/Fitness", emoji: "1f4aa", color: "#ffdf3d" },
//   { id: 5, name: "Education", emoji: "1f4da", color: "#ff8e24" },
// ],

const Modal = () => {
  const snap = useSnapshot(state);

  // let [isOpen, setIsOpen] = useState(snap.isOpen);

  const [isSubmitting, setSubmitting] = useState(false);
  const [task, setTask] = useState("");
  const [discription, setDiscription] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  //Extract editing todo from state
  const editingTodo = snap.editingTodo;

  useEffect(() => {
    // const storedTodos = JSON.parse(localStorage.getItem("todos"));
    // if (storedTodos) {
    //   state.todos = storedTodos;
    // }

    // If editingTodo is present, populate the form fields
    if (editingTodo) {
      setTask(editingTodo.task);
      setDiscription(editingTodo.discription);
      setDate(editingTodo.date);
      setSelectedCategory(editingTodo.category);
    }
  }, [editingTodo]);

  //HANDLE CATEGORY CHANGE

  const handleCategoryChange = (selectedCategory) => {
    // console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let newTodo;
    //If editingTodo is present, edit the todo, else add a new todo
    if (editingTodo) {
      const updatedTodo = {
        ...editingTodo,
        task,
        discription,
        date,
        category: selectedCategory,
      };

      const edited = await editTodo(updatedTodo);

      if (edited) {
        toast.success("Todo Edited", {
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error("Error!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      //create new to do
      newTodo = {
        userId: snap.loggedUser.user._id,
        task: task,
        discription: discription,
        date: date,
        category: selectedCategory,
        // createdAt: new Date().toISOString(),
        completed: false,
      };
      // console.log(selectedCategory);
      const added = await addTodo(newTodo);

      if (added) {
        toast.success("Todo Added!!!", {
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error("Error!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }

    //SET TO EMPTY
    setSubmitting(false);
    setTask("");
    setDiscription("");
    setSelectedCategory(categories[0]);
    setDate("");
    closeModal();
  };

  //set date
  const handleChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  //set category

  // const openModel = () => setIsOpen(true);

  // const closeModel = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        // className="btn py-3 px-3 bg-white rounded-2xl"
        onClick={openModal}
      >
        <div className="fixed bottom-[100px] shadowBg right-[100px] w-14 h-14  bg-purple-500 rounded-full flex items-center justify-center text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus bg-purple-500  "
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>

      <Transition appear show={snap.isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0"></Dialog.Overlay>
            </Transition.Child>

            {/* just for making model align middle trick */}
            <span className="inline-block h-screen align-middle" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="Opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveto="opacity-0 scale-95"
            >
              <div className="dialog-content ">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3  ">
                      <div className="font-bold text-xl text-slate-700">
                        Creacte Task
                      </div>{" "}
                    </div>
                    <img
                      src={close}
                      alt="close"
                      height={24}
                      width={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                </div>

                <form
                  className="flex flex-col mt-5 gap-2"
                  onSubmit={handleSubmit}
                >
                  <div className="dialog-input_container relative">
                    <div>
                      <label
                        htmlFor="task"
                        className="text-sm font-medium text-gray-700 absolute top-[-12px] bg-white px-1"
                      >
                        Task Name
                      </label>
                      <input
                        required
                        type="text"
                        id="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        //   placeholder="Enter task"
                        className=" dialog-input"
                      />
                    </div>
                  </div>
                  <div className="dialog-input_container relative">
                    <div>
                      <label
                        htmlFor="discription"
                        className="text-sm font-medium text-gray-700 absolute top-[-12px] bg-white px-1"
                      >
                        Task Discription
                      </label>
                      <textarea
                        required
                        type="text"
                        id="discription"
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        //   placeholder="Enter task"
                        className=" dialog-textarea"
                      />
                    </div>
                  </div>

                  <div className="dialog-input_container relative">
                    <div>
                      <label
                        htmlFor="date"
                        className="text-sm font-medium text-gray-700 absolute top-[-12px] bg-white px-1"
                      >
                        Task Deadline
                      </label>
                      <input
                        required
                        type="datetime-local"
                        id="date"
                        // value={discription}
                        onChange={handleChangeDate}
                        //   placeholder="Enter task"
                        className=" dialog-textarea"
                      />
                    </div>
                  </div>
                  <div className="border border-blue-200 rounded-[10px] flex justify-center w-full z-50">
                    <Categories
                      selected={selectedCategory}
                      onCategoryChange={handleCategoryChange}
                    />
                  </div>

                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? "Submitting..." : "Create To Do"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
