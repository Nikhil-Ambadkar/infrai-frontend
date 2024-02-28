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
        projectLocation: '',
        lat: null,
        lng: null,
        areaType: '',
        areaLatLng: []
    });

    useEffect(() => {
        changeAreaType(areaType)
    }, [])

    const changeAreaType = (areaType) => {
        setShowError([]);
        setAreaType(areaType);
        let areaLatLng = [];
        switch (areaType) {
            case 'Single Point':
                areaLatLng.push(['']);
                break;
            case 'Path':
                areaLatLng.push(['']);
                areaLatLng.push(['']);
                break;
            case 'Area':
                areaLatLng.push(['']);
                areaLatLng.push(['']);
                areaLatLng.push(['']);
                break;
            default:
                areaLatLng = [];
                break;
        }

        setFormData({
            ...formData,
            areaType,
            areaLatLng
        });
    }

    //Below function is created to edit a input field 
    const editInputField = (index) => {
        setSelectedInput(index);
        console.log("index", index);
        
        mapRef.current.addListener('click', (event)=> {
            // Retrieve the latitude and longitude of the clicked location
            const clickedLatLng = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            
            //add marker on clicked position
            updateMarkerPosition(clickedLatLng);
            console.log(index);
            addLatLng(`${event.latLng.lat().toFixed(5)}, ${event.latLng.lng().toFixed(5)}`, index, formData);
            // Do something with the clicked latitude and longitude
            console.log('Clicked LatLng:', clickedLatLng);
            // You can perform any action you want with the latitude and longitude here
        })

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
        formData.areaLatLng.push(['']);
        setFormData({ ...formData });
        setShowCloseArea(true);
        onFocus();
    }

    const onFocus = (index) => {

        if (!index) {
            var index = formData.areaLatLng.length - 2;
        }
        let input = document.getElementById(`latLngInput${index}`);
        if (input) {
            input.focus();
        } else {
            console.error("Input field with ID '" + input + "' not found.");
        }
    }

    const addLatLng = (latLng, index, formData) => {
        formData.areaLatLng[index] = latLng;
        setFormData({ ...formData })
        // onFocus(index);

    }

    const onBlur = (e, index) => {

        setSelectedInput(-1);
        console.log("onBlur index", index);

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

        formData.areaLatLng[index] = '';
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
    const [markerInstance, setMarkerInstance] = useState(null);
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
        map.setMapTypeId('satellite');
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

        //add marker on clicked position
        updateMarkerPosition(geometry.location);
    }

    const updateMarkerPosition = (latLng) => {
        if(markerInstance){
            markerInstance.setPosition(latLng);
            return;
        }

        const newMarkerInstance = new window.google.maps.Marker({
            position: latLng,
            map: mapRef.current, // Use the map reference from useRef
            title: 'Marker Title' // Optionally, set a title for the marker
        });
        setMarkerInstance(newMarkerInstance);
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

                        <div className="dark-overlay"></div>
                        <Autocomplete
                            onLoad={onLoadAutocomplete}
                            onPlaceChanged={onPlaceChanged}
                            className="map-overlay"
                        >
                            <div className="search-field">
                                <span class="bi bi-search"></span>
                                <input
                                    type='text'
                                    placeholder='Navigate to location'
                                />
                            </div>
                        </Autocomplete>

                        <div className="map-area map-overlay">
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
                                        className={`btn btn-lg ${formData.areaType === areaType ? 'active' : ''}`}
                                        onClick={() => changeAreaType(areaType)}
                                    >
                                        {areaType}
                                    </button>
                                ))}
                            </div>

                            <label className="mt-4 d-block form-label text-yellow">Define Project area</label>
                            {formData.areaLatLng.map((latLng, index) => (
                                <div className={`poi-input ${(latLng == '') ? 'empty' : null} ${index === selectedInput ? 'editable' : ''} ${((showError.includes(index))) ? 'show-error' : null}`}>
                                    <span className="prefix">{
                                        areaType == 'Single Point' ? `POI` :
                                            areaType == 'Path' ? ((index == 0) ? `PATH A` : (index == 1) ? `PATH B` : null) :
                                                areaType == 'Area' ? `POINT ${index + 1}` :
                                                    null}
                                        { latLng ? (<span className="dot-circle"></span>) : null}
                                    </span>

                                    <input type="text" id={`latLngInput${index}`} value={latLng} name="latLng" onChange={(e) => addLatLng(e.target.value, index, formData)}  />
                                    <button type="button" onClick={(e) => onBlur(e, index)} className="btn save-marker-btn"><span class="bi bi-save"></span></button>
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
                    </GoogleMap>
                    </>
                    :
                    null}
                {/* </div> */}
            </div>
        </form >
    )
}

export default ProjectLocation;