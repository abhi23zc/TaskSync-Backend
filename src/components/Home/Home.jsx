import React, { useContext, useEffect, useState } from "react";
import Add_Collection from "../Collection/Add_Collection";
import { Collection } from "../Collection/Collection";
import auth from "../../api/auth.api";
import { MyContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import Add_Tasks from "../Tasks/Add_Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";

function Home() {
  const { isLoggedIn, setisLoggedIn } = useContext(MyContext);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const getUser = async () => {
    setloading(true);
    const data = await auth.getUser();
    console.log(data);
    if (data.statusCode == 200) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
      navigate("/login");
    }
    setloading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "");
      navigate("/login");
    }
    getUser();
  }, []);

  return (
    <div className="flex justify-center">
      {loading ? (
        <HashLoader className="m-auto p-10" color="#36d7b7" />
      ) : (
        <Add_Collection />
      )}
    </div>
  );
}
export default Home;
