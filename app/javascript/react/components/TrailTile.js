import React from "react";
import { Link } from "react-router-dom";
import FavoriteComponent from "./FavoriteComponent";

const TrailTile = (props) => {
  let deleteButton = <></>;

  if (props.user.admin) {
    deleteButton = <input id={`${props.trail.id}`} type="button" value="Delete" onClick={props.deleteClick} className="hollow button"></input>
  }

  return (
    <div className="trail-tile">
      <FavoriteComponent
        api_id={props.trail.api_id}
      />
      <Link to={`/trails/${props.trail.id}`}>{props.trail.name}</Link>
      <div>
        {deleteButton}
      </div>
    </div>
  );
};

export default TrailTile;
