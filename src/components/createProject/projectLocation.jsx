import React, {useState} from "react";

function ProjectLocation() {
    const areaTypes = ['Single Point', 'Path', 'Area'];
    const [formData, setFormData] = useState({
        area_type: 'Single Point',
        area_latLng: []
    });

    return (
        <form className='map-body'>
            <div className='black-ribbon d-flex align-items-center justify-content-between'>
                <span className='form-heading'>Draw your project area on the map</span>
                <button type="submit" className="btn" disabled>
                    <span class="bi bi-lock-fill"></span>
                    <span class="mx-1">Confirm project area</span>
                </button>
            </div>
            <div className="map-container">
                <div className="map" id="map">
                    {/* Map will be loaded here by using google map package */}
                </div>

                <div class="map-overlay">
                    <div class="search-field">
                        <span class="bi bi-search"></span>
                        <input type="text" placeholder="Navigate to location" />
                    </div>

                    <div class="map-area">
                        <div class="yellow-line"></div>
                        <span className='form-heading'>
                            <span class="bi bi-bounding-box-circles mx-2"></span>
                            Main project area
                        </span>

                        <label className="mt-3 d-block form-label">Area type</label>
                        <div className="area-tabs">
                            {areaTypes.map(areaType => (
                                <button
                                    key={areaType}
                                    type="button"
                                    className={`btn btn-lg ${formData.area_type === areaType ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, area_type: areaType })}
                                >
                                    {areaType}
                                </button>
                            ))}
                        </div>

                        <label className="mt-4 d-block form-label text-yellow">Define Project area</label>
                        <div class="poi-input empty">
                            <span className="prefix">POI</span>
                            <input type="text" />
                            <button type="button" onClick={()=> alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" onClick={()=> alert('click on edit')} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={()=> alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div>
                        <div class="poi-input">
                            <span className="prefix">POI</span>
                            <input type="text" value="22.551562, 75.565152"/>
                            <button type="button" onClick={()=> alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" onClick={()=> alert('click on edit')} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={()=> alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div>
                        <div class="poi-input editable">
                            <span className="prefix">POI</span>
                            <input type="text" value="22.551562, 75.565152"/>
                            <button type="button" onClick={()=> alert('enable input')} className="btn enable-marker-btn">Locate on map or enter coordinates</button>
                            <button type="button" onClick={()=> alert('click on edit')} className="btn edit-btn"><span class="bi bi-pencil"></span></button>
                            <button type="button" onClick={()=> alert('click on delete')} className="btn delete-btn"><span class="bi bi-x"></span></button>
                        </div>
                    </div>
                </div>
                
            </div>
        </form>
    )
}

export default ProjectLocation;