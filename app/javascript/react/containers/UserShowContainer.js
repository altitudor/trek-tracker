import React, { useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import UserProfileComponent from './../components/UserProfileComponent'
import UserNotesComponent from './../components/UserNotesComponent'
import UserFavoriteList from '../components/UserFavoriteList'
import UserCompletedListComponent from '../components/UserCompletedListComponent'
import NoteEditContainer from './NoteEditContainer'

import {CircleArrow as ScrollUpButton} from 'react-scroll-up-button';


const UserShowContainer = (props) => {

  const defaultUserData = {
    email: "",
    user_name: "",
    profile_photo: {}
  }

  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(defaultUserData);
  const [favorites, setFavorites] = useState([]);
  const [editNote, setEditNote] = useState({});
  const [completedTrails, setCompletedTrails] = useState([]);

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

    fetch(`/api/v1/completed_trails_data/${userID}`)
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
      setCompletedTrails(data.completed_trails)
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

  const onDeleteClicked = (note) => {
    fetch(`/api/v1/trails/${note.trail_id}/notes/${note.id}`, {
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
        const keepNote = (item.id !== note.id)
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

  const onEditClicked = (note) => {
    setEditNote(note);
  }

  const onNoteEdited = (note) => {
    let newNotes = notes.map(oldNote => {
      if (oldNote.id === note.id) {
        return note;
      } else {
        return oldNote;
      }
    });

    setEditNote({});
    setNotes(newNotes);
  }

  let editNoteForm;
  if (editNote.id) {
    editNoteForm = <NoteEditContainer
      note={editNote}
      onNoteEdited={onNoteEdited}
    />
  } else {
    editNoteForm = <></>
  }


  return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
              <div className="profile">
              {userProfile}
              </div>
            <div className="cell small-4 callout">
              <div>
              <UserNotesComponent
                notes={notes}
                onDeleteClicked={onDeleteClicked}
                onEditClicked={onEditClicked}
                currentUser={props.user}
              />
              </div>
              <div>
                {editNoteForm}
              </div>
            </div>
            </div>
            <div className="cell small-3 callout">
              <UserFavoriteList
                favorites={favorites}
                canEdit={props.user.user_id === user.user_id}
              />
            </div>
            <div className="cell small-3 callout">
              <UserCompletedListComponent
                completedTrails={completedTrails}
                canEdit={props.user.user_id === user.user_id}
              />
            </div>
            <div>
              <ScrollUpButton />
            </div>
          </div>
          <div className="bottom-bar">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
  )
}

export default UserShowContainer
