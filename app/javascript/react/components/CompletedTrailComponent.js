import React, { useState, useEffect } from "react";

const CompletedTrailComponent = (props) => {
  let [ completedTrail, setCompletedTrail ] = useState(null);

  useEffect(() => {
    if (!props.api_id) {
      return
    }
    fetch(`/api/v1/completed_trails/${props.api_id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
          setCompletedTrail(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.api_id]);

  let iconClass = ""
    if (completedTrail === true) {
        iconClass = "fas fa-star"
    } else if (completedTrail === false) {
        iconClass = "far fa-star"
    }

    const handleClick = (event) => {
      if (completedTrail ===false) {
        fetch(`/api/v1/completed_trails`, {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify({"api_id": props.api_id}),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
      } else if (completedTrail === true) {
        fetch(`/api/v1/completed_trails/${props.api_id}`, {
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
      }
      setCompletedTrail(!completedTrail)
    }

    let icon = <></>
    if (iconClass) {
    icon = <div onClick={handleClick}><i className={iconClass}></i></div>
  }

  return (
    <div>
     {icon}
  </div>
  )
}

export default CompletedTrailComponent;
