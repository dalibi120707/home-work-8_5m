import { useEffect } from 'react'
import classes from './Posts.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsData } from '../../store/postsSlice'
import { fetchDeletePost } from '../../store/postsSlice'
import PostCard from '../../components/PostCard/PostCard'

const Posts = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPostsData())
  }, [dispatch])

  const handleDeleteClick = id => {
    dispatch(fetchDeletePost(id))
  }

  if (loading) {
    return <div className={classes.loading}>Loading...</div>
  }

  if (error) {
    return <div className={classes.error}>Error: {error}</div>
  }

  return (
    <div>
      <h1 className={classes.title}>Posts</h1>
      <div className={classes.posts}>
        {data.posts &&
          data.posts.map(post => (
            <PostCard
              key={post.id}
              handleClick={() => {
                handleDeleteClick(post.id)
              }}
              title={post.title}
              body={post.body}
              postId={post.id}
            />
          ))}
      </div>
    </div>
  )
}

export default Posts
