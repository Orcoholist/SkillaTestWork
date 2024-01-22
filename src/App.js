import { useEffect } from "react";
import "./App.css";
import CallsList from "./components/callsList/CallList";



function App() {
  return (
    <div className="app">
      <div className="app__container">        
        <CallsList />       
      </div>
    </div>
  );
}

export default App;
