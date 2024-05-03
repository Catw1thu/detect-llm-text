import {
  Bars3Icon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const handleLogout = () => {
    // localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </label>
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
