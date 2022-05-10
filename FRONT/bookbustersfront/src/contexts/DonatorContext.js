import React, { createContext, useState } from "react";

const donatorContext = createContext();

export function DonatorProvider({ children }) {
  const [donatorInfo, setDonatorInfo] = useState(null);

  return (
    <donatorContext.Provider value={{ donatorInfo, setDonatorInfo }}>
      {children}
    </donatorContext.Provider>
  );
}

export default donatorContext;
