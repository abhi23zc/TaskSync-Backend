import React, { useContext, useEffect, useState } from "react";
import { Trash, Heart, ArrowRight, Share } from "lucide-react";
import task from "../../api/task.api";
import { MyContext } from "../../context/TaskContext";
import auth from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export function Collection() {
  const { products, setproducts, fetchAllCollection } = useContext(MyContext);
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    
    fetchAllCollection();
  }, []);

  return (

    
    
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6  sm:p-10 sm:px-2  lg:m-16">
      <h2 className="text-3xl font-bold">Your Collections</h2>
        {loading ? <HashLoader className="m-auto p-10" color="#36d7b7" /> : null}

      <ul className="flex flex-col divide-y divide-gray-200">
        {products ? (
          products.map((product) => (
            <li
              key={product._id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-16 sm:w-16 m-auto"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/11293/11293621.png"
                  }
                  alt={product.name}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {product.name}
                      </h3>
                      <p className="text-sm">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => {
                          // console.log(product._id)
                          navigate("/tasks", {
                            state: { collectionId: product._id },
                          });
                        }}
                        type="button"
                        className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <ArrowRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex divide-x text-sm">
                    <button
                      onClick={async () => {
                        setloading(true)
                        const data = await task.deleteCollection(product._id);
                        if (data.statusCode == 200) {
                          fetchAllCollection();
                        }
                        setloading(false)
                        
                      }}
                      type="button"
                      className="flex items-center space-x-2 px-2 py-1 pl-0"
                    >
                      <Trash size={16} />
                      <span>Remove</span>
                    </button>
                    {/* <button
                      type="button"
                      className="flex items-center space-x-2 px-2 py-1"
                    >  */}
                    <Popup collectionId={product._id} />

                    {/* </button> */}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-lg">Create new collection</p>
        )}
      </ul>
    </div>
  );
}
