import React, { useEffect, useState } from "react";
import Navigation from "../components/HouseOwnerMenu";
import Footer from "../components/HouseOwnerFooter";
import DataTable from "../components/seller/DataTable";
import { getLoggedInUser } from "../utils/auth";
import { getAdvertisement } from "../utils/api";

function HouseOwnerDashboard() {
  const [seller, setSeller] = useState({});
  const [advertisementList, setAdvertisementList] = useState([]);
  const bannerImages = ["banner1.png", "banner2.jpg", "banner3.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    const getAdvertisementData = async (id) => {
      const advertisementList = await getAdvertisement({seller: id});
      if (advertisementList) {
        setAdvertisementList(advertisementList);
      }
    };

    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setSeller(loggedInUser);
      getAdvertisementData(loggedInUser._id);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow">
        <div className="text-center">
          {/* <div
            className="w-full h-[66vh] bg-center bg-cover bg-no-repeat relative font-sans"
            style={{
              backgroundImage: `url(${bannerImages[1]})`, // Setting the background image based on the current index
            }}
          >
            <div className="absolute inset-0 bg-gray-950 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl">
              <p className="text-white">
                Unlock Your Property's Potential...
                <br />
                <br />
                <span className="text-yellow-100 text-4xl sm:text-5xl font-roboto">
                  Advertise Today !
                </span>
              </p>
            </div>
          </div> */}

          <div className="w-full h-[66vh] mt-7">
            {advertisementList && <DataTable rowData={advertisementList} />}
          </div>

          <br />
          <button
            className="bg-blue-950 text-white rounded-lg px-6 py-3 mt-4 text-xl font-semibold hover:bg-blue-900"
            onClick={() => (window.location.href = "../postproperty")}
          >
            Post Property
          </button>
        </div>
        <div className="h-10"></div>
      </main>
      <Footer />
    </div>
  );
}

export default HouseOwnerDashboard;
