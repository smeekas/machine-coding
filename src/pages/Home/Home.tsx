import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Home
      <ul>
        <li>
          <Link to="/green-light">Green Lights</Link>
        </li>
        <li>
          <Link to="/progress">Progess</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
