import React, { useState, useEffect } from "react";

import NearbyTrailList from "../components/NearbyTrailList";

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
    <div>
    <NearbyTrailList
    coords={coords}
    />
    </div>
  )
}

export default NearbyTrailsContainer
