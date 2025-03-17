import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StopsPage from "./pages/StopsPage";
import RoutesPage from "./pages/RoutesPage";
import PricelistsPage from "./pages/PricelistsPage";
import PricesPage from "./pages/PricesPage";
import ToursPage from "./pages/ToursPage";
import PassengersPage from "./pages/PassengersPage";
import TicketsPage from "./pages/TicketsPage";
import AvailablePage from "./pages/AvailablePage";
import SeatsPage from "./pages/SeatsPage";
import './App.css'; 

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/stops">Stops</Link></li>
          <li><Link to="/routes">Routes</Link></li>
          <li><Link to="/pricelists">Pricelists</Link></li>
          <li><Link to="/prices">Prices</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          <li><Link to="/passengers">Passengers</Link></li>
          <li><Link to="/tickets">Tickets</Link></li>
          <li><Link to="/available">Available</Link></li>
          <li><Link to="/seats">Seats</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/stops" element={<StopsPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/pricelists" element={<PricelistsPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/available" element={<AvailablePage />} />
        <Route path="/seats" element={<SeatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

