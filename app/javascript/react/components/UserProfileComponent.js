import React from "react"

const UserProfileComponent = props => {

let profile_photo = <></>
if (props.user.profile_photo.url) {
  profile_photo = <img className="profile-pic" src={props.user.profile_photo.url}></img>
}

return (
    <div>
      {profile_photo}
      <div className="user-info">
        <h1>{props.user.user_name}</h1>
      </div>
    </div>
  )
}

export default UserProfileComponent
