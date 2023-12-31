import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Searchbar = ({
  onSubmit,
}: {
  onSubmit: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSubmit(e.target.value);
  };

  return (
    <form className="relative flex items-center justify-center w-full h-10 rounded-md border border-gray-400 bg-[#F9FBFD]">
      <AiOutlineSearch className="absolute left-3 text-gray-500 text-2xl" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-12 pr-8 text-sm text-gray-700 bg-[#F9FBFD] focus:outline-none active:outline-none"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Searchbar;
