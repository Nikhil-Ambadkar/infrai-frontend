import React from "react";


function ProjectDetails() {
    return (


        <>
            {/* step 1 */}
            < div className='row' >
                <div className='col-md-6'>
                    <div className='box-primary px-4 py-4'>
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
                                <input className='form-control' />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>External reference</label>
                                <input className='form-control' />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <label className='form-label'>Project title</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Project reference</label>
                                <input className='form-control' />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <label className='form-label'>Description</label>
                                <textarea className='form-control'></textarea>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <label className='form-label'>Start date</label>
                                <input type='date' className='form-control' />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>End date</label>
                                <input type='date' className='form-control' />
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <label className='form-label'>Product owner</label>
                                <select className='form-control'>
                                    <option>Select Product owner</option>
                                    <option> Product owner 1</option>
                                </select>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-md-12'>
                                <label for="declaration" className='d-flex justify-content-start'>
                                    <input type="checkbox" id="declaration" />
                                    <span className='declaration-text mx-3'>This project does not consist of sub-projects, but is executable on its own.</span>
                                </label>
                            </div>
                        </div>

                        <div className='row mt-5'>
                            <div className='col-md-12'>
                                <button type='button' className='btn btn-primary btn-lg w-100'>Configure project</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='box-primary px-4 py-4'>

                    </div>
                </div>
            </div >
        </>

    )
}

export default ProjectDetails;