import React from "react";
import DropFileInput from "../shared/documentUploader";
import MapImage from "../../assests/image/map-image.png";
import IconCalender from "../../assests/image/icon-calender.svg";
import { useState } from "react";

function ProjectMap({ props }) {
  const addProjectFiles = props.addProjectFiles;
  const componentId = props.componentId;
  const projectMap = props.projectMap;
  const [projectMapConfirmed, setProjectMapConfirmed] = useState(false);

  console.log("componentId...", componentId);
  console.log("projectMap...Inside component", projectMap);

  const projectMapConfirm = () => {
    console.log("projectMapConfirm...");
    setProjectMapConfirmed(true);
  }

  return (
    <>
      <div className="map-body">

        {/* Upload Map */}
        {!projectMap && !projectMapConfirmed ?
          <>
            <div className="black-ribbon d-flex align-items-center justify-content-between">
              <span className="form-heading">Upload your project map</span>
            </div>
            <div className="project-map">
              <DropFileInput
                onFileChange={(files, componentId) => addProjectFiles(files, componentId)}
                componentId={componentId}
              />
            </div>
          </>
          :
          null
        }

        {/* Uploaded Map image rendered */}
        {
          projectMap && !projectMapConfirmed ?
            <>
              <div className="black-ribbon d-flex align-items-center justify-content-between">
                <span className="form-heading">Confirm your project map</span>
                <button type="submit" className="btn" onClick={(e) => (projectMapConfirm())}>
                  <span className="bi bi-lock-fill"></span>
                  <span className="mx-1">Confirm project area</span>
                </button>
              </div>
              < div className="row image-upload-map">
                <div className="col-md-8">
                  <div className="project-map-image">
                    <img src={projectMap} className="img-fluid" alt="image" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="map-scale">
                    <h3>Define map scale</h3>
                    <div className="number-to">
                      <div className="relative-select">
                        <input type="text" className="form-control" />
                        <span>1 to</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

            : null
        }



        {/* Third show map*/}

        {projectMap && projectMapConfirmed ?
          <div className="map-container">
            <div className="row m-0">
              <div className="col-md-9 p-0">
                <div className="map" id="map">
                  {/* Map will be loaded here by using google map package */}
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center p-0">
                <div className="uploaded-project-map">
                  <h3>Uploaded project map:</h3>
                  <div className="map-visible">
                    <img src={projectMap} className="img-fluid" alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          null
        }
      </div >
    </>
  );
}

export default ProjectMap;
