import React, { useEffect, useState } from "react";
import {
  Button,
  Avatar,
  Blockquote,
  Rating,
  Carousel,
} from "flowbite-react";
import {
  BiBath,
  BiBed,
  BiSolidLocationPlus,
  BiUserCircle,
} from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import HomeOne from "../assets/images/house1.jpg";
import HomeTwo from "../assets/images/house2.jpg";
import HomeThree from "../assets/images/house3.jpg";
import GoogleMap from "../assets/images/map.png";
import UserImage from "../assets/images/user.jpg";
import { useParams } from "react-router-dom";
import Navbar from "../components/buyer/Navbar";
import FilterProperty from "../components/buyer/FilterProperty";
import { getAdvertisementById } from "../utils/api";
import HouseOwnerFooter from "../components/HouseOwnerFooter";

function PropertyDetails() {
  const { id } = useParams();

  const [advertisement, setAdvertisement] = useState([]);

  useEffect(() => {
    const getAdvertisementData = async () => {
      const advertisement = await getAdvertisementById(id);
      if (advertisement) {
        setAdvertisement(advertisement);
      }
    };
    getAdvertisementData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Home Details */}
      {advertisement && (
        <div className="container mt-12">
          {/* <div className="head bg-gray-200 py-4 pl-4">
            <h2 className="font-semibold">Two Bed, Two Bath Luxury Home</h2>
          </div> */}

          {/* <div className="details mt-4">
            <div className="h-56 sm:h-64 md:h-96 xl:h-[100vh]">
              <Carousel>
                <img src={HomeOne} className="rounded w-full" alt="HomeOne" />
                <img src={HomeTwo} className="rounded w-full" alt="HomeTwo" />
                <img
                  src={HomeThree}
                  className="rounded w-full"
                  alt="HomeThree"
                />
              </Carousel>
            </div>
          </div> */}

          <div className="content block space-y-2 sm:space-y-0 sm:flex items-center gap-8 mt-8">
            <h2 className="font-bold text-2xl">Area: {advertisement.area}</h2>

            <div className="icon flex justify-start items-center gap-2">
              <BiSolidLocationPlus className="text-gray-500" size={20} />
              <h4>{`${advertisement.address} ${advertisement.postal_code}`}</h4>
            </div>
          </div>

          <div className="content block sm:flex space-y-2 sm:space-y-0 items-center gap-10 mt-3 mb-8">
            <h2 className="font-bold text-2xl">
              Price: {advertisement.price} CAD
            </h2>

            <div className="icon flex justify-start items-center gap-2">
              <BiBed className="text-gray-500" size={20} />
              <h4>{advertisement.no_of_bedrooms} Bedroom</h4>
            </div>

            <div className="icon flex justify-start items-center gap-2">
              <BiBath className="text-gray-500" size={20} />
              <h4>{advertisement.no_of_washrooms} Bathroom</h4>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-4">
            <img src={GoogleMap} className="w-full h-96" alt="GoogleMap" />
          </div>

          {/* Property Content */}
          <div className="mt-5">
            <h2 className="font-semibold text-2xl">About Property:</h2>
            <p className="text-justify mt-2 text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply
              random text. It has roots in a piece of classical Latin literature
              from 45 BC, making it over 2000 years old. Richard McClintock, a
              Latin professor at Hampden-Sydney College in Virginia, looked up
              one of the more obscure Latin words, consectetur, from a Lorem
              Ipsum passage, and going through the cites of the word in
              classical literature, discovered the undoubtable source.
            </p>

            <h2 className="font-semibold text-2xl mt-5">Features:</h2>
            <p className="text-justify mt-2 text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Contrary to popular belief.
            </p>
          </div>

          {/* Review */}
          <div className="reviews mt-8">
            <h2 className="font-semibold text-2xl">Reviews:</h2>

            <figure className="max-w-screen-md">
              <div className="mb-2 mt-4 flex items-center">
                <Rating size="md">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                </Rating>
              </div>
              <Blockquote>
                <p className="text-lg font-semibold text-gray-900 dark:text-dark">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </Blockquote>
              <figcaption className="mt-6 flex items-center space-x-3">
                <Avatar
                  rounded
                  size="xs"
                  img={UserImage}
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                  <cite className="pr-3 font-medium text-gray-900 dark:text-dark">
                    John Doe
                  </cite>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Seller */}
          <div className="reviews my-12">
            <h2 className="font-semibold text-2xl">Seller:</h2>

            <figure className="mt-4 max-w-screen-md bg-gray-200 px-4 py-4 rounded">
              <div className="mb-2 mt-4 flex items-center">
                <Rating size="md">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                </Rating>
              </div>
              <Blockquote>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  <b>About:</b> Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </Blockquote>
              <figcaption className="mt-6 mb-3 flex items-center space-x-3">
                <Avatar
                  rounded
                  size="xs"
                  img={UserImage}
                  alt="profile picture"
                />
                <div className="flex items-center gap-10">
                  <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                    {advertisement?.seller?.first_name +
                      " " +
                      advertisement?.seller?.first_name}
                  </cite>

                  <div className="flex flex-wrap gap-2">
                    {/* <Button color="light">Contact</Button>
                    <Button color="light">Chat</Button> */}
                    <Button color="light">Request Viewing</Button>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      )}

      <HouseOwnerFooter />
    </>
  );
}

export default PropertyDetails;
