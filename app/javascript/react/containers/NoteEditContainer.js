import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import EditNoteFormComponent from "../components/EditNoteFormComponent"

const NoteEditContainer = props => {
  const editNote = (editFormPayload) =>{
    fetch(`/api/v1/trails/${props.note.trail_id}/notes/${props.note.id}`, {
      credentials: "same-origin",
      method: 'PATCH',
      body: JSON.stringify(editFormPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedNote => {
      let note = parsedNote.note
      if (typeof props.onNoteEdited === 'function') {
        props.onNoteEdited(note);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div>
      <h4 className="show-title">Edit Note</h4>
      <EditNoteFormComponent
        editNote={editNote}
        />
    </div>
  )
}

export default NoteEditContainer
