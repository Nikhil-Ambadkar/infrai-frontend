import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateProject from "./components/createProject/index"
import AllProjects from "./components/allProjects/index"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="/" element={<CreateProject />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
