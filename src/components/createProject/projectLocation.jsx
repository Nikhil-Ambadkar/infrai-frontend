import React, { useEffect, useState, useRef } from "react";
import { Autocomplete, GoogleMap, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';
import MainProject from "../../assests/image/main-project-area.svg";

function ProjectLocation({ props }) {

    const addProjectDetails = props.addProjectDetails;
    const changeActiveComponent = props.changeActiveComponent;
    const areaTypes = ['Single Point', 'Path', 'Area'];
    const libraries = ['places', 'drawing', 'geometry'];
    const [areaType, setAreaType] = useState('Single Point');
    const [selectedInput, setSelectedInput] = useState(-1);
    const [showCloseArea, setShowCloseArea] = useState(false);
    const [showEnterCoordinate, setShowEnterCoordinate] = useState(true);
    const [showError, setShowError] = useState([]);
    const [markerInstance, setMarkerInstance] = useState(null);
    const [confirmProjectAreaButton, setConfirmProjectAreaButton] = useState(false);
    const mapRef = useRef();
    const currentListenerRef = useRef(null);
    const autocompleteRef = useRef();

    const defaultCenter = {
        lat: 22.7196,
        lng: 75.8577,
    }

    const geometryOptions = {
        fillOpacity: 0.3,
        fillColor: '#FCC331',
        strokeColor: '#FCC331',
        strokeWeight: 5
    }

    const [center, setCenter] = useState(defaultCenter);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAuXC6KUcWLY2JgTvF_-tVJadNl-29lz4Q",
        libraries
    });
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
        setConfirmProjectAreaButton(false);
        let areaLatLng = [];
        switch (areaType) {
            case 'Single Point':
                areaLatLng.push('');
                break;
            case 'Path':
                areaLatLng.push('');
                areaLatLng.push('');
                break;
            case 'Area':
                areaLatLng.push('');
                areaLatLng.push('');
                areaLatLng.push('');
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
        currentListenerRef.current = mapRef.current.addListener('click', (event) => {
            // Retrieve the latitude and longitude of the clicked location
            const clickedLatLng = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            //add marker on clicked position
            updateMarkerPosition(clickedLatLng);
            addLatLng(`${event.latLng.lat().toFixed(5)}, ${event.latLng.lng().toFixed(5)}`, index, formData);
            // Do something with the clicked latitude and longitude
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
        formData.areaLatLng.push('');
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
        setFormData({ ...formData });
    }

    const onSave = (e, index) => {

        setSelectedInput(-1);
        currentListenerRef.current.remove();

        let latLng = document.getElementById(`latLngInput${index}`).value;


        // //We are nulify markerInstance here to remove ballon/marker 
        // if (markerInstance) {
        //     markerInstance.setMap(null);
        //     setMarkerInstance(null);
        // }

        if (latLng && latLng != '' && latLng !== null) {
            let validation = validationCheck(latLng);
            if (!validation) {
                console.error("error: Validate lat lng");
                setShowError(current => [...current, index])
            } else {
                setShowError(oldValues => {
                    return oldValues.filter(showError => showError !== index)
                })
            }
        }
    }

    //Validation function validate Lat Lng provided to it
    //regex is such that string should contain two dots and one comma
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
        formData.areaLatLng[index] = '';
        setFormData({ ...formData })

        //After clearing data from input field we will remove error, as there no lat,lng which we have to validate 
        setShowError(oldValues => {
            return oldValues.filter(showError => showError !== index)
        })
    }

    const confirmProjectArea = (e) => {
        e.preventDefault();
        addProjectDetails(formData);
        changeActiveComponent(3);
    }

    const onLoadMap = (map) => {
        map.setMapTypeId('satellite');
        mapRef.current = map;
        map.setOptions({
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [] // To remove options of map view
            }
        });

        const newMarkerInstance = new window.google.maps.Marker({
            position: defaultCenter,
            map: mapRef.current, // Use the map reference from useRef
            title: 'Marker Title' // Optionally, set a title for the marker
        });
        setMarkerInstance(newMarkerInstance);
    }

    const containerStyle = {
        width: '100%',
        height: '100vh',
    }

    const onLoadAutocomplete = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    }

    const onPlaceChanged = () => {
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
        if (markerInstance) {
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

    const getCoordinates = () => {
        if (formData.areaLatLng.length > 0) {
            return formData.areaLatLng.map((latlng, index) => {
                if (typeof latlng === 'string') {
                    const [lat, lng] = latlng.split(", ");
                    if (lat && lng) {
                        return { lat: parseFloat(lat), lng: parseFloat(lng) };
                    }
                }
                return null;
            }).filter(Boolean);
        }
        return [];
    };


    // Call getCoordinates to retrieve path
    const path = getCoordinates();

    useEffect(() => {
        if (formData) {
            //We are nulify markerInstance here to remove ballon/marker 
            setTimeout(() => {
                if (markerInstance) {
                    markerInstance.setMap(null);
                    setMarkerInstance(null);
                }
            }, [5000])
        }
    }, [formData])

    useEffect(() => {
        if (formData) {
            validateConfirmProjectAreaButton()
        }
    }, [formData, showError, areaType])


    //Below function help us to validate Confirm-Project-Area-Button i.e. when to disable and when to enable it
    const validateConfirmProjectAreaButton = () => {

        let isValid = false;
        switch (areaType) {
            case 'Single Point':
                isValid = ((formData.areaLatLng.length == 1) && (showError.length == 0) && (formData.areaLatLng.every(value => value.trim() !== '')))
                break;

            case 'Path':
                isValid = ((formData.areaLatLng.length == 2) && (showError.length == 0) && (formData.areaLatLng.every(value => value.trim() !== '')))
                break;

            case 'Area':
                //In case of areaType=area we checking starting 3 values of array i.e. they should not be blank 
                isValid = ((formData.areaLatLng.length >= 3) && (showError.length == 0) && (formData.areaLatLng.slice(0, 3).every(value => value.trim() !== '')))
                break;

            default:
                break;
        }

        setConfirmProjectAreaButton(isValid);
    }


    return (
        <form className='map-body' >
            <div className='black-ribbon d-flex align-items-center justify-content-between'>
                <span className='form-heading'>Draw your project area on the map</span>
                <button type="submit" className={`btn ${(confirmProjectAreaButton == true) ? null : 'disabled'}`} onClick={(e) => confirmProjectArea(e)}>
                    <span className="bi bi-lock-fill"></span>
                    <span className="mx-1">Confirm project area</span>
                </button>
            </div>
            <div className="map-container">
                {/* Map will be loaded here */}
                {isLoaded
                    ?
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

                        {/* Rendering the Polyline*/}
                        {path.length > 0 && (
                            <Polyline
                                path={path}
                                options={geometryOptions}
                            />
                        )}

                        {/* Rendering the Polygon*/}
                        {path.length > 0 && (
                            <Polygon
                                paths={path}
                                options={geometryOptions}
                            />
                        )}


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
                                <div key="index" className={`poi-input ${(latLng == '') ? 'empty' : null} ${index === selectedInput ? 'editable' : ''} ${((showError.includes(index))) ? 'show-error' : null}`}>
                                    <span className="prefix">

                                        {(() => {
                                            switch (areaType) {
                                                case 'Single Point':
                                                    return 'POI';
                                                case 'Path':
                                                    switch (index) {
                                                        case 0:
                                                            return 'PATH A';
                                                        case 1:
                                                            return 'PATH B';
                                                        default:
                                                            return null;
                                                    }
                                                case 'Area':
                                                    return `POINT ${index + 1}`;
                                                default:
                                                    return null;
                                            }
                                        })()}

                                        {latLng ? (<span className="dot-circle"></span>) : null}
                                    </span>

                                    <input type="text" id={`latLngInput${index}`} value={latLng} name="latLng" onChange={(e) => addLatLng(e.target.value, index, formData)} />
                                    <button type="button" onClick={(e) => onSave(e, index)} className="btn save-marker-btn"><span class="bi bi-save"></span></button>
                                    <button type="button" onClick={() => editInputField(index)} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                                    <button type="button" onClick={() => editInputField(index)} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                                    <button type="button" onClick={(e) => clearInputField(e, index, formData)} className="btn delete-btn"><span class="bi bi-x"></span></button>
                                </div>
                            ))}
                            <div className="d-flex gap-2">
                                {/* Button to add input field */}
                                {areaType === 'Area' && showEnterCoordinate && (
                                    <button
                                        type="button"
                                        className="btn main-project-area"
                                        onClick={(e) => addInputField(e, formData)}
                                    >
                                        <i className="bi bi-plus-circle"></i>
                                        Enter coordinates
                                    </button>
                                )}

                                {/* Button to close area */}
                                {areaType === 'Area' && showCloseArea && (
                                    <button
                                        type="button"
                                        className="btn main-project-area"
                                        onClick={(e) => closeArea(e)}
                                    >
                                        <i className="bi bi-flag-fill"></i>
                                        Close area
                                    </button>
                                )}
                            </div>
                        </div>
                    </GoogleMap>
                    :
                    null}
            </div>
        </form >
    )
}

export default ProjectLocation;