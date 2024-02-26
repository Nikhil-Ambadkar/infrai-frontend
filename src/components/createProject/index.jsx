import React, { useEffect, useState } from "react";
import Sidebar from "../shared/sidebar";
import ProjectDetails from "./projectDetails"
import ProjectContractors from "./projectContractors";
import ProjectMap from "./projectMap";
import ProjectLocation from "./projectLocation";
import ScreenTypes from "../shared/enum"

function CreateProject() {
    const [activeComponent, setActiveComponent] = useState(ScreenTypes.ProjectDetails);
    const [projectMap, setProjectMap] = useState(null);
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
        console.log("data", data);
        console.log("project", project);
        setProject({ ...project, ...data })
    }

    useEffect(() => {
        console.log("useEffect project", project);
    }, [project])

    const addProjectFiles = (files, componentId) => {
        console.log("addProjectFiles function called", files);
        console.log("componentId", componentId);
        console.log("projectMap...", projectMap);

        //Below we are adding condition by which as user added file it will render on page
        if (componentId == 3) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProjectMap(reader.result);
            };
            if (file) {
                // Read the file as data URL
                reader.readAsDataURL(file);
            }
        }
    }

    const changeActiveComponent = (componentName) => {
        setActiveComponent(componentName)
    }


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
                            return <ProjectLocation props={{ "project": project, "addProjectDetails": addProjectDetails }} />
                        case 3:
                            return <ProjectMap props={{ "project": project, "addProjectFiles": addProjectFiles, "projectMap": projectMap, "componentId": 3 }} />
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