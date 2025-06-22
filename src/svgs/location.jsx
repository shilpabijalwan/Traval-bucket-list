import React from "react";

function Location({ color = "green" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 fill-current"
         style={{ color }}
      viewBox="0 0 24 24"
    >
      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export default Location;