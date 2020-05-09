import React, { useState, useEffect } from "react";

const TrailData = (props) => {
  let [ data, setData ] = useState({
    name: "",
    location: "",
    summary: "",
    length: 0.0,
    ascent: 0,
    conditionStatus: "",
    conditionDetails: ""
  });

  useEffect(() => {
    if (!props.apiId) {
      return;
    }
    
    const id = props.apiId;
    fetch(`/api/v1/trail_data/${id}`)
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
        setData(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.apiId]);

  return (
    <div>
      <div className="grid-container no-padding">
        <div className="grid-x grid-margin-x">
          <h3 className="small-8 large-10">{data.name}</h3>
        </div>
        <h4>Trail Information:</h4>
        <ul>
          <li>Location: {data.location}</li>
          <li>Description: {data.summary}</li>
          <li>Trail Length: {data.length}</li>
          <li>Ascent: {data.ascent}</li>
          <li>Trail Condition: {data.conditionStatus}</li>
          <li>Condition Details: {data.conditionDetails}</li>
        </ul>
  </div>
    </div>
  )
}

export default TrailData;
