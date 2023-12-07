import { proxy } from "valtio";

const state = proxy({
  // user: (() => {
  //   const storedUser = localStorage.getItem("userData");
  //   console.log("userData", storedUser);
  //   try {
  //     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  //     return parsedUser ? parsedUser.user : null;
  //   } catch (error) {
  //     console.error("Error parsing loggedUser:", error);
  //     return null;
  //   }
  // })(),
  //for logedinUser
  // loggedUser: JSON.parse(localStorage.getItem("loggedUser")) || null,

  loggedUser: (() => {
    const storedUser = localStorage.getItem("authToken");
    console.log("stored", storedUser);
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      return parsedUser ? parsedUser : null;
    } catch (error) {
      console.error("Error parsing loggedUser:", error);
      return null;
    }
  })(),

  todos: [],
  isOpen: false,
  editingTodo: null, // Initialize editingTodo as null
});

// api.js

// const BASE_URL = "http://localhost:8000/api/user";

// const customFetch = async (
//   url,
//   method = "GET",
//   data = null,
//   authToken = null
// ) => {
//   authToken = window.localStorage.getItem("authToken");

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   if (authToken) {
//     headers["Authorization"] = `Bearer ${authToken}`;
//   } else {
//     authToken = null;
//   }

//   const options = {
//     method,
//     headers,
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/${url}`, options);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error during API request:", error.message);
//     throw error;
//   }
// };

const BASE_URL = "http://localhost:8000/api/user";

const customFetch = async (
  url,
  method = "GET",
  data = null,
  titleQuery = null,
  authToken = null
) => {
  authToken = window.localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  } else {
    authToken = null;
  }

  let apiUrl = `${BASE_URL}/${url}`;

  // If it's a GET request and there's data (e.g., user ID), append it to the URL
  // if (method === "GET" && data) {
  //   apiUrl += `?userId=${data}`;
  // }

  // if (titleQuery) {
  //   apiUrl += `?title=${encodeURIComponent(titleQuery)}`;
  // }

  if (method === "GET" && data) {
    apiUrl += `/${data}`;
  }

  if (titleQuery) {
    apiUrl += `/${encodeURIComponent(titleQuery)}`;
  }

  const options = {
    method,
    headers,
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during API request:", error.message);
    throw error;
  }
};

// export default customFetch;

//api Call

export const searchTodo = async (title) => {
  const response = await customFetch(
    "search-todo",
    "GET",
    state.loggedUser.user._id,
    title
  );

  // console.log(response);
  if (response.todos.length > 0) {
    state.todos = response.todos;
    console.log(state.todos);
  } else {
    state.todos = [];
  }
};

export const fetchTodosByFilter = async (filter) => {
  console.log(filter);
  if (filter !== "All") {
    const response = await customFetch(
      "filter-todo",
      "GET",
      state.loggedUser.user._id,
      filter
    );
    console.log("filtered to", response);
    if (response.todos.length > 0) {
      state.todos = response.todos;
      console.log(state.todos);
    } else {
      state.todos = [];
    }
  } else {
    try {
      // console.log("fetch func", id);
      const response = await customFetch(
        `get-todos`,
        "GET",
        state.loggedUser.user._id
      );
      console.log("todo response", response.todos);
      if (response.todos.length > 0) {
        state.todos = response.todos;
        console.log(state.todos);
      } else {
        state.todos = [];
      }
    } catch (error) {
      console.error("Error during fetchAllTodos:", error);
      return null; // or handle the error as needed
    }
  }
};

export const signup = async (email, password) => {
  // Validate input (add more validation as needed)

  const loginData = {
    email: email,
    password: password,
  };

  const response = await customFetch("register", "POST", loginData);

  // // Save user to local storage using Valtio
  state.users.push(newUser);

  return response;
};

export const signin = async (email, password) => {
  // if(state.users.length>0 )
  // {

  const loginData = {
    email: email,
    password: password,
  };

  console.log("stored token", localStorage.getItem("authToken"));

  const response = await customFetch("login", "POST", loginData);

  console.log("Response:", response);
  localStorage.setItem("authToken", JSON.stringify(response));
  // localStorage.setItem("userData", JSON.stringify(response));

  state.loggedUser = response.user;
  console.log("user token", state.loggedUser);
  // console.log("userData", state.user);

  return response;
};

//Log Out
export const logOut = () => {
  state.loggedUser = null;
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("authToken");
};

export const fetchAllTodos = async (id) => {
  try {
    console.log("fetch func", id);
    const response = await customFetch(`get-todos`, "GET", id);
    console.log("todo response", response.todos);
    if (response.todos) {
      return response.todos;
    } else {
      return null; // or handle the error as needed
    }
  } catch (error) {
    console.error("Error during fetchAllTodos:", error);
    return null; // or handle the error as needed
  }
};

export const openModal = (todo = null, id, userId) => {
  state.isOpen = true;
  state.editingTodo = todo;
};

export const closeModal = () => {
  state.isOpen = false;
  state.editingTodo = null; // Reset editingTodo when closing the modal
};

export const addTodo = async (newTodo) => {
  const response = await customFetch("create-todo", "POST", newTodo);
  console.log("add to ", response);
  if (response) {
    // Success: The todo was created successfully
    const createdTodo = response;

    //add in todos array
    state.todos = [createdTodo, ...state.todos];
    console.log("Todo created successfully:", state.todos);
    return true;
  } else {
    // Error: Something went wrong
    // const errorData = await response.json();
    console.error("Error creating todo:", response);
    return false;
  }
  // state.todos.push(newTodo);
  // state.todos = [newTodo, ...state.todos];

  // localStorage.setItem("todos", JSON.stringify(state.todos));

  return true;
};

export const editTodo = async (updatedTodo) => {
  const response = await customFetch("edit-todo", "POST", {
    todo: updatedTodo,
    userId: state.loggedUser.user._id,
  });
  console.log("edited response", response);
  if (response.success) {
    state.todos = state.todos.map((todo) =>
      todo._id === updatedTodo._id ? response.todo : todo
    );
    // localStorage.setItem("todos", JSON.stringify(state.todos));
    closeModal();
    return true;
  }

  return false;
};

//FUNCTION TO DELETE TO DO
export const deleteTodo = async (todoId, userId) => {
  const response = await customFetch("delete-todo", "POST", { todoId, userId });

  if (response.deleted) {
    const todoIndex = state.todos.findIndex((todo) => todo._id === todoId);
    if (todoIndex !== -1) {
      state.todos.splice(todoIndex, 1);
      return true;
    }
  }

  return false;
};

// New function to mark a todo as done
export const markAsDone = async (todoId) => {
  const response = await customFetch("toggle-todo", "POST", {
    todoId,
    userId: state.loggedUser.user._id,
  });

  // console.log("hheee");
  if (response.success) {
    state.todos = state.todos.map((todo) =>
      todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
  }
  console.log("mark", state.todos);
  // localStorage.setItem("todos", JSON.stringify(state.todos));
};

export default state;
