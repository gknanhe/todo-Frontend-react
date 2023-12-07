import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../assets/Searchbar.module.css";
import { searchTodo } from "../store";

const SearchBar = () => {
  const [value, setValue] = useState(" ");
  const [suggestions, setSuggestions] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const { data } = await axios.get(
  //           `https://dummyjson.com/products/search?q=${value}`
  //         );

  //         setSuggestions(data.products);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     setValue(value);
  //     fetchData();
  //   }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the value length is greater than or equal to 3
        if (value.length >= 3) {
          const response = await searchTodo(value);

          console.log("serch ", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

  return (
    // <div className={styles.container}>
    //   <input
    //     type="text"
    //     className={styles.textbox}
    //     placeholder="Search data..."
    //     value={value}
    //     onChange={(e) => {
    //       setValue(e.target.value);
    //     }}
    //   />
    // </div>
    <div className="flex justify-center items-center w-full h-20">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative md:w-[600px] flex justify-center items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full  p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
            value={value}
            onChange={(e) => setValue(e.target.value)} // Add this line
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
