import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const [Data, setData] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { title: "All Task", icon: <CgNotes />, link: "/" },
    { title: "Important Task", icon: <MdLabelImportant />, link: "/importanttask" },
    { title: "Complete Task", icon: <FaCheckDouble />, link: "/completetask" },
    { title: "Incomplete Task", icon: <TbNotebookOff />, link: "/incompletetask" },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(`${BASE_URL}/get-all-task`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(authAction.logout());
    navigate("/login");
  };

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <div className="md:hidden fixed top-16 left-0 w-full bg-gray-900 text-white p-3 z-40">
  <GiHamburgerMenu
    size={26}
    onClick={() => setOpen(true)}
    className="cursor-pointer"
  />
</div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
  className={`
    fixed md:static top-16 md:top-0 left-0 z-50 
    w-64 h-[calc(100%-64px)] md:h-full bg-gray-900 text-white p-4
    transition-transform duration-300 
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
>

        {/* CLOSE BTN MOBILE */}
        <div className="md:hidden flex justify-end">
          <button onClick={closeSidebar} className="text-white text-xl mb-3 px-2 py-1 bg-gray-700 rounded">
            X
          </button>
        </div>

        {/* User Info */}
        {Data && (
          <div>
            <h2 className="text-xl mb-1">{Data.username}</h2>
            <h4 className="mb-2 text-gray-400">{Data.email}</h4>
            <hr className="border-gray-700" />
          </div>
        )}

        {/* Links */}
        <div className="mt-4">
          {links.map((item, i) => {
            const active = location.pathname === item.link;
            return (
              <Link
                key={i}
                to={item.link}
                onClick={closeSidebar}
                className={`flex items-center gap-2 p-2 rounded mb-2 text-lg ${
                  active ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button
          className="w-full bg-gray-700 hover:bg-gray-600 rounded py-2 mt-4"
          onClick={() => {
            logout();
            closeSidebar();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;







