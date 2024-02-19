import React from "react";
import Sidebar from "../sidebar";
import ProjectDetails from "./projectDetails"
// import BreadcrumbBs from "./BreadcrumbBs"
import { Breadcrumb } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

function CreateProject() {
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
                                <button type='button' className='btn btn-default active'>Details</button>
                                <button type='button' className='btn btn-default'>Location</button>
                                <button type='button' className='btn btn-default'>Map</button>
                                <button type='button' className='btn btn-default'>Contractors</button>
                            </div>
                        </div>
                    </div>
                </div>

                <ProjectDetails />

            </main>
        </>
    )
}

export default CreateProject;