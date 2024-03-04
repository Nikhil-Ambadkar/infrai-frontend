import {
  GoogleMap,
  Polygon,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { MAP_KEY } from "../../shared/constants/mapKeyConstant";
import DropFileInput from "../../shared/sharedComponents/documentUploader";
const libraries = ["places", "drawing", "geometry"];
function ProjectMap({ props }) {
  const componentId = 3;

  const projectDetails = props.project;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAP_KEY,
    libraries,
  });

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const geometryOptions = {
    fillOpacity: 0.3,
    fillColor: "#FCC331",
    strokeColor: "#FCC331",
    strokeWeight: 5,
  };

  const [projectMapConfirmed, setProjectMapConfirmed] = useState(false);
  const [center, setCenter] = useState({});
  const [scale, setScale] = useState();
  const [path, setPath] = useState();
  const [projectMap, setProjectMap] = useState(null);

  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const [markerInstance, setMarkerInstance] = useState(null);
  const areaLatLng = projectDetails.areaLatLng || [];

  useEffect(() => {
    const coordinatesString = areaLatLng[0];

    // Split the string into an array using the comma as the delimiter
    const coordinatesArray = coordinatesString.split(", ");

    // Extract the latitude and longitude values
    const latitude = parseFloat(coordinatesArray[0]);
    const longitude = parseFloat(coordinatesArray[1]);

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    const lat = latitude;
    const lng = longitude;
    setCenter({
      lat: lat,
      lng: lng,
    });
  }, [areaLatLng]);

  console.log(areaLatLng);

  const projectMapConfirm = () => {
    setProjectMapConfirmed(true);
  };

  const onLoadMap = (map) => {
    map.setMapTypeId("satellite");
    mapRef.current = map;
    map.setOptions({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [], // To remove options of map view
      },
    });
  
    // If there are coordinates in the path array, create a Polygon or Polyline component
    if (path && path.length > 0) {
      if (path.length === 1) {
        // Single point, create a marker
        const newMarkerInstance = new window.google.maps.Marker({
          position: path[0],
          map: mapRef.current, // Use the map reference from useRef
          title: "Marker Title", // Optionally, set a title for the marker
        });
        setMarkerInstance(newMarkerInstance);
      } else if (path.length > 1) {
        // Path or area, create a Polygon or Polyline component
        if (path.length === 2) {
          // Path, create a Polyline component
          const polyline = new window.google.maps.Polyline({
            path: path,
            map: mapRef.current,
            options: geometryOptions,
          });
          polygonRefs.current.push(polyline);
        } else if (path.length > 2) {
          // Area, create a Polygon component
          const polygon = new window.google.maps.Polygon({
            paths: path,
            map: mapRef.current,
            options: geometryOptions,
          });
          polygonRefs.current.push(polygon);
        }
      }
    }
  };

  const getCoordinates = () => {
    if (areaLatLng && areaLatLng.length > 0) {
      return areaLatLng
        .map((latlng, index) => {
          if (typeof latlng === "string") {
            const [lat, lng] = latlng.split(", ");
            if (lat && lng) {
              return { lat: parseFloat(lat), lng: parseFloat(lng) };
            }
          }
          return null;
        })
        .filter(Boolean);
    }
    return [];
  };

  useEffect(() => {
    if (areaLatLng) {
      const coordinates = getCoordinates();
      setPath(coordinates);
    }
  }, [areaLatLng]);

  const addProjectFiles = (files, componentId) => {
    //Below we are adding condition by which as user added file it will render on page
    if (componentId == 3) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        //from here only we will send projectMap to formData
        setProjectMap(reader.result);
      };
      if (file) {
        // Read the file as data URL
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="map-body">
      {/* Upload Map */}
      {!projectMap && !projectMapConfirmed ? (
        <>
          <div className="black-ribbon d-flex align-items-center justify-content-between">
            <span className="form-heading">Upload your project map</span>
          </div>
          <div className="project-map">
            <DropFileInput
              onFileChange={(files, componentId) =>
                addProjectFiles(files, componentId)
              }
              componentId={componentId}
            />
          </div>
        </>
      ) : null}

      {/* Uploaded Map image rendered */}
      {projectMap && !projectMapConfirmed ? (
        <>
          <div className="black-ribbon d-flex align-items-center justify-content-between">
            <span className="form-heading">Confirm your project map</span>
            <button
              type="submit"
              className="btn"
              onClick={(e) => projectMapConfirm()}
            >
              <span className="bi bi-lock-fill"></span>
              <span className="mx-1">Confirm project area</span>
            </button>
          </div>
          <div className="row image-upload-map">
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
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setScale(e.target.value)}
                    />
                    <span>1 to</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Third show map*/}

      {projectMap && projectMapConfirmed ? (
        <>
          <div className="black-ribbon d-flex align-items-center justify-content-between">
            <span className="form-heading">
              Place your uploaded map in the designated area
            </span>
            <a href="#" className="link-secondary">
              Skip this step
            </a>
            <button
              type="submit"
              className="btn"
              onClick={(e) => projectMapConfirm()}
            >
              <span className="bi bi-lock-fill"></span>
              <span className="mx-1">Confirm map placement</span>
            </button>
          </div>
          <div className="map-container">
            <div className="row m-0">
              <div className="col-md-9 p-0">
                <div className="map" id="map">
                  {/* Map will be loaded here by using google map package */}
                  {isLoaded && path ? (
                    <GoogleMap
                      zoom={15}
                      center={center}
                      onLoad={onLoadMap}
                      mapContainerStyle={containerStyle}
                      onTilesLoaded={() => setCenter(null)}
                    >
                      {path.length > 0 && (
                        <Polyline path={path} options={geometryOptions} />
                      )}

                      {path.length > 0 && (
                        <Polygon
                          paths={path} // Use your existing coordinates here
                          options={geometryOptions}
                        />
                      )}
                    </GoogleMap>
                  ) : null}
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
      ) : null}
    </div>
  );
}

export default ProjectMap;
