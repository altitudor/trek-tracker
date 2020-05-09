import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import NoteTile from "../components/NoteTile";

import TrailNoteFormContainer from "./TrailNoteFormContainer"
import TrailData from "../components/TrailData"

const TrailShowContainer = (props) => {
  const [trail, setTrail] = useState({ notes: []});
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
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
  }, []);

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
      return <NoteTile
        key={note.id}
        note={note}
        canDelete={props.user.admin}
        onDeleteClicked={deleteNote} />;
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

  return (
    <div>
      <div className="grid-container no-padding">
        <div className="grid-x grid-margin-x">
          <h3 className="small-8 large-10">{trail.name}</h3>
        </div>
      </div>
      {noteForm}
      <div className="note">
        <h4>Trail Notes:</h4>
        {noteTiles}
      </div>
      <div className="data">
        <TrailData apiId={trail.api_id}
        />
      </div>
      <Link to="/" className="button">All Trails</Link>
    </div>
  );
};

export default TrailShowContainer;
