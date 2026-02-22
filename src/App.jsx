import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import HowItsMade from "./pages/HowItsMade";
import Gift from "./pages/Gift";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/how-its-made" element={<HowItsMade />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
