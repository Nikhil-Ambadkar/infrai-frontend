import React, { useState } from "react";
import { CreateProjectScreenTypes } from "../../shared/enums/screenTypeEnum";
import Sidebar from "../../shared/sharedComponents/sidebar";
import ProjectContractors from "./projectContractors";
import ProjectDetails from "./projectDetails";
import ProjectLocation from "./projectLocation";
import ProjectMap from "./projectMap";

function CreateProject() {
  const [activeComponent, setActiveComponent] = useState(
    CreateProjectScreenTypes.Details
  );
  // const [projectMap, setProjectMap] = useState(null);
  const [project, setProject] = useState({
    clientId: null,
    internalReference: "",
    externalReference: "",
    projectTitle: null,
    projectReference: null,
    description: null,
    startDate: new Date(),
    endDate: new Date(),
    productOwnerId: null,
    haveSubprojects: false,
    projectLocation: null,
    lat: null,
    lng: null,
    areaType: null,
    areaLatLng: null,
    boundry: null,
    boundryUnit: null,
    projectMap: null,
  });

  const addProjectDetails = (data) => {
    setProject({ ...project, ...data });
  };

  const changeActiveComponent = (componentName) => {
    // Check if the checkbox is checked
    if (project.haveSubprojects === false) {
      alert("Please check the checkbox for project validation");
    } else {
      setActiveComponent(componentName);
    }
  };

  const submitProject = () => {
    // console.log("Project Submitted!", project);
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
              <li className="breadcrumb-item active">Create New project</li>
            </ol>
          </nav>
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-md-12">
              <h3 className="page-title">Project configuration</h3>
              <div className="tab-container my-4 mx-0">
                {Object.keys(CreateProjectScreenTypes).map((key) => (
                  <button
                    key={CreateProjectScreenTypes[key]}
                    type="button"
                    className={`btn btn-default ${
                      activeComponent === CreateProjectScreenTypes[key]
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      changeActiveComponent(CreateProjectScreenTypes[key])
                    }
                    
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {(() => {
          switch (activeComponent) {
            case CreateProjectScreenTypes.Details:
              return (
                <ProjectDetails
                  props={{
                    project: project,
                    addProjectDetails: addProjectDetails,
                    changeActiveComponent: changeActiveComponent,
                  }}
                />
              );
            case CreateProjectScreenTypes.Location:
              return (
                <ProjectLocation
                  props={{
                    project: project,
                    addProjectDetails: addProjectDetails,
                    changeActiveComponent: changeActiveComponent,
                  }}
                />
              );
            case CreateProjectScreenTypes.Location:
              return (
                <ProjectMap
                  props={{
                    project: project,
                    addProjectDetails: addProjectDetails,
                    changeActiveComponent: changeActiveComponent,
                  }}
                />
              );
            case CreateProjectScreenTypes.SubContractors:
              return <ProjectContractors />;
            default:
              return null;
          }
        })()}
      </main>
    </>
  );
}

export default CreateProject;
