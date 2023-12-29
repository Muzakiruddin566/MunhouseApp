import React from "react";

function HouseOwnerFooter() {
  const footerStyle = {
    color: "#fff",
    padding: "1rem 0",
    position: "relative",
  };

  return (
    <footer className="bg-blue-950" style={footerStyle}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved @MUNHouse</p>
      </div>
    </footer>
  );
}

export default HouseOwnerFooter;

