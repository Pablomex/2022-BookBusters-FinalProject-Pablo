import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  favoritesBooks,
  libraryBooks,
  myAlertsBooks,
} from "../../api/fetchApi";
import BookDetailModal from "../BookDetailModal/BookDetailModal";
import BookDisplayModel from "../BookDisplayModel/BookDisplayModel";
import Spinner from "../Spinner/Spinner";

const BookDisplay = () => {
  const [data, setData] = useState([]);
  const [library, setLibrary] = useState([]);
  const [alert, setAlert] = useState([]);

  const [isLoadingFavorit, setisLoadingFavorit] = useState(true);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true);
  const [isLoadingAlert, setIsLoadingAlert] = useState(true);

  useEffect(() => {
    libraryBooks(setLibrary, setIsLoadingLibrary);
    favoritesBooks(setData, setisLoadingFavorit);
    myAlertsBooks(setAlert, setIsLoadingAlert);
  }, []);

  const location = useLocation();

  function isLoading() {
    return isLoadingFavorit || isLoadingLibrary || isLoadingAlert;
  }

  let listName;

  function locationMap() {
    switch (location.pathname) {
      case "/Favorites":
        listName = "liste de favoris";
        return data;
      case "/Library":
        listName = "bibliothèque";
        return library;
      case "/MyAlerts":
        listName = "liste de d'alertes";
        return alert;
      default:
        return null;
    }
  }

  function attenteReceptionDonnees() {
    if (locationMap().length < 1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {" "}
      <Box
        className="containerMapLivre"
        component="div"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          width: { md: "70%" },
          margin: "auto",
          textAlign: "center",
        }}
      >
        {!isLoading() ? (
          <>
            {attenteReceptionDonnees() &&
              locationMap().books.map((data, index) => (
                <BookDisplayModel key={index} data={data} />
              ))}
            {!attenteReceptionDonnees() &&
              "Vous n'avez encore aucun livre dans votre " + listName + "."}
          </>
        ) : (
          <Spinner />
        )}
      </Box>
      <BookDetailModal />
    </>
  );
};

export default BookDisplay;
