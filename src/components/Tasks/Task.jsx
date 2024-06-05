import React, { useContext, useState } from "react";
import task from "../../api/task.api";
import { Trash, Heart, ArrowRight, Delete, Edit, Check } from "lucide-react";
import { MyContext } from "../../context/TaskContext";

function Task({ product, collectionId }) {
  const [update, setupdate] = useState(false);
  const [title, settitle] = useState(product.title);
  const [desc, setdesc] = useState(product.description);

  const { fetchAllTasks } = useContext(MyContext);
  return (
    <>
      {
        // console.log(new Date(product.date).toLocaleDateString())
      }
      <li
        key={product._id}
        className="flex flex-col py-6 sm:flex-row sm:justify-between lg:w-96 md:w-96 w-74 p-3  shadow-xl"
      >
        <div className="flex w-68 space-x-2 sm:space-x-4">
          <img
            className="w-16 m-auto flex-shrink-0 rounded object-contain outline-none dark:border-transparent  sm:w-16"
            src={"https://cdn-icons-png.flaticon.com/512/3208/3208615.png"}
            alt={product.title}
          />
          <div className="flex w-full flex-col justify-between pb-4">
            <div className="flex w-full justify-between space-x-2 pb-2">
              <div className="space-y-1">
                {update ? (
                  <input
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    value={title}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-5"
                    type="text"
                    placeholder="Task Title"
                  ></input>
                ) : (
                  <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                    {product.title}
                  </h3>
                )}

                {update ? (
                  <input
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                    value={desc}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Task Description"
                  ></input>
                ) : (
                  <h3 className="text-sm text-gray-500 font-semibold leading-snug sm:pr-8">
                    {product.description}
                  </h3>
                )}
              </div>
              <div className="text-right">
                <button
                  onClick={() => {
                    console.log("checked");
                  }}
                  type="button"
                  className="mt-4 w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                ></button>
              </div>

              <span className="text-md font-bold">
                {new Date(product.date).toLocaleDateString()}
              </span>
              <div className="text-right">
                <button
                  onClick={() => {
                    // console.log(product._id);
                    settitle(product.title);
                    setdesc(product.description);
                    setupdate((prev) => !prev);
                  }}
                  type="button"
                  className=" w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <Edit size={16} />
                </button>
                {update ? (
                  <button
                    onClick={async () => {
                      const data = await task.updateTask(
                        title,
                        desc,
                        product.status,
                        product._id
                      );
                      console.log(data);
                      await fetchAllTasks(collectionId);
                      setupdate((prev) => !prev);
                    }}
                    type="button"
                    className="mt-2 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Check size={16} />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex divide-x text-sm">
              <button
                onClick={async () => {
                  const data = await task.deleteTask(product._id);
                  console.log(data);

                  await fetchAllTasks(collectionId);
                }}
                type="button"
                className="flex items-center space-x-2 px-2 py-1 pl-0"
              >
                <Trash size={16} />
                <span>Remove</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-2 px-2 py-1"
                onClick={async () => {
                  const data = await task.updateTask(
                    title,
                    desc,
                    !product.status,
                    product._id
                  );

                  // console.log(data);

                  await fetchAllTasks(collectionId);
                }}
              >
                {product.status ? (
                  <img
                    className="w-4"
                    srcSet={
                      "https://cdn-icons-png.flaticon.com/512/833/833386.png"
                    }
                    alt=""
                  />
                ) : (
                  <Heart className="text-black" size={16} />
                )}
                <span>Complete</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default Task;
