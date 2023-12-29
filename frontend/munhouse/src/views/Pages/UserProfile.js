
import React, { useEffect, useState } from 'react';
import { getLoggedInUser } from '../../utils/auth';
import {updateUser} from "../../utils/api"
function EditUserProfile() {
    const [user, setUser] = useState({
        address: "",
        contact: "",
        email: "",
        first_name: "",
        last_name: "",
        role: "",
    })
  const [selectedFile, setSelectedFile] = useState(null);

   //function for page background
   const backgroundImageUrl = "banner2.jpg";
   const containerStyle = {
     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImageUrl})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
   };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUser({...user, userProfileImage : file})
  };


  const handleOnchange = (e) => {
    setUser({
    ...user, 
    [e.target.name]: e.target.value});
  }

  const handleUpload = async(event) => {
    event.preventDefault();
    console.log("calling", user)
    try {
        const  {_id,role,email, ...args} = user;
        const updateUserData = await updateUser(args, _id);
        console.log({updateUserData})
    } catch (error) {
        console.log({error});
    }
  };

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    console.log({loggedInUser})
  }, [])
  

  return (
  
    <div className="flex flex-col min-h-screen">
      
    <div className="bg-blue-950 min-h-screen flex justify-center" style={{ ...containerStyle }}>
      <form className="w-full md:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 mt-8" action='POST' onSubmit={handleUpload}>
      <div className="flex flex-wrap justify-center">
        <div className="w-full text-center">
          <h2 className="text-lg font-bold text-gray-700 mb-6">Edit Profile</h2>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="firstname"
              name="first_name"
              onChange={handleOnchange}
              placeholder=""
              value={user.first_name}
             
            /></div>
      </div> 

      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastname"
              name="last_name"
              onChange={handleOnchange}
              placeholder=""
              value={user.last_name}
            /></div>
      </div> 

      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password" 
              type="password"
              name= "password"
              placeholder=""
              onChange={handleOnchange}
            //   value={user.password}
            /></div>
      </div> 

      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email ID
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              placeholder=""
              name="email"
              readOnly = {true}
              onChange={handleOnchange}
              value={user.email}
            /></div>
      </div> 
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Address
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              placeholder=""
              name="address"
              onChange={handleOnchange}
              value={user.address}
            /></div>
      </div> 

      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contact Number
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              placeholder=""
              name="contact"
              onChange={handleOnchange}
              value={user.contact}
            /></div>
      </div> 

      <div className="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Profile Image
            </label>
         </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <div>
          <input type="file" onChange={handleFileChange} />
          {/* <button>Upload</button> */}

          {selectedFile && (
            <div>
              <p>Selected File: {selectedFile.name}</p>
            </div>
          )}
    </div>
        </div>
      </div> 
   
   
        <div className="flex flex-wrap justify-center">
        <div className="w-full text-center">
        <button
              className="bg-blue-950 text-white rounded-lg px-6 py-3 mt-4 text-xl font-semibold hover:bg-blue-900"
              onClick={handleUpload}
            >
              Update Profile
            </button> 
        </div>
      </div>
      </form>
    </div>
    </div>
  );
}

export default EditUserProfile;
