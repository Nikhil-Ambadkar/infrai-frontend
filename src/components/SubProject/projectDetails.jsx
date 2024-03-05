import React, { useEffect, useState } from "react";
import IconSelect from "../../assests/image/icon-select.svg";
import IconCalender from "../../assests/image/icon-calender.svg";
import DropFileInput from "../shared/documentUploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubContractor from "../../assests/image/sub-contractor.svg";


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
                                <h5 className='form-heading'>Describe the Subproject </h5>
                            </div>
                        </div>
                        <form onSubmit={(e) => onSubmit(e)}>

                            {/* Title */}
                            <div className='row mt-3'>
                                <div className='col-md-6'>
                                    <label className='form-label'>Title</label>
                                    <input className='form-control' name='projectTitle'/>
                                </div>
                                <div className='col-md-6'>
                                    <label className='form-label'>Project reference</label>
                                    <input className='form-control' name='projectReference'/>
                                </div>
                            </div>

                            {/* Sub contractor */}
                            <div className='row mt-3'>
                                <div className='col-md-6  relative-select'>
                                    <label className='form-label'>Sub contractor</label>
                                    <input className='form-control' name='projectTitle' value={formData.projectTitle} onChange={(e) => { handleChange(e) }} />
                                    <img src={SubContractor} alt="icon" className="icon-select" />
                                </div>
                                <div className='col-md-6 relative-select'>
                                    <label className='form-label'>Product owner</label>
                                    <input className='form-control' name='projectReference' value={formData.projectReference} onChange={(e) => { handleChange(e) }} />
                                    <img src={IconSelect} alt="icon" className="icon-select" />
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
                                    <label className='form-label start-date'>Start date</label>
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
                                    <label className='form-label start-date'>End date</label>
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

                            {/* Submit Form */}
                            <div className='row configure-project'>
                                <div className='col-md-12'>
                                    <button type='submit' className='btn-primary btn-lg w-100 configure-project-btn'>Go to area configuration</button>
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