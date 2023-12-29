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

function Review() {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-xl font-semibold mb-4">REVIEW</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus
              consequuntur!
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <a href="#" className="text-xl font-medium text-blue-950">
              John
            </a>
          </div>
        </div>
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus
              consequuntur!
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <a href="#" className="text-xl font-medium text-blue-950">
              John
            </a>
          </div>
        </div>
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
              <RatingStarIcon />
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus
              consequuntur!
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <a href="#" className="text-xl font-medium text-blue-950">
              John
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
