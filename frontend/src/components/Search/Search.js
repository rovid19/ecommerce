import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../assets/svg-loaders/three-dots.svg";

import {
  setSearch,
  setSearchOption,
  setSearchResults,
} from "../../app/features/User/search";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [option, setOption] = useState("stores");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [stores, setStores] = useState(null);
  const [outletOn, setOutletOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearchAni, setFilterSearchAni] = useState(
    "h-[50%] w-[40%] lg:w-[30%] bg-neutral-900 rounded-b-md absolute z-50 right-0 text-white "
  );
  const [filterSearchItemsAni, setFilterSearchItemsAni] =
    useState("h-full w-full fl2");
  const [filterBtnAni, setFilterBtnAni] = useState(
    "absolute left-2 top-2  z-50"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value.user);
  const search = useSelector((state) => state.search.value);

  function handleSearch(e) {
    e.preventDefault();
    axios
      .post("/api/customer/search", { searchValue, option })
      .then(({ data }) => {
        setOutletOn(true);
        navigate(`/search/${option}/${searchValue}`);
        dispatch(setSearchResults(data));
        dispatch(setSearch(searchValue));
        dispatch(setSearchOption(option));
      });
  }

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/customer/get-all-stores").then(({ data }) => {
      setStores(data);
      setIsLoading(false);
    });
  }, []);
  // FILTER OPTIONS FUNCTIONS
  async function sortByAtoZ() {
    let newArray = [...search.searchResults];
    newArray.sort((a, b) => {
      if (a.productName < b.productName) return -1;
      if (a.productName > b.productName) return 1;
      return 0;
    });

    dispatch(setSearchResults(newArray));
  }
  async function sortByPriceHighest() {
    let newArray = [...search.searchResults];
    newArray.sort((a, b) => {
      return b.productNewPrice - a.productNewPrice;
    });

    dispatch(setSearchResults(newArray));
  }
  async function sortByPriceLowest() {
    let newArray = [...search.searchResults];
    newArray.sort((a, b) => {
      return a.productNewPrice - b.productNewPrice;
    });

    dispatch(setSearchResults(newArray));
  }
  async function sortBySold() {
    let newArray = [...search.searchResults];
    newArray.sort((a, b) => {
      return b.productSold - a.productSold;
    });

    dispatch(setSearchResults(newArray));
  }

  // USEEFFECT

  useEffect(() => {
    if (sortBy) {
      /* switch (sortBy) {
        case "A-Z":
          sortByAtoZ;
          break;
        case "Lowest to highest price":
          sortByPriceLowest();
          break;
        case "Highest to lowest price":
          sortByPriceHighest;
          break;
        case "Most units sold":
          sortBySold();
          break;
      }*/
      if (sortBy === "A-Z") {
        sortByAtoZ();
      } else if (sortBy === "Lowest to highest price") {
        sortByPriceLowest();
      } else if (sortBy === "Highest to lowest price") {
        sortByPriceHighest();
      } else {
        sortBySold();
      }
    }
  }, [sortBy]);

  return (
    <main className="h-full w-full bg-neutral-800 relative">
      <article className="w-full h-[8%] p-2 relative bg-neutral-900">
        <button
          className="h-full flex items-center absolute right-2 top-0 "
          onClick={() => {
            if (filterSearchAni.includes("filterSearchAniClose")) {
              setFilterSearchAni((prev) => {
                let newPrev = prev.replace(
                  "filterSearchAniClose",
                  "filterSearchAni"
                );
                return newPrev;
              });
              setFilterSearchItemsAni((prev) => {
                let newPrev = prev.replace(
                  "filterItemsClose",
                  "filterItemsOpen"
                );
                return newPrev;
              });
              setFilterBtnAni("absolute left-2 top-2  z-50");
            } else {
              setFilterSearchAni((prev) => prev + " filterSearchAni");
              setFilterSearchItemsAni((prev) => prev + " filterItemsOpen");
              setFilterBtnAni("absolute left-2 top-2  z-50");
            }

            setFilterVisible(true);
          }}
        >
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
          <form
            className="w-[70%] h-full relative ml-[50px] lg:ml-0 flex"
            onSubmit={handleSearch}
          >
            <label className="  h-full w-[40%] md:w-[18%] lg:w-[15%] xl:w-[10%] z-40">
              <select
                className="h-full w-full flex items-center bg-neutral-500 p-2 text-neutral-900"
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
              className="w-full h-full bg-neutral-500 rounded-r-md text-neutral-900 text-base md:text-xl pl-2 outline-none "
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </fieldset>
      </article>
      <section className="h-[92%] w-full relative">
        {filterVisible && (
          <div className={filterSearchAni}>
            <button
              className={filterBtnAni}
              onClick={() => {
                setFilterSearchAni((prev) => {
                  let newPrev = prev.replace(
                    "filterSearchAni",
                    "filterSearchAniClose"
                  );
                  return newPrev;
                });
                setFilterSearchItemsAni((prev) => {
                  let newPrev = prev.replace(
                    "filterItemsOpen",
                    "filterItemsClose"
                  );
                  return newPrev;
                });
                setFilterBtnAni((prev) => prev + " filterBtnClose");
                setTimeout(() => {
                  setFilterVisible(false);
                }, [500]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 hover:text-orange-500 text-neutral-600"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <form className={filterSearchItemsAni}>
              <h1 className="text-xl lg:text-2xl xl:text-3xl">
                Sort results by:
              </h1>
              <select
                className="rounded-md text-neutral-900 w-[50%] text-center mt-1"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {option === "products" ? (
                  <>
                    <option>A-Z</option>
                    <option>Highest To Lowest</option>
                    <option>Lowest To Highest</option>
                    <option>Most Units Sold</option>
                  </>
                ) : (
                  <option>A-Z</option>
                )}
              </select>
            </form>
          </div>
        )}
        {outletOn ? (
          <Outlet />
        ) : isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <img src={Loader}></img>
          </div>
        ) : (
          <div className="w-full h-[100%] grid grid-cols-2 lg:grid-cols-3 dgri overflow-scroll scrollbar-hide p-4 gap-4  ">
            {stores &&
              stores.map((result, i) => {
                return (
                  <article
                    className={
                      i > 2
                        ? "h-full w-full mt-4 rounded-md shadow-2xl cursor-pointer bg-neutral-900 "
                        : "h-full w-full  rounded-md shadow-2xl cursor-pointer bg-neutral-900 "
                    }
                    onClick={() => {
                      navigate(`/store/${result.storeName}/${result._id}`);
                    }}
                    key={i}
                  >
                    {" "}
                    <div className="h-[30%] w-full p-4 text-neutral-400">
                      <span>Store name:</span>
                      <h1 className="text-2xl"> {result.storeName}</h1>
                    </div>
                    <img
                      src={result.storeProfile}
                      className="h-[70%] w-full object-cover rounded-b-md rounded-md"
                    ></img>
                  </article>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Search;
