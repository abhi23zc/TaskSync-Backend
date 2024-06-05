import React, { useContext, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tasks } from "./Tasks";
import task from "../../api/task.api";
import { MyContext } from "../../context/TaskContext";
import { useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Add_Tasks() {
  const location = useLocation();
  const { collectionId } = location.state;

  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const { fetchAllTasks } = useContext(MyContext);

  const submit = async () => {
    console.log(collectionId);
    fetchAllTasks(collectionId);
  };

  return (
    <section>
      <ToastContainer/>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full w-full">
          <Tasks />
        </div>
        <div className="flex  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:mt-16 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Add a Task
            </h2>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Task Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      value={name}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Task Name"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Description{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {
                        setdesc(e.target.value);
                      }}
                      value={desc}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Description"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (name && desc && collectionId) {
                        const data = await task.createTask(
                          name,
                          desc,
                          collectionId
                        );
                        submit();
                        toast("Task added Succesfully")
                      } else {
                        toast("Task creation failed")
                      }
                    }}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add Task <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    </section>
  );
}
