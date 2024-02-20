import React, { useEffect, useState } from "react";
import IconSelect from "../../assests/image/icon-select.svg";
import IconCalender from "../../assests/image/icon-calender.svg";
import DropFileInput from "../shared/documentUploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function ProjectDetails({ props }) {
    const addProjectDetails = props.addProjectDetails;
    const addProjectFiles = props.addProjectFiles;
    const project = props.project;

    const [formData, setFormData] = useState(project);

    const handleChange = (e) => {
        console.log("this is e", e);
        const { name, value } = e.target;
        console.log(name, value);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addProjectDetails(formData);
    }

    return (
        <>
            < div className='row' >
                <div className='col-md-6'>
                    <div className='box-primary'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h5 className='form-heading'>Describe the </h5>
                            </div>
                        </div>
                        <form onSubmit={(e) => onSubmit(e)}>

                            {/* client */}
                            <div className='row mt-3'>
                                <div className='col-md-12'>
                                    <label className='form-label'>Client</label>
                                    <select className="form-select" name="clientId" aria-label="Default select example" value={formData.clientId} onChange={(e) => { handleChange(e) }}>
                                        <option>Select Client</option>
                                        <option value={1}> Client 1</option>
                                        <option value={2}> Client 2</option>
                                        <option value={3}> Client 3</option>
                                        <option value={4}> Client 4</option>
                                    </select>
                                </div>
                            </div>

                            {/* References */}
                            <div className='row mt-3'>
                                <div className='col-md-6'>
                                    <label className='form-label'>Internal reference</label>
                                    <input className='form-control' name='internalReference' value={formData.internalReference} onChange={(e) => { handleChange(e) }} />
                                </div>
                                <div className='col-md-6'>
                                    <label className='form-label'>External reference</label>
                                    <input className='form-control' name='externalReference' value={formData.externalReference} onChange={(e) => { handleChange(e) }} />
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className='row mt-3'>
                                <div className='col-md-6'>
                                    <label className='form-label'>Project title</label>
                                    <input className='form-control' name='projectTitle' value={formData.projectTitle} onChange={(e) => { handleChange(e) }} />
                                </div>
                                <div className='col-md-6'>
                                    <label className='form-label'>Project reference</label>
                                    <input className='form-control' name='projectReference' value={formData.projectReference} onChange={(e) => { handleChange(e) }} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className='row mt-3'>
                                <div className='col-md-12'>
                                    <label className='form-label'>Description</label>
                                    <textarea className='form-control textarea-height' name='description' value={formData.projectDescription} onChange={(e) => { handleChange(e) }}></textarea>
                                </div>
                            </div>

                            {/* Start date */}
                            <div className='row mt-3'>
                                <div className='col-md-6  relative-select'>
                                    <label className='form-label'>Start date</label>
                                    <DatePicker
                                        name="startDate"
                                        className='form-control'
                                        dateFormat="dd.MM.yyyy"
                                        selected={formData.startDate}
                                        minDate={formData.startDate}
                                        onChange={(value) => handleChange({ target: { name: 'startDate', value } })}
                                    />
                                    <img src={IconCalender} alt="icon" className="icon-select" />
                                </div>

                                {/* End Date */}
                                <div className='col-md-6  relative-select'>
                                    <label className='form-label'>End date</label>
                                    <DatePicker
                                        name="endDate"
                                        className='form-control'
                                        dateFormat="dd.MM.yyyy"
                                        selected={formData.endDate.getTime()}
                                        minDate={formData.startDate.getTime() + 86400000}
                                        onChange={(value) => handleChange({ target: { name: 'endDate', value } })}
                                    />
                                    <img src={IconCalender} alt="icon" className="icon-select" />
                                </div>
                            </div>

                            {/* Product owner */}
                            <div className='row mt-3'>
                                <div className='col-md-12 relative-select'>
                                    <label className='form-label'>Product owner</label>
                                    <select className="form-select" name="productOwnerId" aria-label="Default select example" value={formData.productOwnerId} onChange={(e) => { handleChange(e) }}>
                                        <option>Select Product owner</option>
                                        <option value={1}> Product Owner 1</option>
                                        <option value={2}> Product Owner 2</option>
                                        <option value={3}> Product Owner 3</option>
                                        <option value={4}> Product Owner 4</option>
                                    </select>
                                    <img src={IconSelect} alt="icon" className="icon-select" />
                                </div>
                            </div>

                            {/* Check Box */}
                            <div className='row mt-4'>
                                <div className='col-md-12'>
                                    <label for="declaration" className='d-flex justify-content-start checkbox-border'>
                                        <input type="checkbox" id="declaration" required />
                                        <span className='declaration-text'>This project does not consist of sub-projects, but is executable on its own.</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Form */}
                            <div className='row configure-project'>
                                <div className='col-md-12'>
                                    <button type='submit' className='btn-primary btn-lg w-100 configure-project-btn'>Configure project</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                {/* Document Upload */}
                <div className='col-md-6'>
                    <div className='box-primary drag-drop'>
                        <DropFileInput
                            onFileChange={(files) => addProjectFiles(files)}
                        />
                    </div>
                </div>
            </div >
        </>

    )
}

export default ProjectDetails;