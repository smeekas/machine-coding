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
import ImageSliderPage from "./pages/ImageSlider/ImageSliderPage";
import ImagePreviewPage from "./pages/ImagePreview/ImagePreviewPage";
import AccordionPage from "./pages/Accordion/AccordionPage";
import TooltipPage from "./pages/Tooltip/TooltipPage";
import TabsPage from "./pages/Tabs/TabsPage";
import ModalPage from "./pages/Modal/ModalPage";
import PaginationPage from "./pages/Pagination/PaginationPage";
import FileExplorerPage from "./pages/FileExplorer/FileExplorerPage";
import WalkthroughPage from "./pages/Walkthrough/WalkthroughPage";

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
          <Route path="image-slider" element={<ImageSliderPage />} />
          <Route path="image-preview" element={<ImagePreviewPage />} />
          <Route path="accordion" element={<AccordionPage />} />
          <Route path="tooltip" element={<TooltipPage />} />
          <Route path="tabs" element={<TabsPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="pagination" element={<PaginationPage />} />
          <Route path="file" element={<FileExplorerPage />} />
          <Route path="walkthrough" element={<WalkthroughPage />} />
          <Route index path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
