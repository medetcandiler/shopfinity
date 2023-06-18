import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";

function SelectedMovies({
  poster,
  title,
  year,
  type,
  selected,
  setSelected,
  movie,
}) {
  const handleDelete = () => {
    setSelected(selected.filter((item) => item != movie));
  };

  return (
    <div className="selected-card flex font-serif justify-between items-center px-5 text-[#FAF7ED] border border-purple-500 py-5 w-5/6 md:px-12">
      <div className="flex space-x-6 items-center ">
        <Image
          src={poster}
          width={80}
          height={80}
          alt={`Poster for ${title}`}
        />
        <div className="flex flex-col">
          <h3 className="w-44 truncate font-bold text-[#FFE7CE]">{title}</h3>
          <h3>{type}</h3>
          <h3>{year}</h3>
        </div>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="transition translate-y-4 ease-in-out delay-150 bg-purple-900 p-[7px] rounded-full shadow-md cursor-pointer hover:-translate-y-1 hover:opacity-50 md:translate-y-0 "
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  );
}

export default SelectedMovies;
