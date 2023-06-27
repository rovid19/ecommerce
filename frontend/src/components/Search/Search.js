import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {
  setSearch,
  setSearchOption,
  setSearchResults,
} from "../../app/features/User/search";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [option, setOption] = useState("Stores");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value.user);
  const search = useSelector((state) => state.search.value);

  function handleSearch(e) {
    e.preventDefault();
    axios
      .post("/api/customer/search", { searchValue, option })
      .then(({ data }) => {
        navigate(`/search/${option}/${searchValue}`);
        dispatch(setSearchResults(data));
        dispatch(setSearch(searchValue));
        dispatch(setSearchOption(option));
      });
  }
  console.log(search);
  return (
    <main className="h-full w-full bg-neutral-800">
      <article className="w-full h-[5%] relative">
        <button className="h-full flex items-center absolute right-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-neutral-600 hover:text-neutral-300 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <fieldset className="w-full h-full">
          <form className="w-[70%] h-full relative" onSubmit={handleSearch}>
            <label className="absolute left-0  h-full w-[8%] z-50">
              <select
                className="h-full w-full flex items-center bg-neutral-700 p-2 text-black"
                onChange={(e) => setOption(e.target.value)}
              >
                <option className="text-black">stores</option>
                <option>products</option>
              </select>
            </label>
            <button className="absolute right-2 top-0 h-full flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-neutral-900 hover:text-neutral-300 transition-all"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <input
              className="w-full h-full bg-neutral-700 rounded-md text-neutral-300 text-xl pl-[10%] "
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </fieldset>
      </article>
      <section className="h-[95%] w-full">
        <Outlet />
      </section>
    </main>
  );
};

export default Search;
