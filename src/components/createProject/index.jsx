import React, { useEffect, useState } from "react";
import Sidebar from "../../shared/sharedComponents/sidebar";
import ProjectDetails from "./projectDetails"
import ProjectContractors from "./projectContractors";
import ProjectMap from "./projectMap";
import ProjectLocation from "./projectLocation";
import ScreenTypes from "../../shared/enums/screenTypeEnum"

function CreateProject() {
    console.log("ScreenTypes", ScreenTypes);
    const [activeComponent, setActiveComponent] = useState(ScreenTypes.Details);
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
        setProject({ ...project, ...data })
    }

    const changeActiveComponent = (componentName) => {
        setActiveComponent(componentName)
    }

    const submitProject = () => {
        console.log("Project Submitted!", project);
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
                                {Object.keys(ScreenTypes).map(key => (
                                    <button
                                        key={ScreenTypes[key]}
                                        type="button"
                                        className={`btn btn-default ${activeComponent === ScreenTypes[key] ? 'active' : ''}`}
                                        onClick={() => changeActiveComponent(ScreenTypes[key])}
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
                        case ScreenTypes.Details:
                            return <ProjectDetails props={{ "project": project, "addProjectDetails": addProjectDetails, "changeActiveComponent": changeActiveComponent }} />
                        case ScreenTypes.Location:
                            return <ProjectLocation props={{ "project": project, "addProjectDetails": addProjectDetails, "changeActiveComponent": changeActiveComponent }} />
                        case ScreenTypes.Location:
                            return <ProjectMap props={{ "project": project }} />
                        case ScreenTypes.SubContractors:
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