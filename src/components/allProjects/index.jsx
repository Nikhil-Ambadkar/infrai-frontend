import React, { useState } from "react";
import Sidebar from "../../shared/sharedComponents/sidebar";
import { AllProjectsScreenTypes } from "../../shared/enums/screenTypeEnum";
import ProjectInfo from "../allProjects/ProjectInfo";

const AllProjects = () => {
  const [activeComponent, setActiveComponent] = useState(AllProjectsScreenTypes.Details);
  const changeActiveComponent = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <>
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Projects </a>
              </li>
              <li className="breadcrumb-item active">All Projects</li>
            </ol>
          </nav>
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-md-12">
              <h3 className="page-title">Project Details</h3>
              <div className="tab-container my-4 mx-0">
                {Object.keys(AllProjectsScreenTypes).map((key) => (
                  <button
                    key={AllProjectsScreenTypes[key]}
                    type="button"
                    className={`btn btn-default ${
                      activeComponent === AllProjectsScreenTypes[key]
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      changeActiveComponent(AllProjectsScreenTypes[key])
                    }
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <>
        {(() => {
          switch (activeComponent) {
            case AllProjectsScreenTypes.Details:
              return <ProjectInfo />;
            default:
              return null;
          }
        })()}
        </>
      </main>
    </>
  );
};

export default AllProjects;
