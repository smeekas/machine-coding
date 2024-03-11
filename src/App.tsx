import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GreenLight from "./pages/GreenLights/GreenLight";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="green-light" element={<GreenLight />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
