//import { useState, useEffect } from "react";
import Home from "./pages/Home";
//import Siteloader from "./components/site_components/Siteloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/site_components/Layout";
import Examples from "./pages/Examples";
import CountryDB from "./pages/CountryDB";
import "./styles/style.css";
function App() {
  // loader statefunction App({ value = 0 }) {
  /*const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(value);
   useEffect(() => {
    if (percent < 100) {
      const timer = setTimeout(() => {
        setPercent((prev) => prev + 1);
      }, 500); // Adjust the interval as needed for smoother progress
      return () => clearTimeout(timer); // Cleanup timeout
    } else {
      // Simulate data loading once progress reaches 100
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust the loading delay if needed
      return () => clearTimeout(loadTimer); // Cleanup loading timeout
    }
  }, [percent]);
  // Let create async method to fetch fake data
  useEffect(() => {}, []);
  //return <Siteloader progress={percent} />;
  return isLoading ? <Siteloader progress={percent} /> : <Home />;*/

  return (
    <Router>
      <Routes>
        {/* Wrap pages with the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Examples" element={<Examples />} />
          <Route path="/CountryDB" element={<CountryDB />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
