import React from "react";

const NoteTile = (props) => {
    return (
        <div className="card">
          <div className="card-divider">
            {props.note.user}
          </div>
          <div className="card-section" >
            {props.note.note}
          </div>
        </div>
    );
};

export default NoteTile;
