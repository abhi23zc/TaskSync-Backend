import React, { useContext, useEffect } from "react";
import Add_Collection from "../Collection/Add_Collection";
import { Collection } from "../Collection/Collection";
import auth from "../../api/auth.api";
import { MyContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import Add_Tasks from "../Tasks/Add_Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { isLoggedIn, setisLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();
  const getUser = async () => {
    const data = await auth.getUser();

    if (data.statusCode == 200) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center">
      <Add_Collection />
    
    </div>
  );
}
export default Home;
