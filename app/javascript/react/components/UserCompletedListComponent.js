import React from "react";
import { Link } from "react-router-dom";

import CompletedTrailComponent from "./CompletedTrailComponent";

const UserCompletedListComponent = (props) => {

const userCompletedTrails = props.completedTrails.map((completedTrail) => {
  let star = <></>
  if (props.canEdit) {
    star = <CompletedTrailComponent
        api_id={completedTrail.id}
    />
  }

  return <div key={completedTrail.id}>
      {star}
      <h4>{completedTrail.name}</h4>
    <ul>
      <li>{completedTrail.location}</li>
      <img src={completedTrail.imgSmall}/>
    </ul>
  </div>
})

  return (
    <div>
      <h3>Your Completed Hikes:</h3>
      {userCompletedTrails}
    </div>
  );
};

export default UserCompletedListComponent;
