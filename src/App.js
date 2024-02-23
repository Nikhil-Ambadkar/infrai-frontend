import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateProject from "./components/createProject/index"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          {/* <Route path="add-project" element={<CreateProject />} /> */}
          <Route path="/" element={<CreateProject />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
