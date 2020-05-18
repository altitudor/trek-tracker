import React, { useState } from 'react'
import _ from "lodash"
import { Link } from 'react-router-dom'

import ErrorList from "./ErrorList"

const EditNoteFormComponent = props =>{
  const [errors, setErrors] = useState({})
  const [editFormPayload, setEditFormPayload] = useState({
    note: ""
  })

  const handleInputChange = event => {
    setEditFormPayload({
      ...editFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["note"]
    requiredFields.forEach(field => {
      if (editFormPayload[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.editNote(editFormPayload)
      setEditFormPayload({
        note: ""
      })
      setErrors({})
    }
  }

  return(
    <div>
      <div className="grid-container new-form-box bottom-space">
        <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />
          <label className="note">
            Note:
            <input
              name="note"
              id="note"
              type="text"
              onChange={handleInputChange}
              value={editFormPayload.note}
            />
          </label>

          <div className="button-group">
            <input className="button" type="submit" value="Update Note" />
          </div>
        </form>
    </div>
    <div className="bottom-bar">
      <Link to="/">Back to Home</Link>
    </div>
  </div>

  )
}

export default EditNoteFormComponent
