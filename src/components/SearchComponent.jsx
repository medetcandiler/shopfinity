import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";



export default function SearchComponent({
  setSearchType,
  searchType,
  search,
  setSearch,
  onChange
}) {
  const [isTrue, setIsTrue] = useState(false);

  const handleToggle = () => {
    setIsTrue(!isTrue);
  };
  const handleSearchType = (e) => {
    setSearchType(e.target.textContent);
    setIsTrue(false);
  };

  return ( 
    <div className="search-area flex items-center">
      <div className="relative flex mt-4 border w-full me-10 border-purple-200 rounded-md h-14 md:w-96">
        <input
          className="block w-full px-5 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 "
          placeholder={`Search ${
            searchType[0].toLowerCase() + searchType.slice(1, searchType.length)
          } titles`}
          onChange={onChange}
        />

        <button
          onClick={handleToggle}
          className="  flex items-center justify-center w-8 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        >
          {isTrue ? (
            <ArrowDownwardIcon className="animate-bounce" />
          ) : (
            <ArrowUpwardIcon className="animate-bounce" />
          )}
        </button>
        {isTrue && (
          <section className="absolute  text-center  text-sm -top-11 w-full bg-purple-300 py-2 px-2 text-white rounded-md">
            Search for:
            <button
              onClick={handleSearchType}
              className="btn mx-2 px-1 py-1 text-sm"
            >
              Movies
            </button>
            or
            <button
              onClick={handleSearchType}
              className="btn py-1 px-1 text-sm ms-2"
            >
              Series
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
