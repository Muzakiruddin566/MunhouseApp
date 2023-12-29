import React from "react";
import Navbar from "../../components/buyer/Navbar";
import Footer from "../../components/buyer/Footer";
import Amenities from "./Amenities.js";
import Location from "./Location.js";
import Review from "./Review.js";
import SellerContact from "./SellerContact.js";

function PropertyDescription() {
  return (
    <div className="mx-auto bg-gray-100">
      <Navbar />
      <section class="relative w-full h-screen text-white bg-gray-100 flex items-center justify-center mt-0 mb-0">
        <img
          src="/Property_Description_1.jpg"
          class="absolute object-cover w-full h-full block mb-0"
          alt="Property"
        />
        <div class="absolute w-full h-full bg-gray-950 opacity-80"></div>
        <div class="z-20 text-center">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            The Most Luxurious House
          </h1>
          <div class="mt-2 sm:mt-3 md:mt-4">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin mr-3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              29 Guy Street, A1B 1P7
            </p>
          </div>
        </div>
      </section>
      <div className="bg-gray-100 p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center sm:ml-10">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <span className="text-sm font-semibold text-gray-900 uppercase">
                RENT
              </span>
              <span className="flex items-baseline text-2xl sm:text-4xl font-semibold text-blue-950">
                <span>1600 CAD</span>
                <sup className="text-xs text-gray-900 -top-0.5 pl-1">
                  /month
                </sup>
              </span>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0 mx-2 md:mx-4">
              +
            </div>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <span className="text-sm font-semibold text-gray-900 uppercase">
                SECURITY DEPOSIT
              </span>
              <span className="flex items-baseline text-2xl sm:text-4xl font-semibold text-blue-950">
                <span>700 CAD</span>
                <sup className="text-xs text-gray-900 -top-0.5 pl-1">
                  one-time
                </sup>
              </span>
            </div>
          </div>

          <button className="w-full sm:mr-6 md:w-auto px-8 py-4 font-medium text-white rounded-full bg-green-900 focus:outline-none md:ml-4">
            Available Now
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-8">
        <h2 className="text-xl font-semibold mb-4">ABOUT PROPERTY</h2>
        <p className="text-gray-900">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ullamcorper eget nulla facilisi etiam. Vulputate enim nulla aliquet
          porttitor lacus luctus accumsan tortor posuere. Vulputate odio ut enim
          blandit volutpat maecenas volutpat. Pulvinar etiam non quam lacus
          suspendisse faucibus interdum. Quam nulla porttitor massa id neque
          aliquam. Feugiat sed lectus vestibulum mattis ullamcorper velit. Sit
          amet massa vitae tortor condimentum lacinia. In pellentesque massa
          placerat duis ultricies lacus sed turpis tincidunt. Enim sit amet
          venenatis urna cursus. Nisi porta lorem mollis aliquam ut porttitor
          leo. Ac odio tempor orci dapibus. Mus mauris vitae ultricies leo
          integer malesuada nunc. Sed id semper risus in hendrerit gravida
          rutrum quisque. Diam sollicitudin tempor id eu nisl
        </p>
      </div>
      <Amenities />
      <Location />
      <Review />
      <SellerContact />
      <Footer />
    </div>
  );
}

export default PropertyDescription;
