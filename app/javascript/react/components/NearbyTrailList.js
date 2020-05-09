import React, { useState, useEffect } from "react";

const NearbyTrailList = (props) => {
  let [ trails, setTrails ] = useState([]);

  useEffect(() => {
    const lat = props.coords.latitude;
    const lon = props.coords.longitude;
    fetch(`/api/v1/nearby_trails_data?lat=${lat}&lon=${lon}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.trails) {
          let trailData = body.trails;
          setTrails(trailData);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.coords]);

  let trailsInfo;
  trailsInfo = trails.map((trail)=> {
    return(
      <div key={trail.id} className="grid-container no-padding">
        <div className="grid-x grid-margin-x">
          <h3 className="small-8 large-10">{trail.name}</h3>
        </div>
        <h4>Trail Information:</h4>
        <ul>
          <li>Location: {trail.location}</li>
          <li>Description: {trail.summary}</li>
          <li>Trail Length: {trail.length}</li>
          <li>Ascent: {trail.ascent}</li>
          <li>Trail Condition: {trail.conditionStatus}</li>
          <li>Condition Details: {trail.conditionDetails}</li>
        </ul>
      </div>
    )
  })

  return (
    <div>
    Nearby Trails: 
    {trailsInfo}
  </div>
  )
}

export default NearbyTrailList;
