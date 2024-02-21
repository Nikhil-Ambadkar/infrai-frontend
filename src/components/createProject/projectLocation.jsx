import React, { useEffect, useState } from "react";
import MainProject from "../../assests/image/main-project-area.svg";

function ProjectLocation() {
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
                area_latLng.push([22.721, 75.85651]);
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
        setSelectedInput(index)
    }

    const addInputField = (e, formData) => {
        e.preventDefault();
        formData.area_latLng.push(['']);
        setFormData({ ...formData });
        setShowCloseArea(true);
    }

    const addLatLng = (e, index, formData) => {
        let latLng = e.target.value;
        formData.area_latLng[index] = latLng;
        setFormData({ ...formData })
        let validation = validationCheck(latLng);

        if (!validation) {
            console.log("error: Validate lat lng");
            let newState = showError[index] = true;
            setShowError(prevState => ({
                ...prevState, newState
            }))
        } else {
            let newState = showError[index] = false;
            setShowError(prevState => ({
                ...prevState, newState
            }))
        }
    }

    console.log("showError", showError);
    const validationCheck = (latLng) => {
        const regex = /^(?=.*?,)(?=(?:[^.]*?\.){2}[^.]*?$).*$/;
        return regex.test(latLng);
    }

    const closeArea = (e) => {
        alert()
        e.preventDefault();
        setShowCloseArea(false);
        setShowEnterCoordinate(false);
    }

    console.log("formData", formData)

    return (
        <form className='map-body' >
            <div className='black-ribbon d-flex align-items-center justify-content-between'>
                <span className='form-heading'>Draw your project area on the map</span>
                <button type="submit" className="btn" disabled>
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

                        <label className="mt-3 d-block form-label">Area type</label>
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
                                                null}</span>
                                <input type="text" value={latLng} name="latLng" onChange={(e) => addLatLng(e, index, formData)} onMouseOut={(e) => validationCheck(e, index, formData)} />

                                <div className="invalid-feedback"> Please select a valid state.</div>

                                <button type="button" onClick={() => editInputField(index)} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                                <button type="button" onClick={() => editInputField(index)} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                                <button type="button" onClick={() => alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                            </div>
                        ))}
                        <div className="d-flex w-100">
                            <div>
                                {
                                    ((areaType === 'Area') && (showEnterCoordinate)) ?
                                        <button type="button" className="btn btn-sm btn-secondary m-3 p-2 " onClick={(e) => addInputField(e, formData)}>Enter coordinates</button>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                {
                                    showCloseArea ?
                                        <button type="button" className="btn btn-sm btn-secondary mt-3 p-2" onClick={(e) => closeArea(e)}>Close area</button>
                                        : null
                                }
                            </div>
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

                        <div className="d-flex gap-2">
                            <button type="button" className="btn main-project-area"><i class="bi bi-plus-circle"></i> Enter coordinate</button>
                            <button type="button" className="btn main-project-area"> <i class="bi bi-flag-fill"></i> Close area</button>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default ProjectLocation;