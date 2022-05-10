import React, { createContext, useState } from "react";

const bookContext = createContext();

export function BookProvider({ children }) {
  const [openedBook, setOpenedBook] = useState(null);
  const book = {
    openedBook,
    setOpenedBook,
  };
  return <bookContext.Provider value={book}>{children}</bookContext.Provider>;
}

export default bookContext;
