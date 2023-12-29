import React, { useEffect, useState } from "react";
import { Button, TextInput, Label, Select, RangeSlider } from "flowbite-react";

import { CiSearch } from "react-icons/ci";
import { getAdvertisement } from "../../utils/api";

const FilterProperty = ({ setAdvertisement }) => {
  const [filters, setFilters] = useState({
    // address: "",
    // area: "",
    // no_of_bedrooms: "",
    // no_of_washrooms: "",
    // // priceTo : 0,
    // priceFrom : 0 
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "price") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceFrom: 0,
        priceTo: value,
        // [filterType]: value,
      }));
    } else if (filterType === "area") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        areaFrom: 0,
        areaTo: value,
        [filterType]: value,
      }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    }
  };

  useEffect(() => {
    const getAdvertisementData = async () => {
      const advertisementList = await getAdvertisement({
        ...filters,
      });
      if (advertisementList) {
        setAdvertisement(advertisementList);
      }
    };
    getAdvertisementData();
  }, [filters]);

  return (
    <>
      {/* Search Box */}
      <div className="w-full md:flex items-center justify-center gap-2 mt-5">
        <TextInput
          className="text-gray-400"
          style={{ width: "330px" }}
          id="base"
          type="text"
          placeholder="Enter A Keyword"
          sizing="md"
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <Button
          type="button"
          className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
          onClick={(e) => handleFilterChange("address", searchKeyword)}
        >
          <CiSearch className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>

      {/* Filter Setting */}
      <div className="container mt-6">
        <div className="heading flex items-center justify-center">
          <Button
            disabled
            className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none cursor-not-allowed opacity-50 text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700 rounded-lg focus:ring-2"
          >
            Filter Setting
          </Button>
        </div>

        <div className="filter space-y-3 md:space-y-0 block md:flex justify-between items-center gap-4 mt-5">
          {/* <div className="w-full">
            <Select
              id="country"
              // value={filters.country}
              // onChange={(e) => handleFilterChange("country", e.target.value)}
              required
            >
              <option>All Listing</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
          </div> */}

          <div className="w-full">
            <input
              id="area"
              type="number"
              className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
              value={filters.area}
              onChange={(e) => handleFilterChange("area", e.target.value)}
              min={0}
              placeholder="Enter Area"
            />
          </div>

          <div className="w-full">
            <input
              id="no_of_bedrooms"
              type="number"
              className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
              value={filters.no_of_bedrooms}
              onChange={(e) =>
                handleFilterChange("no_of_bedrooms", e.target.value)
              }
              min={0}
              placeholder="Number Of Rooms"
            />
          </div>

          <div className="w-full">
            <input
              id="no_of_washrooms"
              type="number"
              className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
              value={filters.no_of_washrooms}
              onChange={(e) =>
                handleFilterChange("no_of_washrooms", e.target.value)
              }
              min={0}
              placeholder="Number Of Bathrooms"
            />
          </div>
        </div>

        {/* Range Slider */}
        <div className="w-full mt-5 flex items-center justify-center">
          <div className="flex gap-4">
            <div style={{ width: "350px" }}>
              <div className="mb-1 block">
                <Label htmlFor="default-range" value="" />
              </div>
              <h2 className="text-end text-gray-400 text-sm">
                {filters.price} CAD
              </h2>
              <RangeSlider
                id="default-range"
                min={0}
                max={100000000}
                step={100}
                onChange={(e) => handleFilterChange("price", e.target.value)}
              />
              <h2 className=" text-gray-400 text-sm">0 CAD</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProperty;
