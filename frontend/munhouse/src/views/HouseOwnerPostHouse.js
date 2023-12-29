import React, { useEffect, useState } from "react";
import Navigation from "../components/HouseOwnerMenu";
import Footer from "../components/HouseOwnerFooter";
import ReactQuill from "react-quill"; //used for adding rich textbox for property description
import "react-quill/dist/quill.snow.css";
import { getAdvertisementById, postAdvertisement, updateAdvertisement } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser } from "../utils/auth";

function HouseOwnerPostHouse() {
  const [seller, setSeller] = useState({});
  const [update, setUpdate] = useState(false);
  const {id} = useParams(); 
  const [houseData, setHouseData] = useState({
    propertyType: "House",
    no_of_bedrooms: "",
    no_of_washrooms: "",
    address: "",
    postal_code: "",
    area: "",
    price: "",
    contact: "",
  });
  //function for page background
  const backgroundImageUrl = "banner2.jpg";
  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const navigate = useNavigate();
  //property image Upload
  const [selectedImages, setSelectedImages] = useState(Array(5).fill(null));
  const handleImageChange = (event, columnIndex) => {
    const files = event.target.files;
    // Assuming only one file is selected for each input
    if (files.length > 0) {
      const newImages = [...selectedImages];
      newImages[columnIndex] = files[0];
      setSelectedImages(newImages);
    }
  };
  const handleRemoveImage = (columnIndex) => {
    const newImages = [...selectedImages];
    newImages[columnIndex] = null;
    setSelectedImages(newImages);
  };

  //for description rich text
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const postProperty = async (e) => {
    const payload = { ...houseData };
    payload.seller = seller._id;
    payload.description = description;
    payload.houseImages = selectedImages;
    delete payload.propertyType;

    const response = await postAdvertisement(payload);
    if (response.error) {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success("Property added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/seller");
    }
  };


  const updatePostProperty = async(e) => {
    const  {_id, propertyType, ...args} = houseData;
    try {
      const updateAdvertisementItem = updateAdvertisement(args, _id);
      console.log({updateAdvertisementItem}); 
      navigate("/seller");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.statusText, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setSeller(loggedInUser);
    }
  }, []);

  const getAdvertisementByIds = async () => {
    try {
      const advertisement = await getAdvertisementById(id);
      if (advertisement) {
        setUpdate(true);
        setHouseData({
          address: advertisement?.address,
          area : advertisement?.area,
          contact : advertisement?.seller?.contact,
          no_of_bedrooms :advertisement?.no_of_bedrooms,
          no_of_washrooms : advertisement?.no_of_washrooms,
          postal_code : advertisement?.postal_code,
          price : advertisement?.price,
          propertyType : advertisement?.propertyType,
          _id : advertisement?._id
        });
        setDescription(advertisement?.description);
        console.log({advertisement});
      }
    }
    catch(error){
      console.log(error);
      toast.error(error?.response?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  useEffect(()=>{
    if(id){
      getAdvertisementByIds(id);
      console.log({id});
    }
  }, [id])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div
        className="min-h-screen flex justify-center"
        style={{ ...containerStyle }}
      >
        <div className="w-full md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center">
              <h2 className="text-lg font-bold text-gray-700 mb-2">
                Post Property
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Seller Name
              </label>
              <input
                id="sellerName"
                name="sellerName"
                value={`${seller.first_name} ${seller.last_name}`}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Seller's name here"
                readOnly
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Property Type
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  id="propertyType"
                  value={houseData.propertyType}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>House</option>
                  {/* <option>Apartment</option>
                <option>Room</option>
                <option>Land</option>
                <option>Commercial Building</option> */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Bed-Rooms
              </label>
              <div className="relative">
                <select
                  name="no_of_bedrooms"
                  id="no_of_bedrooms"
                  value={houseData.no_of_bedrooms}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>10+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Bathrooms
              </label>
              <div className="relative">
                <select
                  name="no_of_washrooms"
                  id="no_of_washrooms"
                  value={houseData.no_of_washrooms}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>5+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <input
                name="address"
                id="address"
                value={houseData.address}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Eg: 29, Kings Road"
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Postal Code
              </label>
              <input
                name="postal_code"
                id="postal_code"
                value={houseData.postal_code}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Eg: AIC3K3"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Area Size (sqft)
              </label>
              <input
                name="area"
                id="area"
                value={houseData.area}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="Eg: 2500"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Location Latitude
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="latitude"
                type="number"
                placeholder="Eg: 40.7128"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Longitude
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="longitude"
                type="number"
                placeholder="Eg: 74.0060"
              />
            </div>
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Amenities
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="amenities"
                type="text"
                placeholder="Eg: Washer and Dryer, Parking, Near MUN..."
              />
            </div>
          </div> */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Property Description
              </label>
              <ReactQuill
                id={description}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="More data about the property can attract the best target audience."
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction
                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],
                    ["clean"], // remove formatting button
                  ],
                }}
              />
            </div>
          </div>

         {!update && <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full overflow-x-auto px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Property Images
              </label>
              <table className="min-w-full">
                <tbody>
                  <tr>
                    {/* File Upload Buttons */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <td key={index}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageChange(event, index)}
                          className="hidden"
                          id={`fileUpload${index}`}
                        />
                        <label
                          htmlFor={`fileUpload${index}`}
                          className="block bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 cursor-pointer text-center"
                        >
                          Upload Image {index + 1}
                        </label>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {/* Image Previews */}
                    {selectedImages.map((image, index) => (
                      <td key={index}>
                        {image && (
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="max-w-full h-auto rounded"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Price (CAD)
              </label>
              <input
                name="price"
                id="price"
                value={houseData.price}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="Eg: 50000"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contact No
              </label>
              <input
                name="contact"
                id="contact"
                value={houseData.contact}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="Eg: 7092222222"
              />
            </div>
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contact No 2
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="contact2"
                type="number"
                placeholder="Eg: 709222222"
              />
            </div>
            <div className="w-full md:w-1/3  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contact No 3
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="contact3"
                type="number"
                placeholder="Eg: 709222222"
              />
            </div>
          </div> */}
          {!update ? <div className="flex flex-wrap justify-center">
            <div className="w-full text-center">
              <button
                className="bg-blue-950 text-white rounded-lg px-6 py-3 mt-4 text-xl font-semibold hover:bg-blue-900"
                onClick={() => {
                  postProperty();
                }}
              >
                Post Advertisement
              </button>
            </div>
          </div> : 
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center">
              <button
                className="bg-blue-950 text-white rounded-lg px-6 py-3 mt-4 text-xl font-semibold hover:bg-blue-900"
                onClick={() => {
                  updatePostProperty();
                }}
              >
                Update Advertisement
              </button>
            </div>
          </div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HouseOwnerPostHouse;
