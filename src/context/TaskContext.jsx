import { createContext, useState } from "react";
import task from "../api/task.api";

export const MyContext = createContext();

export const Provider = ({ children }) => {
  const [allTask, setallTask] = useState([]);

  const [products, setproducts] = useState([]);

  async function fetchAllCollection() {
    const data = await task.fetchCollection();

    setproducts(data.data);
    console.log(data.data);
  }

  async function fetchAllTasks(collectionId) {
    const data = await task.fetchallTask(collectionId);

    setallTask(data.data);
    console.log("All Other task fetched ", data.data);
  }

  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <MyContext.Provider
      value={{
        allTask,
        setallTask,
        isLoggedIn,
        setisLoggedIn,
        fetchAllCollection,
        products,
        fetchAllTasks,
        setproducts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
