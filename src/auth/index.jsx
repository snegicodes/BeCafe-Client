//isLoggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data) {
    return true;
  } else {
    return false;
  }
};

//doLogin => data=>set to local storage

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout => remove from local storage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data"));
    // const tokenObj  = JSON.parse(localStorage.getItem("data"));
    // const decoded = jwt_decode(tokenObj?.token)
    // console.log("decoded: ", decoded);
    // return decoded;
  } else {
    return undefined;
  }
};
