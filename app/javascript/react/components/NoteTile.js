import React from "react";

const NoteTile = (props) => {
  let deleteButton = <></>;

  if (props.canDelete) {
    deleteButton = <input id={`${props.note.id}`} type="button" value="Delete" onClick={props.onDeleteClicked} className="hollow button"></input>
  }
    return (
        <div className="card">
          <div className="card-divider">
            {props.note.user}
          </div>
          <div className="card-section" >
            {props.note.note}
          </div>
          <div>
          {deleteButton}
          </div>
        </div>
    );
};

export default NoteTile;
