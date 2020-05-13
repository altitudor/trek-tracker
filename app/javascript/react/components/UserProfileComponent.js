import React from "react"

const UserProfileComponent = props => {
return (
    <div>
      <img className="profile-pic" src={props.user.profile_photo.url}></img>
      <div className="user-info">
        <h1>{props.user.user_name}</h1>
      </div>
    </div>
  )
}

export default UserProfileComponent
