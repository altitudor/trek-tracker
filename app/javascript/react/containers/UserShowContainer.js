import React, { useState, useEffect} from 'react'
import UserProfileComponent from "./../components/UserProfileComponent"
import UserNotesComponent from "./../components/UserNotesComponent"
import UserFavoriteList from '../components/UserFavoriteList'

const UserShowContainer = (props) => {

  const defaultUserData = {
    email: "",
    user_name: "",
    profile_photo: {}
  }

  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(defaultUserData)
  const [favorites, setFavorites] = useState([])

  let userID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/users/${userID}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(data => {
      setUser(data.user)
      setNotes(data.user.notes)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))

    fetch(`/api/v1/favorite_trails_data/${userID}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(data => {
      setFavorites(data.favorites)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [userID])

  const onDeleteClicked = (noteID) => {
    fetch(`/api/v1/notes/${noteID}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(trail=> {
      let newNoteList = notes.filter((item) => {
        const keepNote = (item.id !== noteID)
        return keepNote
      })
      setNotes(newNoteList)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let userProfile = <></>;
  if (user.email) {
    userProfile = <UserProfileComponent user={user} />;
  }
    
  return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
              <div className="profile">
              {userProfile}
              </div>
            <div className="cell small-6 callout">
              <div>
              <UserNotesComponent 
                notes={notes} 
                onDeleteClicked={onDeleteClicked} 
                currentUser={props.user}
              />
              </div>
            </div>
            </div>
            <div className="cell small-6 callout">
              <UserFavoriteList
                favorites={favorites}
                canEdit={props.user.user_id === user.user_id}
              />
            </div>
          </div>
        </div>
  )
}

export default UserShowContainer