import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../context/TaskContext";
import Task from "./Tasks/Task";
import auth from "../api/auth.api";

function Share() {
  const [collectionId, setcollectionId] = useState("");
  const {
    setallTask,
    allTask,
    setproducts,
    fetchAllTasks,
    fetchAllCollection,
  } = useContext(MyContext);
  const submit = async () => {
    const data = await auth.getUser();
    console.log(data);
    if (data.statusCode == 200) {
      console.log(data?.data?.share);
      setcollectionId(data?.data?.share);
      
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    submit();
    if (collectionId) {
      fetchAllTasks(collectionId);
    }
  }, [collectionId]);

  return (
    <div className=" flex max-w-full flex-col  sm:p-10 sm:px-2  lg:m-16 lg:ml-40">
      <h2 className="text-3xl font-bold">Your Tasks</h2>

      <ul className="flex flex-wrap  divide-gray-200">
        {allTask?.map((product) => (
          // setdesc(product.desc)
          <Task
            key={product._id}
            collectionId={collectionId}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
}

export default Share;
