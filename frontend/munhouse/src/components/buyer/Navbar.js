import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileMenuOpen(false); // Close profile menu when hamburger is clicked
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMenuOpen(false); // Close hamburger menu when profile is clicked
  };

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    console.log({loggedInUser})
  }, [])

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLoggedIn");
    navigate("/login");
  };


  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-blue-950">
      <Link to='/' className="flex items-center mr-10">
        <div className="text-xl text-white font-bold dark:text-white">
          MUNHouse
        </div>
      </Link>

      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-white hover:text-white"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns=""
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns=""
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-base text-white lg:flex-grow">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-transparent-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800">
            <li className="hover:text-blue-700">
              <Link
                to="/"
                className="block mt-4 px-3 py-1 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-gray-900 hover:text-white dark:hover:text-blue-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="hover:text-blue-700">
              <a
                href="#"
                className="block mt-4 px-3 py-1 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-gray-900 hover:text-white dark:hover:text-blue-600"
              >
                Listings
              </a>
            </li>
            <li className="hover:text-blue-700">
              <a
                href="#"
                className="block mt-4 px-3 py-1 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-gray-900 hover:text-white dark:hover:text-blue-600"
              >
                Favourites
              </a>
            </li>
            <li className="hover:text-blue-700">
              <a
                href="#"
                className="block mt-4 px-3 py-1 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-gray-900 hover:text-white dark:hover:text-blue-600"
              >
                Requests
              </a>
            </li>
            <li className="hover:text-blue-700">
              <a
                href="#"
                className="block mt-4 px-3 py-1 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-gray-900 hover:text-white dark:hover:text-blue-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {Object.keys(user).length === 0 &&<div className="flex text-white items-center text-base font-medium relative hover:bg-gray-700 hover:text-white text-white">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center"
          >
            <svg
              className="h-6 w-6 ml-2 rounded-full bg-gray-400 hidden lg:block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>

            <a
              href="#"
              className="ml-1 px-3 py-1 "
            >
              Join Us
            </a>
          </div>

          {dropdownOpen && (
            <div className="absolute top-full right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to='/login'
                className="block px-4 py-2 text-gray-900 hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to='/signup'
                className="block px-4 py-2 text-gray-900 hover:bg-gray-200"
              >
                Signup
              </Link>
            </div>
          )}
        </div>}

       {Object.keys(user).length > 0 && <div className="flex items-center sm:ml-6">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  onClick={toggleProfileMenu}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`${user?.profileImage}`}
                    alt=""
                  />
                </button>
              </div>

              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <span
                    onClick={() => {
                      logoutUser();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </span>
                </div>
              )}
            </div>
          </div>}
      </div>
    </nav>
  );
}

export default Navbar;
