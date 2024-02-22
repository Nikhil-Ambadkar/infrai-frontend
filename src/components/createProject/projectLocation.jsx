import React, { useEffect, useState, useRef } from "react";
import { Autocomplete, DrawingManager, GoogleMap, Polygon, Polyline, Marker, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import MainProject from "../../assests/image/main-project-area.svg";

function ProjectLocation({ props }) {

    const addProjectDetails = props.addProjectDetails;
    const areaTypes = ['Single Point', 'Path', 'Area'];
    const [areaType, setAreaType] = useState('Single Point');
    const [selectedInput, setSelectedInput] = useState(-1);
    const [showCloseArea, setShowCloseArea] = useState(false);
    const [showEnterCoordinate, setShowEnterCoordinate] = useState(true);
    const [showError, setShowError] = useState([]);
    const [showConfigureProject, setShowConfigureProject] = useState(false);
    const [formData, setFormData] = useState({
        area_type: '',
        area_latLng: []
    });

    useEffect(() => {
        changeAreaType(areaType)
    }, [])

    const changeAreaType = (area_type) => {
        setShowError([]);
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
        let input = document.getElementById(`latLngInput${index}`);
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
        onFocus();
    }

    const onFocus = (index) => {

        if (!index) {
            var index = formData.area_latLng.length - 2;
        }
        let input = document.getElementById(`latLngInput${index}`);
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

    const clearInputField = (e, index, formData) => {
        e.preventDefault();
        console.log("clear input filed called");
        // let latLng = e.target.value;
        // let input = document.getElementById(`latLngInput${index}`);
        // console.log("input", input);
        // input.value = '';

        formData.area_latLng[index] = '';
        setFormData({ ...formData })
    }


    const confirmProjectArea = (e) => {
        e.preventDefault();
        addProjectDetails(formData);
    }

    console.log("formData...0", formData);
    console.log("showError", showError);


    // -----Map Related Code Start-----
    const mapRef = useRef();
    const autocompleteRef = useRef();
    const libraries = ['places', 'drawing', 'geometry'];
    const defaultCenter = {
        lat: 22.7196,
        lng: 75.8577,
    }
    const [center, setCenter] = useState(defaultCenter);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAuXC6KUcWLY2JgTvF_-tVJadNl-29lz4Q",
        libraries
    });

    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const containerStyle = {
        width: '100%',
        height: '100vh',
    }

    const onLoadAutocomplete = (autocomplete) => {
        console.log("onLoadAutocomplete called");
        autocompleteRef.current = autocomplete;
    }

    const onPlaceChanged = () => {
        console.log("onPlaceChanged called");
        const { geometry } = autocompleteRef.current.getPlace();
        const bounds = new window.google.maps.LatLngBounds();
        if (geometry.viewport) {
            bounds.union(geometry.viewport);
        } else {
            bounds.extend(geometry.location);
        }
        mapRef.current.fitBounds(bounds);
    }

    const autocompleteStyle = {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        width: '240px',
        height: '38px',
        padding: '0 12px',
        borderRadius: '3px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        fontSize: '14px',
        outline: 'none',
        textOverflow: 'ellipses',
        position: 'absolute',
        right: '8%',
        top: '11px',
        marginLeft: '-120px',
        zIndex: '999'
    }
    // -----Map Related Code End-----

    return (
        <form className='map-body' >
            <div className='black-ribbon d-flex align-items-center justify-content-between'>
                <span className='form-heading'>Draw your project area on the map</span>
                {/* <button type="submit" className="btn" disabled> */}
                <button type="submit" className={`btn ${((showError.length == 0)) ? null : 'disabled'}`} onClick={(e) => confirmProjectArea(e)}>

                    <span className="bi bi-lock-fill"></span>
                    <span className="mx-1">Confirm project area</span>
                </button>
            </div>
            <div className="map-container">
                {/* <div className="map-1" id="map"> */}
                {/* Map will be loaded here by using google map package */}
                {isLoaded
                    ?
                    <>
                        <GoogleMap
                            zoom={15}
                            center={center}
                            onLoad={onLoadMap}
                            mapContainerStyle={containerStyle}
                            onTilesLoaded={() => setCenter(null)}
                        >
                            <Autocomplete
                                onLoad={onLoadAutocomplete}
                                onPlaceChanged={onPlaceChanged}
                            >
                                <div className="search-field">
                                    <span class="bi bi-search"></span>
                                    <input
                                        type='text'
                                        placeholder='Search Location'
                                        style={autocompleteStyle}
                                    />
                                </div>
                            </Autocomplete>
                        </GoogleMap>

                    </>
                    :
                    null}
                {/* </div> */}

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
                            <div className={`poi-input ${(latLng == '') ? 'empty' : null} ${index === selectedInput ? 'editable' : ''} ${((showError.includes(index))) ? 'show-error' : null}`}>
                                <span className="prefix">{
                                    areaType == 'Single Point' ? `POI` :
                                        areaType == 'Path' ? ((index == 0) ? `PATH A` : (index == 1) ? `PATH B` : null) :
                                            areaType == 'Area' ? `POINT ${index + 1}` :
                                                null}
                                    {/* <span className="dot-circle"></span> */}
                                </span>

                                <input type="text" id={`latLngInput${index}`} value={latLng} name="latLng" onChange={(e) => addLatLng(e, index, formData)} onBlur={(e) => onBlur(e, index)} />
                                <button type="button" onClick={() => editInputField(index)} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                                <button type="button" onClick={() => editInputField(index)} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                                <button type="button" onClick={(e) => clearInputField(e, index, formData)} className="btn delete-btn"><span class="bi bi-x"></span></button>
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
                                ((areaType === 'Area') && (showCloseArea)) ?
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
        </form >
    )
}

export default ProjectLocation;