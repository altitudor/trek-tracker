import React, { useState, useEffect } from "react";

import NearbyTrailList from "../components/NearbyTrailList";
import NearbyWeatherComponent from "../components/NearbyWeatherComponent";

const NearbyTrailsContainer = (props) => {
  const [coords, setCoords] = useState({})

  useEffect(() => {
    function showPosition(position) {
      setCoords(position.coords)
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);


  return(
    <div className="grid-container">
    <div className="grid-x grid-margin-x">
      <div className="cell small-6 callout">
        <NearbyTrailList
          coords={coords}
        />
      </div>
      <div className="cell small-6 callout">
        <NearbyWeatherComponent
          coords={coords}
        />
      </div>
    </div>
    </div>
  )
}

export default NearbyTrailsContainer
