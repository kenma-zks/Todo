import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
// import { RxAvatar } from "react-icons/rx";
import avatar from "../assets/avatar.svg";
import { AiOutlineDown } from "react-icons/ai";

const Header = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between sticky top-0 z-30 left-0 bg-white px-5 h-16 shadow-sm border-b border-gray-300">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 h-24" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-5">
          <div className="flex w-full items-center">
            <Searchbar />
          </div>
          <div className="border-r border-gray-400 h-8 " />
          <div className="flex items-center gap-3">
            <p className="font-semibold">Dog </p>
            <img src={avatar} alt="avatar" className="w-10 h-10" />
            <AiOutlineDown className="text-gray-500 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
