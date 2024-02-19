import React from "react";
import Sidebar from "../sidebar";
// import BreadcrumbBs from "./BreadcrumbBs"
import { Breadcrumb } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

function CreateProject() {
    return (
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 p-5">
                        <div className="creat-project-breadcrumb" >
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
                                <Breadcrumb.Item href="#" active>
                                    New Projects
                                </Breadcrumb.Item>

                            </Breadcrumb>
                        </div>
                        <div className="col-6 pt-5">
                            <div>
                                <p align="left" className="ml-0">Project configuration</p>
                            </div>
                            <br />
                            <div>
                                <Stack direction="horizontal" gap={2}>
                                    <Badge pill style={{ fontSize: '20px', backgroundColor: '#1B1F41' }}>
                                        Details
                                    </Badge>
                                    <Badge pill style={{ fontSize: '20px', backgroundColor: '#1B1F41' }}>
                                        Location
                                    </Badge>
                                    <Badge pill style={{ fontSize: '20px', backgroundColor: '#1B1F41' }}>
                                        Map
                                    </Badge>
                                    <Badge pill style={{ fontSize: '20px', backgroundColor: '#1B1F41' }}>
                                        Contractors
                                    </Badge>
                                </Stack>
                            </div>
                            <div className="border pt-5 mt-5">
                                <p align="left">Describe the </p>
                                <form className="container mt-4">
                                    <div className="form-group">
                                        <label htmlFor="client">Client</label>
                                        <select
                                            class="form-control"
                                            id="client"
                                            name="client"
                                        >
                                            <option value="">Select Client</option>
                                            <option value="client1">Client 1</option>
                                            <option value="client2">Client 2</option>
                                            <option value="client3">Client 3</option>
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <div className="form-group">
                                            <label htmlFor="internalReference">Internal Reference</label>
                                            <input
                                                class="form-control"
                                                type="text"
                                                id="internalReference"
                                                name="internalReference"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="externalReference">External Reference</label>
                                            <input
                                                class="form-control"
                                                type="text"
                                                id="externalReference"
                                                name="externalReference"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Description</label>
                                        <textarea
                                            class="form-control"
                                            id="message"
                                            name="message"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="form-group">
                                            <label htmlFor="internalReference">Start Date</label>
                                            <input
                                                class="form-control"
                                                type="date"
                                                id="internalReference"
                                                name="internalReference"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="externalReference">End Date</label>
                                            <input
                                                class="form-control"
                                                type="date"
                                                id="externalReference"
                                                name="externalReference"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="client">Product owner</label>
                                        <select
                                            class="form-control"
                                            id="client"
                                            name="client"
                                        >
                                            <option value="">Select Owner</option>
                                            <option value="client1">Owner 1</option>
                                            <option value="client2">Owner 2</option>
                                            <option value="client3">Owner 3</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button type="submit">Configure project </button>
                                    </div>
                                </form>
                                {/* <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <div class="input-group">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </div>


                                    <div class="input-group">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </div>


                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <div class="input-group">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="date" />
                                        </Form.Group>
                                    </div>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Configure project
                                    </Button>
                                </Form> */}
                            </div>

                        </div>
                        <div className="col-6">

                        </div>
                    </div>

                </div>
            </div >
        </section >
    )

}

export default CreateProject;