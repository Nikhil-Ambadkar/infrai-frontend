import React, { useState, useRef, useEffect } from "react";
import DropFileInput from "../shared/documentUploader";
import { GoogleMap, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';

function ProjectMap({ props }) {

  const addProjectFiles = props.addProjectFiles;
  const componentId = props.componentId;
  const projectMap = props.projectMap;
  const projectDetails = props.project;

  const libraries = ['places', 'drawing', 'geometry'];

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAuXC6KUcWLY2JgTvF_-tVJadNl-29lz4Q",
    libraries
  });

  const defaultCenter = {
    lat: 22.7196,
    lng: 75.8577,
  }
  const containerStyle = {
    width: '100%',
    height: '100vh',
  }

  const geometryOptions = {
    fillOpacity: 0.3,
    fillColor: '#FCC331',
    strokeColor: '#FCC331',
    strokeWeight: 5
  }

  const [projectMapConfirmed, setProjectMapConfirmed] = useState(false);
  const [center, setCenter] = useState(defaultCenter);
  const [scale, setScale] = useState();
  const [path, setPath] = useState();

  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const [markerInstance, setMarkerInstance] = useState(null);
  const areaLatLng = projectDetails.areaLatLng;

  const projectMapConfirm = () => {
    setProjectMapConfirmed(true);
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

  const getCoordinates = () => {
    if (areaLatLng && areaLatLng.length > 0) {
      return areaLatLng.map((latlng, index) => {
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

  useEffect(() => {
    if (areaLatLng) {
      const coordinates = getCoordinates();
      setPath(coordinates);
    }
  }, [areaLatLng]);


  return (

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
                      <input type="text" className="form-control" onChange={(e) => setScale(e.target.value)} />
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
        <>
          <div className="black-ribbon d-flex align-items-center justify-content-between">
            <span className="form-heading">Place your uploaded map in the designated area</span>
            <a href="#" className="link-secondary">Skip this step</a>
            <button type="submit" className="btn" onClick={(e) => (projectMapConfirm())}>
              <span className="bi bi-lock-fill"></span>
              <span className="mx-1">Confirm map placement</span>
            </button>
          </div>
          <div className="map-container">
            <div className="row m-0">
              <div className="col-md-9 p-0">
                <div className="map" id="map">
                  {/* Map will be loaded here by using google map package */}
                  {isLoaded && path
                    ?
                    <GoogleMap
                      zoom={15}
                      center={center}
                      onLoad={onLoadMap}
                      mapContainerStyle={containerStyle}
                      onTilesLoaded={() => setCenter(null)}
                    >

                      {path.length > 0 && (
                        <Polyline
                          path={path}
                          options={geometryOptions}
                        />
                      )}

                      {path.length > 0 && (<Polygon
                        paths={path} // Use your existing coordinates here
                        options={geometryOptions}
                      />
                      )}

                    </GoogleMap>
                    :
                    null}
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
        </>
        :
        null
      }
    </div >
  );
}

export default ProjectMap;
