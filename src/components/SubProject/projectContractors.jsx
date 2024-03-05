import React from "react";
import YumConstruction from "../../assests/image/yum-contruction-icon.svg";
import TabIcon from "../../assests/image/tab-menu.svg";
import TickIcon from "../../assests/image/tick-icon.svg";
import Renovation from "../../assests/image/project-icon.svg";
import TabMenu from "../../assests/image/bulleted-list.svg";
import GridIcon from "../../assests/image/grid-icon.svg";

function ProjectContractors() {
  return (
    <>
      <div className="selected-sub-contractors">
        <div className="heading-main d-flex">
          <span>1</span> Selected sub-contractors
        </div>
        <div className="yum-construction-out-part">
          <div className="construction-btns">
            <p>
              <img src={YumConstruction} alt="icon" /> YVM construction
            </p>
          </div>
        </div>
      </div>

      <div className="heading-main top-50 d-flex">
        All sub-contractors
        <div className="tab-change">
          <span className="Grid-box">
            <img src={TabMenu} alt="icon" />
          </span>
          <span className="Grid-box active">
            <img src={GridIcon} alt="icon" />
          </span>
        </div>
        {/* <img src={TabIcon} /> */}
      </div>
      <table className="table table-top">
        <thead>
          <tr>
            <th>Name</th>
            <th>Verification</th>
            <th>Type</th>
            <th>Assigned in</th>
            <th style={{ width: "120px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="border-highlight active-tr-border"
            style={{ position: "relative" }}
          >
            <td className="yvm-td">
              <img src={YumConstruction} alt="icon" /> YVM construction
            </td>
            <td>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </td>
            <td className="groundwork">Groundwork</td>
            <td className="bg-color-renovation">
              <div className="d-flex gap-1">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </td>
            <td>
              <button className="btn btn-primary select-btn">Selected</button>
            </td>
            <div className="border-adjust"></div>
          </tr>

          <tr className="border-highlight" style={{ position: "relative" }}>
            <td className="yvm-td">
              <img src={YumConstruction} alt="icon" /> YVM construction
            </td>
            <td>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </td>
            <td className="groundwork">Groundwork</td>
            <td className="bg-color-renovation">
              <div className="d-flex gap-1">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </td>
            <td>
              <button className="btn btn-primary select-btn">
                Select contractor
              </button>
            </td>
            <div className="border-adjust"></div>
          </tr>
          <tr className="border-highlight" style={{ position: "relative" }}>
            <td className="yvm-td">
              <img src={YumConstruction} alt="icon" /> YVM construction
            </td>
            <td>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </td>
            <td className="groundwork">Groundwork</td>
            <td className="bg-color-renovation">
              <div className="d-flex gap-1">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </td>
            <td>
              <button className="btn btn-primary select-btn">
                Select contractor
              </button>
            </td>
            <div className="border-adjust"></div>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-primary create-another-btn">
        Create another sub-contractor
      </button>

      <div className="row">
        <div className="table-top col-md-3 mt-0">
          <div className="border-highlight p-3 active-tr-border">
            <div className="yvm-td">
              <h3 style={{ marginTop: "0px" }}>Name</h3>
              <img src={YumConstruction} alt="icon" /> YVM construction
            </div>
            <div>
              <h3>Verification</h3>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </div>
            <h3>Type</h3>
            <p className="groundwork">Groundwork</p>
            <h3>Assigned in</h3>
            <div className="bg-color-renovation">
              <div className="d-flex flex-wrap gap-0">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </div>
            <button className="btn btn-primary select-btn mt-3 text-center select-inline">
              Select contractor
            </button>
          </div>
        </div>
        <div className="table-top col-md-3 mt-0">
          <div className="border-highlight p-3">
            <div className="yvm-td">
              <h3 style={{ marginTop: "0px" }}>Name</h3>
              <img src={YumConstruction} alt="icon" /> YVM construction
            </div>
            <div>
              <h3>Verification</h3>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </div>
            <h3>Type</h3>
            <p className="groundwork">Groundwork</p>
            <h3>Assigned in</h3>
            <div className="bg-color-renovation">
              <div className="d-flex flex-wrap gap-0">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </div>
            <button className="btn btn-primary select-btn mt-3 text-center select-inline">
              Select contractor
            </button>
          </div>
        </div>
        <div className="table-top col-md-3 mt-0">
          <div className="border-highlight p-3">
            <div className="yvm-td">
              <h3 style={{ marginTop: "0px" }}>Name</h3>
              <img src={YumConstruction} alt="icon" /> YVM construction
            </div>
            <div>
              <h3>Verification</h3>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </div>
            <h3>Type</h3>
            <p className="groundwork">Groundwork</p>
            <h3>Assigned in</h3>
            <div className="bg-color-renovation">
              <div className="d-flex flex-wrap gap-0">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </div>
            <button className="btn btn-primary select-btn mt-3 text-center select-inline">
              Select contractor
            </button>
          </div>
        </div>
        <div className="table-top col-md-3 mt-0">
          <div className="border-highlight p-3">
            <div className="yvm-td">
              <h3 style={{ marginTop: "0px" }}>Name</h3>
              <img src={YumConstruction} alt="icon" /> YVM construction
            </div>
            <div>
              <h3>Verification</h3>
              <span className="verified">
                <img src={TickIcon} alt="icon" />
                Verified by Veri <strong>Checks</strong>
              </span>
            </div>
            <h3>Type</h3>
            <p className="groundwork">Groundwork</p>
            <h3>Assigned in</h3>
            <div className="bg-color-renovation">
              <div className="d-flex flex-wrap gap-0">
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Renovation of avenue 43B
                </span>
                <span className="renovation">
                  <img src={Renovation} alt="icon" />
                  Office building construction
                </span>
              </div>
            </div>
            <button className="btn btn-primary select-btn mt-3 text-center select-inline">
              Select contractor
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectContractors;
