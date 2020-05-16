import React from "react"
import NoteTile from "./NoteTile"

const UserNotesComponent = props => {

  let allNotes = null
  if (props.notes.length > 0) {
    allNotes = props.notes.map((note) => {
      return(
        <NoteTile
          key={note.id}
          note={note}
          canDelete={props.currentUser && (props.currentUser.admin ||
             props.currentUser.id === note.user_id)}
          onDeleteClicked={() => props.onDeleteClicked(note)}
        />
      )
    })
  }

  return (
    <div>
      <div className="user-notes">
        <h3>Your Trail Notes:</h3>
        {allNotes}
      </div>
    </div>
  )
}

export default UserNotesComponent
