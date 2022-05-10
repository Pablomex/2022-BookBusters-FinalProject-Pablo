import payloadDecode from "../utils/payloadDecode";
import axios from "./axios";

export const connectUser = (login, password, setErrMsg, handleLoginSuccess) => {
  axios
    .post("/v1/login", {
      login,
      password,
    })
    .then(({ data }) => {
      handleLoginSuccess(data.token, data.user);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.message);
        setErrMsg((error.response.data.message = "Login ou mot de passe incorrect"));
      } else {
        setErrMsg("Une erreur s'est produite");
      }
    });
};

export const usersAroundMe = (setpositionUser, latitude, longitude, setisLoading) => {
  // permet de recuperer les user a coter de nous sur la map
  //console.log(latitude, longitude);
  setisLoading(true);
  axios
    .post("/v1/book/around-me", {
      location: `(${latitude},${longitude})`,
      radius: "2000",
    })
    .then((response) => setpositionUser(response.data))
    .finally(() => setisLoading(false))
    .catch((error) => {
      console.log(error);
    });
};

export const latestAddition = (setData, setisLoading) => {
  setisLoading(true);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  axios
    .get("/v1/book", config)
    .then((res) => setData(res.data))
    .finally(() => setisLoading(false));
};

export const registerUser = (
  postalCode,
  communeCode,
  username,
  email,
  password,
  handleRegisterSuccess,
  setErrorAlert,
  ) => {
  axios
    .post("/v1/user", {
      username,
      email,
      password,
      postalCode,
      communeCode,
      // mail_donation: true,
      // mail_alert: true,
      avatar_id: "1",
    })
    .then(() => {
      handleRegisterSuccess();
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorAlert(error.response.data.message);
      } else {
        setErrorAlert("Une erreur est survenue lors de l'inscription.");
        console.error(error);
      }
    });
};

export async function searchBooks(search, limit = 10, start = 0) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseSearchResult = await axios.get(`/v1/book/search?q=${search}&limit=${limit}&start=${start}`, config);
    // console.log(responseSearchResult);
    return responseSearchResult;
  } catch (error) {
    console.log("Nous n'avons pas trouvé de résultats");

    console.log(error);
  }
}

export async function searchBookByISBN(isbn) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseResult = await axios.get(`/v1/book/isbn/${isbn}`, config);
    console.log(responseResult);
    return responseResult;
  } catch (error) {
    console.log(error);
  }
}

export async function favoritesBooks(setData, setisLoading) {
  setisLoading(true);
  try {
    const payload = payloadDecode();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseFavoritesBooks = await axios
      .get(`/v1/user/${payload.userId}/favorite`, config)
      .then((res) => setData(res.data))
      .finally(() => setisLoading(false));
    return responseFavoritesBooks;
  } catch (error) {
    console.log(error);
  }
}

export async function libraryBooks(setLibrary, setisLoading) {
  setisLoading(true);
  try {
    console.log("libraryBooks");
    const payload = payloadDecode();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseLibraryBooks = await axios
      .get(`/v1/user/${payload.userId}/library`, config)
      .then((res) => setLibrary(res.data))
      .finally(() => setisLoading(false));
    return responseLibraryBooks;
  } catch (error) {
    console.log(error);
  }
}

export async function myAlertsBooks(setAlert, setisLoading) {
  setisLoading(true);
  try {
    const payload = payloadDecode();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseMyAlertsBooks = await axios
      .get(`/v1/user/${payload.userId}/alert`, config)
      .then((res) => setAlert(res.data))
      .finally(() => setisLoading(false));
    return responseMyAlertsBooks;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBookStatus(bookStatus) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    
    const bookStatusResponse = await axios.post(
      "/v1/book",
      {
        "isbn13": bookStatus.isbn13,
        "isbn10": bookStatus.isbn10,
        "is_in_library": bookStatus.library,
        "is_in_donation": bookStatus.donation,
        "is_in_favorite": bookStatus.favorit,
        "is_in_alert": bookStatus.alert
      },
      config
    );
    console.log('Retour de la BDD',bookStatusResponse);

    return bookStatusResponse;
  } catch (error) {
    return false;
    // console.log(error);
  }
}

export const contactDonor = (user_email, user_fullname, donor_email, book_title, message) => {
  console.log(user_email, user_fullname, donor_email, book_title, message);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  axios
    .post("/v1/user/contact", { user_email, user_fullname, donor_email, book_title, message }, config)
    .then(({ data }) => {
      console.log(data);
      // handleLoginSuccess(data.token, data.user);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
      }
    });
};

export const getUserInfo = (setUserInfo) => {
  const payload = payloadDecode();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  axios.get(`/v1/user/${payload.userId}`, config).then((response) => {
    setUserInfo(response.data);
  });
};

export const fetchApi = {
  connectUser,
  registerUser,
  searchBooks,
  usersAroundMe,
  updateBookStatus,
  contactDonor,
  getUserInfo,
};

export default fetchApi;

//localStorage.getItem('jwt')
