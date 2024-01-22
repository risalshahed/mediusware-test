import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import AllCountries from './components/AllCountries';
import USCountries from './components/USCountries';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/" Component={Menu}>
          <Route path="problem-1" Component={Problem1} />
          <Route path="problem-2" Component={Problem2}>
            <Route path="all-contacts" Component={AllCountries} />
            <Route path="us-contacts" Component={USCountries} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;




