import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Impressum from "./pages/Impressum"; // Neu
import Datenschutz from "./pages/Datenschutz"; // Neu
import Header from "./components/Header";
import Footer from "./components/Footer"; // Footer hinzugefügt

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
