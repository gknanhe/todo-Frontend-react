import React, { useEffect, useState } from "react";
import Task from "./Task";
import Modal from "./Modal";
import state, { fetchAllTodos } from "../store";
import { useSnapshot } from "valtio";
import SearchBar from "./Searchbar";
import Filtertab from "./Filtertab";
// import TaskOptions from "./Popup";

const Home = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("In Home", state.loggedUser.user._id);
        const fetchedTodos = await fetchAllTodos(state.loggedUser.user._id);
        if (fetchedTodos) {
          console.log("home fetchedtodos", fetchedTodos);
          // Update the Valtio state (snap.todos) directly
          state.todos = fetchedTodos;
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        // Handle the error as needed
      }
    };

    fetchData(); // Call the async function immediately

    // No need to return anything from useEffect
  }, [state.loggedUser.user._id]);

  return (
    <div className="flex items-center justify-center my-[100px] flex-col gap-14">
      <SearchBar />
      <Filtertab />
      <div className="flex items-center justify-center my-[100px] flex-col gap-14 w-full">
        {snap.todos.length === 0 ? (
          <div className="flex items-center justify-center max-w-screen-sm mx-auto">
            <span className="text-gradient_blue-purple text-[44px] heading1 flex items-center justify-center h-screen p-4">
              No Todos yet! Add a New Todo
            </span>
          </div>
        ) : (
          snap.todos.map((todo) => <Task todo={todo} key={todo._id} />)
        )}
        <Modal />
      </div>
    </div>
  );
};

export default Home;
