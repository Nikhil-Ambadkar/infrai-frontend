import React from "react";
import Sidebar from "./shared/sidebar";
import DateIcon from "../assests/image/date-icon.svg";
import YumConstruction from "../assests/image/yum-contruction-icon.svg";
import MapImage from "../assests/image/map.svg";

function Createnewproject() {
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
              <li className="breadcrumb-item active">
                Hüseyin’s hoofdproject A
              </li>
            </ol>
          </nav>
        </div>
        <div className="page-content">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="page-title">Confirm new Project: Hus main P 1</h3>
            </div>
            <div>
              <p>
                <a href="#" className="underline-text">
                  Edit project details
                </a>
                <button type="submit" class="btn create-btn">
                  <span>Create project</span>
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
            <div className="confirm-new-project-box">
              <div className="Project-details-text">Project details</div>
              <div className="project-reference">
                <div>
                  <h3>Project reference</h3>
                  <h4>PR-355-AV</h4>
                </div>
                <div>
                  <h3>Project reference</h3>
                  <h4>PR-355-AV</h4>
                </div>
                <div>
                  <h3>Project reference</h3>
                  <h4>PR-355-AV</h4>
                </div>
              </div>
              <hr className="space-hr"></hr>
              <div className="title-detail">
                <div>
                  <h3>Title</h3>
                  <p className="renovation-avenue">Renovation of Avenue 23B</p>
                </div>
                <div>
                  <h3>Start date</h3>
                  <p>
                    <img src={DateIcon} alt="icon" /> 12-02-2022
                  </p>
                </div>
                <div>
                  <h3>End date</h3>
                  <p>
                    <img src={DateIcon} alt="icon" /> 12-02-2022
                  </p>
                </div>
              </div>
              <div className="discription-project-detail">
                <h2>Description</h2>
                <p>
                  The Street Renovation project, focused on the revitalization
                  of [Street Name], encompasses various subprojects aimed at
                  improving the overall infrastructure and aesthetics of the
                  street. One crucial subproject within this initiative is the
                  "Sidewalk Enhancement and Beautification" effort.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
            <div className="confirm-new-project-box h-100">
              <div className="Project-details-text">Contractors</div>
              <div className="contractors">
                <div>
                  <div className="yum-construction">
                    <p>
                      <img src={YumConstruction} alt="icon" /> YVM construction
                    </p>
                  </div>
                </div>
                <div className="ground-work">
                  <p>Groundwork</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 project-map-top">
             <div className="confirm-new-project-box h-100">
              <div className="Project-details-text">Project map & location</div>
              <div className="map-project-area">
                 <img src={MapImage} alt="map"/>
               </div>
             </div>
           </div>
         </div>
      </main>
    </>
  );
}

export default Createnewproject;
