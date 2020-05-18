import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import NoteTile from "../components/NoteTile";

import TrailNoteFormContainer from "./TrailNoteFormContainer"
import TrailData from "../components/TrailData"
import NoteEditContainer from "./NoteEditContainer"
import EditNoteFormComponent from "../components/EditNoteFormComponent"

const TrailShowContainer = (props) => {
  const id = props.match.params.id;
  const [trail, setTrail] = useState({ notes: []});
  const [user, setUser] = useState({});
  const [editNote, setEditNote] = useState({});

  useEffect(() => {
    fetch(`/api/v1/trails/${id}`)
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
        setTrail(body.trail);
        setUser(body.trail.user)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [id]);

  const fetchDeleteNote = (noteID) => {
    fetch(`/api/v1/trails/${trail.id}/notes/${noteID}`, {
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
    .then(data => {
      setTrail(data.trail)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let noteTiles;
  if (trail.notes.length === 0) {
    noteTiles = <div><p> No notes yet</p></div>
  } else {
    const deleteNote = (event) => {
      event.preventDefault();
      fetchDeleteNote(event.currentTarget.id)
    };

    noteTiles = trail.notes.map((note) => {
      const onEditClicked = (event) => {
        setEditNote({ ...note, trail_id: id });
      }

      return <NoteTile
        key={note.id}
        note={note}
        canDelete={props.user.admin || props.user.id === note.user_id}
        onDeleteClicked={deleteNote}
        onEditClicked={onEditClicked} />;
    });
  }

  const rerender = (note) => {
    let newTrail = {...trail, notes: [...trail.notes, note]};
    setTrail(newTrail);
  }

  let noteForm;
  if (user.userName != null) {
    noteForm = <TrailNoteFormContainer
      id={props.match.params.id}
      rerender={rerender}
      user={user} />
  } else {
    noteForm = <></>
  }

  const onNoteEdited = (note) => {
    let newNotes = trail.notes.map(oldNote => {
      if (oldNote.id === note.id) {
        return note;
      } else {
        return oldNote;
      }
    });

    let newTrail = { ...trail, notes: newNotes };
    setEditNote({});
    setTrail(newTrail);
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
        <div className="cell small-6 callout">
          <TrailData apiId={trail.api_id}
          />
          <Link to="/" className="button">All Trails</Link>
        </div>
        <div className="cell small-6">
          {noteForm}
          <div className="cell small-6 callout">
            <h4>Notes from other users about {trail.name}</h4>
            {noteTiles}
          </div>
          <div>
          {editNoteForm}
          </div>
        </div>
      </div>
    </div>

  );
};

export default TrailShowContainer;
