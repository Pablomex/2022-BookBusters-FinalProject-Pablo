import * as React from "react";

import "../styles/Home.scss";

import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import Books from "../components/Books/Books";
import WelcomeBox from "../components/WelcomeBox/WelcomeBox";
import Buttons from "../components/Button/Button";

const Home = () => {
  return (
    <>
      <Header />
      <WelcomeBox />
      <Buttons />
      <Books />
      <SignButtons />
    </>
  );
};

export default Home;
