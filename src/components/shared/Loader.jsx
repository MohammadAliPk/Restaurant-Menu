import React from "react";

// // Gif
import spinner from "../../gif/loading.gif";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "10",
        background: "#343434",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={spinner} alt="Loading" />
    </div>
  );
};

export default Loader;
