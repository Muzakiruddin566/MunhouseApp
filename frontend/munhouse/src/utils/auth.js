export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
};

export const isSeller = () => {
  const user = getLoggedInUser();
  console.log({user});
  if (user?.role && user.role === "seller") {
    return true; 
  }else{
    return false;
  }
};


export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("userLoggedIn"))
}


export const getToken = () => {
  return localStorage.getItem("token")
}
