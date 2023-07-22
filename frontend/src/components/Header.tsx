import logo from "../assets/logo.svg";
import { Link, Outlet } from "react-router-dom";
import Searchbar from "./Searchbar";
import avatar from "../assets/avatar.svg";
import { setSearchQuery } from "../store/searchSlice";
import { useAppDispatch } from "../store/hooks";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [shownDropdown, setShownDropdown] = useState(false);

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const dispatch = useAppDispatch();

  const handleSearch = (searchTerm: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(setSearchQuery(searchTerm));
  };

  const toggleDropdown = () => {
    setShownDropdown(!shownDropdown);
  };

  const handleLogout = () => {
    console.log("logout");
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShownDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex items-center justify-between sticky top-0 z-30 left-0 bg-white px-5 h-16 shadow-sm border-b border-gray-300">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 h-24" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-5">
          <div className="flex w-full items-center">
            <Searchbar onSubmit={handleSearch} />
          </div>
          <div className="border-r border-gray-400 h-8 " />
          <div className="flex items-center gap-3 pr-8" ref={dropdownRef}>
            <p className="font-semibold">Dog </p>
            <img
              src={avatar}
              alt="avatar"
              className="w-10 h-10 hover:cursor-pointer"
              onClick={toggleDropdown}
            />
            {shownDropdown && (
              <div className="absolute right-2 top-14 w-40 bg-white border border-gray-500 rounded-md shadow-md z-10">
                <button
                  className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-100 hover:rounded-md"
                  onClick={handleLogout}
                >
                  <Link to="/login">Logout</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
