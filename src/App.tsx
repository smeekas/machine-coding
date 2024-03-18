import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GreenLight from "./pages/GreenLights/GreenLight";
import Home from "./pages/Home/Home";
import Progress from "./pages/Progress/ProgressPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="green-light" element={<GreenLight />} />
          <Route path="progress" element={<Progress />} />
          <Route index path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
