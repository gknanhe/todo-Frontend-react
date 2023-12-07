import React, { useState } from "react";
import { fetchTodosByFilter } from "../store";
// import { fetchTodosByFilter } from "../api"; // Replace with your actual API function

const Filtertab = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = async (filter) => {
    setSelectedFilter(filter);

    // Call your API function to fetch todos based on the selected filter
    try {
      const todos = await fetchTodosByFilter(selectedFilter);
      console.log("Filtered Todos:", todos);
      // Update your state or component logic based on the fetched todos
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="w-fit flex justify-center items-center gap-5">
      <div
        className="px-4 py-1 cursor-pointer font-semibold text-gray-500 rounded-md bg-slate-300"
        onClick={() => handleFilterChange("All")}
      >
        All
      </div>
      <div
        className="px-4 py-1 cursor-pointer font-semibold text-gray-500 rounded-md bg-slate-300"
        onClick={() => handleFilterChange("Done")}
      >
        Done
      </div>
      <div
        className="px-4 py-1 cursor-pointer font-semibold text-gray-500 rounded-md bg-slate-300"
        onClick={() => handleFilterChange("NotDone")}
      >
        Not Done
      </div>
    </div>
  );
};

export default Filtertab;
