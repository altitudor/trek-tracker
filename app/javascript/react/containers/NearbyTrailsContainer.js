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
    <div className="grid-container no-padding">
      <div className="cell grid-x grid-margin-x">
        <NearbyTrailList
          coords={coords}
        />
      </div>
      <div className="cell grid-x grid-margin-x">
        <NearbyWeatherComponent
          coords={coords}
        />
      </div>
    </div>
  )
}

export default NearbyTrailsContainer
