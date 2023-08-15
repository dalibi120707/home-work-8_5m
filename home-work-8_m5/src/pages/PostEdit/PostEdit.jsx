import React, { useState } from 'react'
import classes from './PostEdit.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchEditPost } from '../../store/postsSlice'

const PostEdit = () => {
  const [valueInput, setValueInput] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const location = useLocation()

  const handleSubmitForm = e => {
    e.preventDefault()
    dispatch(
      fetchEditPost({
        id: location.state.id,
        newText: valueInput
      })
    )
    navigate('/')
  }

  return (
    <div>
      <h1 className={classes.title}>Post Edit</h1>
      <form onSubmit={handleSubmitForm} className={classes.form}>
        <input
          className={classes.form__input}
          type="text"
          placeholder="New Title"
          value={valueInput}
          onChange={e => {
            setValueInput(e.target.value)
          }}
        />
        <button className={classes.form__btn}>Send</button>
      </form>
    </div>
  )
}

export default PostEdit
