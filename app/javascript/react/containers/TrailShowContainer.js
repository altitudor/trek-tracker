import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import NoteTile from "../components/NoteTile";

import TrailNoteFormContainer from "./TrailNoteFormContainer"

const TrailShowContainer = (props) => {
  const [trail, setTrail] = useState({});
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);

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
        setNotes(body.trail.notes);
        setUser(body.trail.user)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let noteTiles;
  if (notes.length === 0) {
    noteTiles = <div><p> No notes yet</p></div>
  } else {
    noteTiles = notes.map((note) => {
      return <NoteTile key={note.id} note={note} />
    });
  }

  const rerender = (note) => {
    setNotes(
      [...notes, note]
    )
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
      <Link to="/" className="button">All Trails</Link>
    </div>
  );
};

export default TrailShowContainer;
