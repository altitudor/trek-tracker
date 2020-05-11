import React, { useState, useEffect } from "react";

const FavoriteComponent = (props) => {
  let [ favorite, setFavorite ] = useState(null);

  useEffect(() => {
    if (!props.api_id) {
      return
    }
    fetch(`/api/v1/favorites/${props.api_id}`)
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
          setFavorite(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.api_id]);

  let iconClass = ""
    if (favorite === true) {
        iconClass = "fas fa-star"
    } else if (favorite === false) {
        iconClass = "far fa-star"
    } 
   
    const handleClick = (event) => {
      if (favorite ===false) {
        fetch(`/api/v1/favorites`, {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify({"api_id": props.api_id}),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
      } else if (favorite === true) {
        fetch(`/api/v1/favorites/${props.api_id}`, {
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
      }
      setFavorite(!favorite)
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

export default FavoriteComponent;
