import React, { useState } from "react";
import Sidebar from "../sidebar";
import ProjectDetails from "./projectDetails"
import ProjectContractors from "./projectContractors";
import ProjectMap from "./projectMap";
import ProjectLocation from "./projectLocation";

function CreateProject() {
    const [activeComponent, setActiveComponent] = useState('projectDetails');
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
    const addProjectDetails = () => {

    }

    const changeActiveComponent = (componentName) => {
        setActiveComponent(componentName)
    }
    return (
        <>
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    {/* <h1>Dashboard</h1> */}
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
                                <button type='button' className={`btn btn-default ${activeComponent == 'projectDetails' ? ` active` : null} `} onClick={() => changeActiveComponent('projectDetails')}>Details</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 'projectLocation' ? ` active` : null} `} onClick={() => changeActiveComponent('projectLocation')}>Location</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 'projectMap' ? ` active` : null} `} onClick={() => changeActiveComponent('projectMap')}>Map</button>
                                <button type='button' className={`btn btn-default ${activeComponent == 'projectContractors' ? ` active` : null} `} onClick={() => changeActiveComponent('projectContractors')}>Contractors</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    activeComponent == 'projectDetails' ?
                        <ProjectDetails props={{ "project": project, "addProjectDetails": addProjectDetails }} />
                        : activeComponent == 'projectLocation' ?
                            <ProjectLocation />
                            : activeComponent == 'projectMap' ?
                                <ProjectMap />
                                : activeComponent == 'projectContractors' ?
                                    <ProjectContractors />
                                    : <ProjectDetails />

                }


            </main>
        </>
    )
}

export default CreateProject;