import React from "react";

const RatingStarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 3a1 1 0 012.902 0l1.946 3.947a1 1 0 00.75.546l4.357.633a1 1 0 01.554 1.706l-3.157 3.075a1 1 0 00-.286.885l.745 4.347a1 1 0 01-1.451 1.054L10 15.868l-3.908 2.053a1 1 0 01-1.451-1.054l.745-4.347a1 1 0 00-.286-.885l-3.157-3.075a1 1 0 01.554-1.706l4.357-.633a1 1 0 00.75-.546L9.049 3z" />
  </svg>
);

function SellerContact() {
  return (
    <div className="bg-gray-100 p-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">SELLER</h2>
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src="/seller.jpg"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center mb-1">
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black"
            >
              Brenda
            </a>
            <p className="mt-2 text-gray-900">
              Amet consectetur adipiscing elit duis tristique sollicitudin nibh
              sit. Id velit ut tortor pretium viverra suspendisse. Elit ut
              aliquam purus sit. Dictumst quisque.
            </p>
            <div className="flex space-x-2 justify-center mt-4 mb-5">
              <button className="px-4 py-2 bg-blue-950 text-white text-base rounded-full focus:outline-none hover:bg-blue-600 transition duration-150">
                Contact
              </button>
              <button className="px-4 py-2 bg-blue-950 text-white text-base rounded-full focus:outline-none hover:bg-blue-600 transition duration-150">
                Chat
              </button>
              <button className="px-4 py-2 bg-blue-950 text-white text-base rounded-full focus:outline-none hover:bg-blue-600 transition duration-150">
                Request Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerContact;
