import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";

import Book from "../Book/Book";
import { latestAddition } from "../../api/fetchApi";
import BookDetailModal from "../BookDetailModal/BookDetailModal";
import Spinner from "../Spinner/Spinner";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    latestAddition(setData, setisLoading);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          width: { md: "70%" },
          margin: "auto",
        }}
      >
        {!isLoading ? (
          data.map((book, index) => (
            <Book
              key={`je-suis-unique-${index}`}
              book={book}
              users={book.donors}
            />
          ))
        ) : (
          <Spinner />
        )}
        <BookDetailModal />
      </Box>
    </>
  );
}

export default Books;
