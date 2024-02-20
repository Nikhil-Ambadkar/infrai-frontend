import React, { useState } from "react";
import IconSelect from "../../assests/image/icon-select.svg";
import IconCalender from "../../assests/image/icon-calender.svg";
import DropFileInput from "../documentUploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function ProjectDetails({ props }) {
    const { internalReference, externalReference, projectTitle, projectReference, description, startDate, endDate, addProjectDetails } = props.project;


    console.log("props", props);


    const onFileChange = (files) => {
        console.log(files);
    }

    const onSubmit = () => {
        addProjectDetails()
    }

    return (
        <>
            {/* step 1 */}
            < div className='row' >
                <div className='col-md-6'>
                    <div className='box-primary'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h5 className='form-heading'>Describe the </h5>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <label className='form-label'>Client</label>
                                <select className='form-control'>
                                    <option>Select Client</option>
                                    <option> Client 1</option>
                                </select>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <label className='form-label'>Internal reference</label>
                                <input className='form-control' value={internalReference} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>External reference</label>
                                <input className='form-control' value={externalReference} />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <label className='form-label'>Project title</label>
                                <input className='form-control' value={projectTitle} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Project reference</label>
                                <input className='form-control' value={projectReference} />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <label className='form-label'>Description</label>
                                <textarea className='form-control' value={description}></textarea>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-6  relative-select'>
                                <label className='form-label'>Start date</label>
                                {/* <input type='date' className='form-control' /> */}
                                <DatePicker
                                    className='form-control'
                                    dateFormat="dd.MM.yyyy"
                                    selected={startDate}
                                    minDate={new Date()}
                                // onChange={(date) => setStartDate(date)} 
                                />
                                <img src={IconCalender} alt="icon" className="icon-select" />

                            </div>
                            <div className='col-md-6  relative-select'>
                                <label className='form-label'>End date</label>
                                {/* <input type='date' className='form-control' /> */}
                                <DatePicker
                                    className='form-control'
                                    dateFormat="dd.MM.yyyy"
                                    selected={endDate.getTime()}
                                    minDate={startDate.getTime() + 86400000}
                                // onChange={(date) => setEndDate(date)} 
                                />
                                <img src={IconCalender} alt="icon" className="icon-select" />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-12 relative-select'>
                                <label className='form-label'>Product owner</label>
                                <select className='form-control'>
                                    <option>Select Product owner</option>
                                    <option> Product owner 1</option>
                                </select>
                                <img src={IconSelect} alt="icon" className="icon-select" />
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-md-12'>
                                <label for="declaration" className='d-flex justify-content-start checkbox-border'>
                                    <input type="checkbox" id="declaration" />
                                    <span className='declaration-text'>This project does not consist of sub-projects, but is executable on its own.</span>
                                </label>
                            </div>
                        </div>

                        <div className='row configure-project'>
                            <div className='col-md-12'>
                                <button type='button' className='btn-primary btn-lg w-100 configure-project-btn'>Configure project</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='box-primary px-4 py-4'>
                        <DropFileInput
                            onFileChange={(files) => onFileChange(files)}
                        />
                    </div>
                </div>
            </div >
        </>

    )
}

export default ProjectDetails;