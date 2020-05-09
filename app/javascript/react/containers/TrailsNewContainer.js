import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ErrorList from "../components/ErrorList.js";

const TrailsNewContainer = (props) => {
  const fields = ["name"];
  const [trailRecord, setTrailRecord] = useState({
    name: ""
  });
  const [newRecord, setNewRecord] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setTrailRecord({
      ...trailRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    const requiredFields = ["name"]
    requiredFields.forEach(field => {
      if (trailRecord[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: `${field} is blank`,
        };
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      let formPayload = {
        trail: trailRecord,
      };
      fetch("/api/v1/trails", {
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
          let newTrail = body.trail;
          setNewRecord(newTrail);
          setShouldRedirect(true);
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }
  };

  if (shouldRedirect) {
    return <Redirect to={`/trails/${newRecord.id}`} />;
  }

  return (
    <div>
      <ErrorList errors={errors} />
      <div className="callout">
        <h4 className="center">Add a Trail</h4>
        <form className="new-trail" onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              id="name"
              onChange={handleChange}
              value={trailRecord.name}
            />
          </label>
          <input className="button center" type="submit" value="Submit" />
        </form>
      </div>
      <Link to="/" className="button center">All Trails</Link>
    </div>
  );
};

export default TrailsNewContainer;
