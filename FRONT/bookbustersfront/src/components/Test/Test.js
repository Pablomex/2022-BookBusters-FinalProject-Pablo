import React, { useContext } from "react";
import userContext from "../contexts/UserContext";

function Test() {
  const { SetUserContext } = useContext(userContext);

  return <div>Test</div>;
}

export default Test;
