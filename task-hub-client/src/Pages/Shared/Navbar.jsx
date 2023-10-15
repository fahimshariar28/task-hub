import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  const headerOptions = (
    <>
      <li className="text-xl">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Teams
        </NavLink>
      </li>
      <li className="text-xl">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar w-9/12 mx-auto mt-3 relative">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            {headerOptions}
          </ul>
        </div>
        <Link to="/" className="navbar-brand hidden md:block">
          <img className="w-36 rounded-md" src="/logo.png" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1">{headerOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="w-10">
              <a id="my-anchor-element">
                <img
                  className="avatar rounded-full"
                  alt={user?.displayName}
                  src={user?.photoURL || "https://i.ibb.co/cLRwPXz/profile.png"}
                />
              </a>{" "}
              <Tooltip
                anchorSelect="#my-anchor-element"
                content={user.displayName}
                place="bottom"
              ></Tooltip>
            </div>
            <button className="btn btn-error ms-3" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
