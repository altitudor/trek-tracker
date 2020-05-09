import React from "react";
import { Link } from "react-router-dom";

const TrailTile = (props) => {
  let deleteButton = <></>;

  if (props.user.admin) {
    deleteButton = <input id={`${props.trail.id}`} type="button" value="Delete" onClick={props.deleteClick} className="hollow button"></input>
  }

  return (
    <div className="trail-tile">
      <Link to={`/trails/${props.trail.id}`}>{props.trail.name}</Link>
      <div>
      {deleteButton}
      </div>
    </div>
  );
};

export default TrailTile;
