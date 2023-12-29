import axios from "axios";
import { getToken } from "./auth";

const apiURL = process.env.REACT_APP_API_URL;
const authToken = getToken();

const login = async (credentials) => {
  const url = `${apiURL}/login`;

  try {
    const response = await axios.post(url, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    // throw error;
  }
};

const signup = async (userData) => {
  const url = `${apiURL}/signup`;

  try {
    const response = await axios.post(url, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

const postAdvertisement = async (payload) => {
  const url = `${apiURL}/house`;

  try {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key === "houseImages") {
        payload[key]
          .filter((image) => image !== null)
          .forEach((image, index) => {
            formData.append(`houseImages`, image);
          });
      } else {
        formData.append(key, payload[key]);
      }
    });

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting advertisement in:", error);
    throw error;
  }
};


const updateUser = async (payload, id) => {
  const url = `${apiURL}/user/${id}`;

  try {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      // if (key === "profile_image") {
      //   payload[key]
      //     .forEach((image, index) => {
      //       formData.append(`profile_image`, image);
      //     });
      // } else {
        formData.append(key, payload[key]);
      // }
    });

    const response = await axios.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting advertisement in:", error);
    throw error;
  }
};


const getAdvertisement = async (filter) => {
  const filterParams = Object.entries(filter)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const url = `${apiURL}/house?${filterParams}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting advertisement in:", error);
    throw error;
  }
};

const getAdvertisementById = async (id) => {
  const url = `${apiURL}/house/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting advertisement in:", error);
    throw error;
  }
};


const getUserById = async (id) => {
  const url = `${apiURL}/user/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting advertisement in:", error);
    throw error;
  }
};

const deleteAdvertisement = async (id) => {
  const url = `${apiURL}/house/${id}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting advertisement in:", error);
    throw error;
  }
};




const updateAdvertisement = async (payload, id) => {
  const url = `${apiURL}/house/${id}`;

  try {
    console.log({authToken, payload}); 
    const response = await axios.patch(url, payload, {
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating advertisement in:", error);
    throw error;
  }
};

export {
  login,
  signup,
  postAdvertisement,
  getAdvertisement,
  deleteAdvertisement,
  updateAdvertisement,
  getAdvertisementById,
  updateUser
};
