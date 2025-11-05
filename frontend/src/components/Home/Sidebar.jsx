import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const [Data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 for detecting active route

  const data = [
    {
      title: "All Task",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Task",
      icon: <MdLabelImportant />,
      link: "/importanttask",
    },
    {
      title: "Complete Task",
      icon: <FaCheckDouble />,
      link: "/completetask",
    },
    {
      title: "Incomplete Task",
      icon: <TbNotebookOff />,
      link: "/incompletetask",
    },
  ];

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v2/get-all-task",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
    fetch();
    }
  });

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(authAction.logout());
    navigate("/login");
  };

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl mb-1">{Data.username}</h2>
          <h4 className="mb-2 text-gray-400 ">{Data.email}</h4>
          <hr />
        </div>
      )}

      {/* Sidebar Links */}
      <div className="mt-4">
        {data.map((item, i) => {
          const isActive =
            location.pathname === item.link ||
            (item.link === "/" && location.pathname === ""); // default
          return (
            <Link
              to={item.link}
              key={i}
              className={`my-2 text-lg flex items-center p-2 rounded transition-all duration-300 ${
                isActive ? "bg-gray-600 text-white" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}&nbsp;{item.title}
            </Link>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          className="bg-gray-700 w-full rounded py-2 hover:bg-gray-600"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
