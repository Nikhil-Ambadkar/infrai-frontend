import logo from './logo.svg';
import './App.css';
import Sidebar from "./component/sidebar";
import CreateProject from "./component/createProject/index"

function App() {
  return (
    <div className="App">
      <CreateProject />
      {/* <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle"> */}
      {/* <h1>Dashboard</h1> */}
      {/* <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Projects </a>
              </li>
              <li className="breadcrumb-item active">New project</li>
            </ol>
          </nav>
        </div>
      </main> */}

    </div>

  );
}

export default App;
