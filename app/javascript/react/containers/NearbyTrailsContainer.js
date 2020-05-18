import React, { useState, useEffect } from "react";

import NearbyTrailList from "../components/NearbyTrailList";
import NearbyWeatherComponent from "../components/NearbyWeatherComponent";

import Loader from 'react-loader-spinner';

const NearbyTrailsContainer = (props) => {
  const [coords, setCoords] = useState({})
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    function showPosition(position) {
      setCoords(position.coords)
      setShowLoader(false)
    }
    if (navigator.geolocation) {
      setShowLoader(true)
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  let loader = <></>
  if (showLoader === true) {
  loader = <Loader
       type="RevolvingDot"
       color="#80BDEB"
       height={100}
       width={100}
       timeout={3000} //3 secs
    />
  }


  return(
    <div>
    <div className="loader"> {loader} </div>
    <div className="grid-container">
    <div className="grid-x grid-margin-x">
      <div className="cell small-6 callout">
        <NearbyTrailList
          coords={coords}
          user={props.user}
        />
      </div>
      <div className="sticky cell small-6 callout">
        <NearbyWeatherComponent
          coords={coords}
        />
      </div>
    </div>
    </div>
    </div>
  )
}

export default NearbyTrailsContainer
