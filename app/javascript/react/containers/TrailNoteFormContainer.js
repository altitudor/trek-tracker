import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ErrorList from "../components/ErrorList.js";

const NoteFormContainer = (props) => {
  const [noteRecord, setNoteRecord] = useState({
    note: ""
   });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setNoteRecord({
      ...noteRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    if (noteRecord["note"].trim() === "") {
      submitErrors = {
        ...submitErrors,
        ["note"]: "Please leave a note"
      };
    }

    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      let formPayload = {
        note: {
          note: noteRecord.note,
          user_id: props.user.id,
          trail_id: props.id
        }
      };
      fetch(`/api/v1/trails/${props.id}/notes`, {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(formPayload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            response.json().then((body) => setErrors(body.error));
            let errorMessage = `${response.status} (${response.statusText})`;
            let error = new Error(errorMessage);
            throw error;
          }
        })
        .then((response) => response.json())
        .then((body) => {
          props.rerender(body.note)
          setNoteRecord({
            note: ""
           })
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }
  };

  return (
    <div className="callout">
      <ErrorList errors={errors} />
      <h4>Add a Note:</h4>
      <form className="new-note" onSubmit={onSubmit}>
        <label>
          Note:
          <input
            type="text"
            id="note"
            onChange={handleChange}
            value={noteRecord.note}
          />
        </label>

        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NoteFormContainer;
