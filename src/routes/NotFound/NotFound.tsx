import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div>
      Page not found
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export { NotFound as default };
