import "./App.css";
import Home from "./Components/Home";
import { GlobalStorage } from "./Helps/GlobalContext";



function App() {
  return (
    <div className="App">
      <GlobalStorage>
        <Home />
      </GlobalStorage>
    </div>
  );
}

export default App;
