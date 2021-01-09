// MODULES
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./Module/AppRouter";
import Navbar from "./components/_globals/Navbar";


// ASSETS

// COMPONENNTS


function App() {
  return (
    <>

      <Router>
        <Navbar/>
        <AppRouter/>
      </Router>

    </>
  );
}

export default App;
