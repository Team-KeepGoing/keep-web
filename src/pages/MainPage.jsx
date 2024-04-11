import React from "react";
import bar from "assets/img/bar.svg";
import "styles/MainStyle.css";
const MainPage = () => {
  return (
    <div className="background">
      <img className="buttonBar" src={bar} alt="button bar" />
    </div>
  );
};

export default MainPage;
