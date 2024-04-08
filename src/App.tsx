import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GreenLight from "./pages/GreenLights/GreenLight";
import Home from "./pages/Home/Home";
import Progress from "./pages/Progress/ProgressPage";
import TrafficLightsPage from "./pages/TrafficLights/TrafficLightsPage";
import TagUserPage from "./pages/TagUser/TagUserPage";
import PollPage from "./pages/Poll/PollPage";
import MultiSelectPage from "./pages/MultiSelect/MultiSelectPage";
import SelectableGridPage from "./pages/SelectableGrid/SelectableGridPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="green-light" element={<GreenLight />} />
          <Route path="progress" element={<Progress />} />
          <Route path="traffic" element={<TrafficLightsPage />} />
          <Route path="tag" element={<TagUserPage />} />
          <Route path="poll" element={<PollPage />} />
          <Route path="multi-select" element={<MultiSelectPage />} />
          <Route path="selectable-grid" element={<SelectableGridPage />} />

          <Route index path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
