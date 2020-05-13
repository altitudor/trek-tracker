import React from "react";
import { Link } from "react-router-dom";
import FavoriteComponent from "./FavoriteComponent";

const UserFavoriteList = (props) => {

const userFavorites = props.favorites.map((favorite) => {
  let star = <></>
  if (props.canEdit) {
    star = <FavoriteComponent
        api_id={favorite.id}
    />
  }

  return <div key={favorite.id}>
      {star}
      <h4>{favorite.name}</h4>
    <ul>
      <li>{favorite.location}</li>
      <img src={favorite.imgSmall}/>
    </ul>
  </div>
})

  return (
    <div>
      <h3>Your Favorite Hikes:</h3>
      {userFavorites}
    </div>
  );
};

export default UserFavoriteList;
