import React from "react";
import Base from "../components/Base";
import cafeImg from "../assets/Cafe-Image.svg";

const Home = () => {
  return (
    <Base home={true}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "93vh",
          backgroundColor: "#d5daf2",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#abb6e5",
            padding: "80px",
          }}
        >
          <p className="smalltxt">BECAFE-</p>
          <p className="heading">Welcome to</p>
          <p className="heading">our cafe</p>
          <p className="text">
            {" "}
            Step inside and be greeted by the inviting aroma of freshly brewed
            beans, dancing in harmony with the sweet notes of our artisanal
            pastries.
          </p>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="days">WE ARE OPEN</p>
              <p className="nextday">7 DAYS A WEEK</p>
            </div>
            <p className="time">8AM - 9PM</p>
          </div>
        </div>
        <div>
          <img
            src={cafeImg}
            alt=""
            style={{ width: "600px", marginTop: "100px" }}
          />
        </div>
      </div>
    </Base>
  );
};

export default Home;
