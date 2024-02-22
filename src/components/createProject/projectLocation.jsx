import React, { useEffect, useState } from "react";
import MainProject from "../../assests/image/main-project-area.svg";

function ProjectLocation({ props }) {

    const addProjectDetails = props.addProjectDetails;
    const areaTypes = ['Single Point', 'Path', 'Area'];
    const [areaType, setAreaType] = useState('Single Point');
    // const [selectedInput, setSelectedInput] = useState(-1);
    const [selectedInput, setSelectedInput] = useState(-1);
    const [showCloseArea, setShowCloseArea] = useState(false);
    const [showEnterCoordinate, setShowEnterCoordinate] = useState(true);
    const [showError, setShowError] = useState([]);
    const [formData, setFormData] = useState({
        area_type: '',
        area_latLng: []
    });

    useEffect(() => {
        changeAreaType(areaType)
    }, [])

    const changeAreaType = (area_type) => {
        setAreaType(area_type);
        let area_latLng = [];
        switch (area_type) {
            case 'Single Point':
                area_latLng.push(['']);
                break;
            case 'Path':
                area_latLng.push(['']);
                area_latLng.push(['']);
                break;
            case 'Area':
                area_latLng.push(['']);
                area_latLng.push(['']);
                area_latLng.push(['']);
                break;
            default:
                area_latLng = [];
                break;
        }

        setFormData({
            ...formData,
            area_type,
            area_latLng
        });
    }

    //Below function is created to edit a input field 
    const editInputField = (index) => {
        setSelectedInput(index);

        //Below functionality help as us to focus on input field 
        var input = document.getElementById(`latLngInput${index}`);
        if (input) {
            input.focus();
        } else {
            console.error("Input field with ID '" + input + "' not found.");
        }
    }

    const addInputField = (e, formData) => {
        e.preventDefault();
        formData.area_latLng.push(['']);
        setFormData({ ...formData });
        setShowCloseArea(true);
        // onFocus();
    }

    const onFocus = (index) => {

        // console.log("formData.area_latLng.length - 1", formData.area_latLng.length - 1);
        // let index = formData.area_latLng.length - 1;
        if (!index) {
            var index = formData.area_latLng.length - 1;
        }
        var input = document.getElementById(`latLngInput${index}`);
        if (input) {
            input.focus();
        } else {
            console.error("Input field with ID '" + input + "' not found.");
        }
    }

    const addLatLng = (e, index, formData) => {
        let latLng = e.target.value;
        formData.area_latLng[index] = latLng;
        setFormData({ ...formData })
        // onFocus(index);

    }

    const onBlur = (e, index) => {

        setSelectedInput(-1);

        let latLng = e.target.value;
        let validation = validationCheck(latLng);

        if (!validation) {
            console.error("error: Validate lat lng");

            setShowError(current => [...current, index])

        } else {
            console.log("lat lng validated");
            setShowError(oldValues => {
                return oldValues.filter(showError => showError !== index)
            })
            setShowError()
            // let newState = showError[index] = false;
            // setShowError(prevState => ({
            //     ...prevState, newState
            // }))
        }

    }

    const validationCheck = (latLng) => {
        const regex = /^(?=.*?,)(?=(?:[^.]*?\.){2}[^.]*?$).*$/;
        return regex.test(latLng);
    }

    const closeArea = (e) => {
        e.preventDefault();
        setShowCloseArea(false);
        setShowEnterCoordinate(false);
    }


    const confirmProjectArea = (e) => {
        e.preventDefault();
        addProjectDetails(formData);
    }

    console.log("formData", formData);
    console.log("showError", showError);

    return (
        <form className='map-body' >
            <div className='black-ribbon d-flex align-items-center justify-content-between'>
                <span className='form-heading'>Draw your project area on the map</span>
                {/* <button type="submit" className="btn" disabled> */}
                <button type="submit" className="btn" onClick={(e) => confirmProjectArea(e)}>

                    <span className="bi bi-lock-fill"></span>
                    <span className="mx-1">Confirm project area</span>
                </button>
            </div>
            <div className="map-container">
                <div className="map" id="map">
                    {/* Map will be loaded here by using google map package */}
                </div>

                <div className="map-overlay">
                    <div className="dark-overlay"></div>
                    <div className="search-field">
                        <span class="bi bi-search"></span>
                        <input type="text" placeholder="Navigate to location" />
                    </div>

                    <div className="map-area">
                        <div className="yellow-line"></div>
                        <span className='form-heading'>
                            <img src={MainProject} alt='icon' />
                            Main project area
                        </span>

                        <label className="mt-3 d-block form-label area-type">Area type</label>
                        <div className="area-tabs">
                            {areaTypes.map(areaType => (
                                <button
                                    key={areaType}
                                    type="button"
                                    className={`btn btn-lg ${formData.area_type === areaType ? 'active' : ''}`}
                                    onClick={() => changeAreaType(areaType)}
                                >
                                    {areaType}
                                </button>
                            ))}
                        </div>

                        <label className="mt-4 d-block form-label text-yellow">Define Project area</label>
                        {formData.area_latLng.map((latLng, index) => (
                            <div className={`poi-input ${(latLng == '') ? 'empty' : null} ${index === selectedInput ? 'editable' : ''}`}>
                                <span className="prefix">{
                                    areaType == 'Single Point' ? `POI` :
                                        areaType == 'Path' ? ((index == 0) ? `PATH A` : (index == 1) ? `PATH B` : null) :
                                            areaType == 'Area' ? `POINT ${index + 1}` :
                                                null}
                                    {/* <span className="dot-circle"></span> */}
                                </span>

                                <input type="text" id={`latLngInput${index}`} value={latLng} name="latLng" onChange={(e) => addLatLng(e, index, formData)} onBlur={(e) => onBlur(e, index)} onMouseOut={(e) => validationCheck(e, index, formData)} />

                                <div className="invalid-feedback"> Please select a valid state.</div>

                                <button type="button" onClick={() => editInputField(index)} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                                <button type="button" onClick={() => editInputField(index)} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                                <button type="button" onClick={() => alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                            </div>
                        ))}
                        <div className="d-flex gap-2">

                            {
                                ((areaType === 'Area') && (showEnterCoordinate)) ?
                                    <button type="button" className="btn main-project-area" onClick={(e) => addInputField(e, formData)}><i class="bi bi-plus-circle"></i> Enter coordinates</button>
                                    :
                                    null
                            }


                            {
                                showCloseArea ?
                                    <button type="button" className="btn main-project-area" onClick={(e) => closeArea(e)}><i class="bi bi-flag-fill"></i> Close area</button>
                                    : null
                            }

                        </div>
                        {/* <div className="poi-input empty">
                            <span className="prefix">POI</span>
                            <input type="text" />
                            <button type="button" onClick={() => alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={() => alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div> */}

                        {/* <div class="poi-input">
                            <span className="prefix">POI</span>
                            <input type="text" value="22.551562, 75.565152" />
                            <button type="button" onClick={() => alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" onClick={() => alert('click on edit')} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={() => alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div> */}
                        {/* <div class="poi-input editable">
                            <span className="prefix">POI</span>
                            <input type="text" value="22.551562, 75.565152" />
                            <button type="button" onClick={() => alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" onClick={() => alert('click on edit')} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={() => alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div> */}
                    </div>
                </div>

            </div>
        </form>
    )
}

export default ProjectLocation;