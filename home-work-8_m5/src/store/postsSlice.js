import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPostsData = createAsyncThunk(
  'postSlice/fetchPostsData',
  async () => {
    const response = await axios.get('https://dummyjson.com/posts')
    return response.data
  }
)

export const fetchDeletePost = createAsyncThunk(
  'postSlice/fetchDeletePost',
  async id => {
    const response = await axios.delete(`https://dummyjson.com/posts/${id}`)
    console.log(response.data)
  }
)

export const fetchEditPost = createAsyncThunk(
  'postSlice/fetchEditPost',
  async data => {
    const response = await axios.put(`https://dummyjson.com/posts/${data.id}`, {
      title: data.newText
    })
    console.log(response.data)
  }
)

export const fetchAddComment = createAsyncThunk(
  'postSlice/fetchAddComment',
  async data => {
    const response = await axios.post(`https://dummyjson.com/comments/add`, {
      body: data.text,
      postId: data.postId,
      userId: data.userId
    })
    console.log(response.data)
    return response.data
  }
)

const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    data: [],
    comments: [],
    loading: false,
    error: null,
    commentLoading: false,
    commentError: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostsData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostsData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPostsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(fetchAddComment.pending, state => {
        state.commentLoading = true
        state.commentError = null
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.commentLoading = false
        state.comments = [...state.comments, action.payload]
      })
      .addCase(fetchAddComment.rejected, (state, action) => {
        state.commentLoading = false
        state.commentError = action.error.message
      })
  }
})

export default postSlice.reducer
