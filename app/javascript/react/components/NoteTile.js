import React from "react";

const NoteTile = (props) => {


  let deleteButton = <></>;
  let editButton = <></>;

  if (props.canDelete) {
    deleteButton = <input id={`${props.note.id}`}
                    type="button"
                    value="Delete"
                    onClick={props.onDeleteClicked}
                    className="hollow button"></input>
    editButton = <input id={`${props.note.id}`}
                    type="button"
                    value="Edit"
                    onClick={props.onEditClicked}
                    className="hollow button"></input>
  }
    return (
        <div>
          <div>
            <div>
              <span className="bold"> User: </span>{props.note.user_name}
            </div>
            <div>
              <span className="bold"> Trail Notes: </span>{props.note.note}
            </div>
            <div>
              {deleteButton} {editButton}
            </div>
            <hr/>
          </div>
        </div>
    );
};

export default NoteTile;
