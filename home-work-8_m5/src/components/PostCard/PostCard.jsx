import { NavLink } from 'react-router-dom'
import classes from './PostCard.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddComment } from '../../store/postsSlice'

const PostCard = ({ title, body, handleClick, postId }) => {
  const [valueTextArea, setValueTextArea] = useState('')
  const [userId, setUserId] = useState()
  const [activeComments, setActiveComments] = useState(false)

  const dispatch = useDispatch()

  const { commentLoading, commentError } = useSelector(state => state.posts)

  // Записываем value в состояние
  const hanldeChangeTextArea = e => {
    setValueTextArea(e.target.value)
  }

  // Добавляем комментарий, передаем объект с данными
  const handleSubmitForm = e => {
    e.preventDefault()
    dispatch(fetchAddComment({
        postId: postId,
        userId: userId,
        text: valueTextArea
      })
    )
  }

  // Открываем или закрываем поле комментарии
  const handleActiveCommentsClick = () => {
    setActiveComments(prev => !prev)
  }

  return (
    <div className={classes.postCard}>
      <h2 className={classes.postCard__title}>{title}</h2>
      <p className={classes.postCard__body}>{body}</p>
      {/* Передаем айди поста */}
      <NavLink to={'/post-edit'} state={{ id: postId }}>
        <button>Edit Post</button>
      </NavLink>
      <button className={classes.postCard__btn} onClick={handleClick}>
        Delete Post
      </button>
      <button onClick={handleActiveCommentsClick}>Comments</button>
      {activeComments && (
        <form onSubmit={handleSubmitForm}>
          <ul className={classes.ul}>
            <li>Comments</li>
          </ul>
          <textarea
            required
            placeholder="Add Comments"
            onChange={hanldeChangeTextArea}
            className={classes.postCard__textarea}
            name="Comments"
            id="Comments"
            cols="0"
            rows="10"
          ></textarea>
          <input
            required
            onChange={e => {
              setUserId(e.target.value)
            }}
            type="number"
            placeholder="userId"
          />

          {/* Кнопка отправки комментария , отображаем в кнопке загрузку или ошибку */}
          {commentLoading ? (<button>Loading</button>) : <button>Send</button> && commentError ? (<button>Error</button>) : (<button>Send</button>)}
        </form>
      )}
    </div>
  )
}

export default PostCard
