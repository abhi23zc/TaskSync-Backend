import React, { useContext, useEffect, useState } from "react";
import { Trash, Heart, ArrowRight, Delete, Edit, Check } from "lucide-react";
import task from "../../api/task.api";
import { MyContext } from "../../context/TaskContext";
import auth from "../../api/auth.api";
import { useLocation } from "react-router-dom";
import { Table } from "./Table";
import Task from "./Task";

export function Tasks() {
  const location = useLocation();
  const { collectionId } = location.state;
  const {
    setallTask,
    allTask,
    setproducts,
    fetchAllTasks,
    fetchAllCollection,
  } = useContext(MyContext);
  const submit = async () => {
    // console.log(collectionId)
    fetchAllTasks(collectionId);
  };

  useEffect(() => {
    submit();
  }, []);

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6  sm:p-10 sm:px-2  lg:m-16 lg:ml-40">
      <h2 className="text-3xl font-bold">Your Tasks</h2>

      <ul className="flex flex-col divide-y divide-gray-200">
        {allTask?.map((product) => (
          // setdesc(product.desc)
          <Task key={product._id} collectionId={collectionId} product={product} />
        ))}
      </ul>
    </div>
  );
}
