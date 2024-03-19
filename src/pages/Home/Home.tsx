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
        <li>
          <Link to="/traffic">Traffic Lights</Link>
        </li>
        <li>
          <Link to="/tag">Tag User</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
