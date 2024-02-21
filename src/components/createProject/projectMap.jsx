import React from "react";
import DropFileInput from "../shared/documentUploader";

function ProjectMap({ props }) {
    const addProjectFiles = props.addProjectFiles;

    return (
        <>
            <div className='map-body'>
                <div className='black-ribbon d-flex align-items-center justify-content-between'>
                    <span className='form-heading'>Upload your project map</span>
                </div>
                <div className='project-map'>
                    <DropFileInput
                        onFileChange={(files) => addProjectFiles(files)}
                    />
                </div>
            </div>
        </>
    )
}

export default ProjectMap;