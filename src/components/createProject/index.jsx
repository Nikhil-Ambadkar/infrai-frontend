import React, { useState } from "react";
import Sidebar from "../shared/sidebar";
import ProjectDetails from "./projectDetails"
import ProjectContractors from "./projectContractors";
import ProjectMap from "./projectMap";
import ProjectLocation from "./projectLocation";
import ScreenTypes from "../shared/enum"

function CreateProject() {
    const [activeComponent, setActiveComponent] = useState(ScreenTypes.ProjectDetails);
    const [project, setProject] = useState({
        clientId: null,
        internalReference: "nikhil",
        externalReference: "nikhil",
        projectTitle: null,
        projectReference: null,
        description: null,
        startDate: new Date(),
        endDate: new Date(),
        productOwnerId: null,
        haveSubprojects: null,
        projectLocation: null,
        lat: null,
        lng: null,
        areaType: null,
        areaLatLng: null,
        boundry: null,
        boundryUnit: null,
        projectMap: null
    })
    const addProjectDetails = (data) => {
        alert();
        console.log("data", data);
    }

    const addProjectFiles = (files) => {
        console.log("addProjectFiles function called", files);
    }

    const changeActiveComponent = (componentName) => {
        setActiveComponent(componentName)
    }

    console.log("ScreenTypes", ScreenTypes);
    console.log("activeComponent", activeComponent);
    return (
        <>
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Projects </a>
                            </li>
                            <li className="breadcrumb-item active">New project</li>
                        </ol>
                    </nav>
                </div>
                <div className='page-content'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className='page-title'>Project configuration</h3>
                            <div className='tab-container my-4 mx-0'>
                                <button type='button' className={`btn btn-default ${activeComponent == 1 ? ` active` : null} `} onClick={() => changeActiveComponent(1)}>Details</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 2 ? ` active` : null} `} onClick={() => changeActiveComponent(2)}>Location</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 3 ? ` active` : null} `} onClick={() => changeActiveComponent(3)}>Map</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 4 ? ` active` : null} `} onClick={() => changeActiveComponent(4)}>Contractors</button>
                            </div>
                        </div>
                    </div>
                </div>
                {(() => {
                    switch (activeComponent) {
                        case 1:
                            return <ProjectDetails props={{ "project": project, "addProjectDetails": addProjectDetails, "addProjectFiles": addProjectFiles }} />
                        case 2:
                            return <ProjectLocation />
                        case 3:
                            return <ProjectMap />
                        case 4:
                            return <ProjectContractors />
                        default:
                            return null
                    }
                })()}

            </main>
        </>
    )
}

export default CreateProject;