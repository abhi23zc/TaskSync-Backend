import React, { useContext, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Collection } from "./Collection";
import task from "../../api/task.api";
import { MyContext } from "../../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HashLoader } from "react-spinners";

export default function Add_Collection() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const { fetchAllCollection } = useContext(MyContext);
  const [loading, setloading] = useState(false)

  const submit = async () => {
    try {
      setloading(true)
      const data = await task.createCollection(name, category);
      console.log(data);
      if (data.statusCode === 201) {
        fetchAllCollection();
        toast.success("Collection created successfully", { containerId: "addcollection" });
      } else {
        toast.error("Collection creation failed", { containerId: "addcollection" });
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("An unexpected error occurred", { containerId: "addcollection" });
    
    }
    setloading(false)
  };
  
  return (
    
    <section>
      {loading ? <HashLoader className="m-auto p-10" color="#36d7b7" /> : null}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full w-full">
          <Collection />
        </div>
        <div className="flex justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:mt-16">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Add a Collection
            </h2>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Collection Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Collection Name"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Category
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Category"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={submit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add Collection <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer containerId="addcollection" />
    </section>
  );
}
