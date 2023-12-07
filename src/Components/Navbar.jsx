import { useSnapshot } from "valtio";
import logo from "../assets/icons/logo.svg";
import state from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logOut } from "../store";

const Navbar = () => {
  const snap = useSnapshot(state);

  const navigate = useNavigate();
  //handle Log Out

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    // <header className="w-full  bg-slate-800 backdrop-blur-sm">
    //   <nav class="flex flex-wrap items-center justify-start p-5 ">
    //     <div className="w-14 mx-8">
    //       <img src={logo} alt="logo" />
    //     </div>
    //     <div className="text-[25px] font-bold text-indigo-500">To Do List</div>
    //   </nav>
    // </header>

    <header className="sticky top-0 z-30 h-[80px] bg-gray-900/50 backdrop-blur backdrop-filter">
      <div className="mx-auto max-w-8xl xl:px-8">
        <div className="flex items-center justify-around">
          <div className="flex items-center justify-center gap-6 border-b border-gray-800 px-4 py-5 sm:px-6 lg:px-8 xl:px-0">
            <Link className="block" to="/">
              <div className="w-10 ">
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="text-[25px] font-bold text-indigo-500 text-gradient_blue-purple">
              Todo List
            </div>
          </div>
          <div
            className=" text-[50px] text-gray-200 py-2 px-2 rounded-full "
            onClick={handleLogOut}
          >
            {snap.loggedUser ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-log-out text-gradient_blue-purple"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
