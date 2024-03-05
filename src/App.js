import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateProject from "./components/createProject/index";
import CreateNewProject from './components/Createnewproject';
import SubProject from "./components/SubProject/index";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="add-project" element={<CreateProject />} />
          <Route path="create-new-project" element={<CreateNewProject />} />
          <Route path='sub-project' element={<SubProject/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
