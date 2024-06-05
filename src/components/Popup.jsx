import { Share } from "lucide-react";
import React, { useState } from "react";
import task from "../api/task.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Popup({ collectionId }) {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setemail] = useState("");

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const share = async () => {
    const data = await task.share(email, collectionId);
    if (data.statusCode === 200) {
      console.log("Collection shared successfully");
      toast.success("Collection shared successfully");
    } else {
      toast.error("Collection shared failed");
      console.log("Collection sharing failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={handleToggleModal}
        className="flex  text-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm p-2 text-center "
        type="button"
      >
        <Share />
        <span className="px-2">Share</span>
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Share Collection With Other Users
                </h3>
                <button
                  type="button"
                  onClick={handleToggleModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email or Username
                    </label>
                    <input
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      share();
                    }}
                    type="submit"
                    className="w-32 mx-auto flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Share
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    TaskSync ||{" "}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Share Collections
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
