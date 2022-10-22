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
        if ( noteId === 'new' ) return
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
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
        if (noteId !== 'new' && note.body === ''){
            console.log("DELETE METHOD")
            deleteNote()
        } else if (noteId !== 'new'){
            updateNote()
        } else if (noteId === 'new' && note !== null){
            createNote()
        }
        updateNote()
        history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body':value }))
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            { noteId !== 'new' ? (
                <Link to="/">
                    <button onClick={deleteNote}>Delete</button>
                </Link>
            ) : (
                <Link to="/">
                    <button onClick={handleSubmit}>Done</button>
                </Link>
            )}
                
        </div>
        <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage