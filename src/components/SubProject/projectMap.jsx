import React from "react";
import DropFileInput from "../shared/documentUploader";
import MapImage from "../../assests/image/map-image.png";
import IconCalender from "../../assests/image/icon-calender.svg";

function ProjectMap({ props }) {
  const addProjectFiles = props.addProjectFiles;

  return (
    <>
      <div className="map-body">
        <div className="black-ribbon d-flex align-items-center justify-content-between">
          <span className="form-heading">Upload your project map</span>
          <button type="submit" className="btn">
            <span className="bi bi-lock-fill"></span>
            <span className="mx-1">Confirm project area</span>
          </button>
        </div>

        <div className="project-map">
          <DropFileInput onFileChange={(files) => addProjectFiles(files)} />
        </div>

        {/* Second show map*/}
        <div className="row image-upload-map">
          <div className="col-md-8">
            <div className="project-map-image">
              <img src={MapImage} className="img-fluid" alt="image" />
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
        {/* Third show map*/}
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
                    <img src={MapImage} className="img-fluid" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectMap;
