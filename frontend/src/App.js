import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import VendorPanel from "./VendorPanel";
import Gamification from "./Gamification";
import AIRecommendations from "./AIRecommendations";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/vendor" component={VendorPanel} />
            <Route path="/gamification" component={Gamification} />
            <Route path="/recommendations" component={AIRecommendations} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;