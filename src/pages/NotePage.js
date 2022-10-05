import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = ({ match, history }) => {
  
    let { id: noteId } = useParams()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [noteId])

    let getNote = async ()=> {
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    let handleSubmit = () => {
        updateNote()
        history.push('/')
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            <Link to="/">
                <button onClick={deleteNote}>Delete</button>
            </Link>
        </div>
        <textarea onChange={(e) => { setNote({...note, 'body': e.target.value }) }} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage