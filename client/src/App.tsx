import React from "react";
import { AppRouter as Router } from "./routes";
const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router />
    </div>
  );
};

export default App;
