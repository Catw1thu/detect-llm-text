import {
  Bars3Icon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const handleLogout = () => {
    // localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <div className="navbar sticky top-0 bg-base-200 z-10 shadow-md">
        <div className="flex">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-ghost drawer-button"
          >
            <Bars3Icon className="h-6 w-6" />
          </label>
        </div>
        <div className="flex-1 font-semibold text-xl text-base-content">
          <Link to={"/app/home"}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M16.5 7.5h-9v9h9v-9Z" />
              <path
                fillRule="evenodd"
                d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
                clipRule="evenodd"
              />
            </svg> */}
            Detect-LLM-text
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost" onClick={handleLogout}>
            <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
            退出
          </button>
        </div>
      </div>
    </>
  );
}
