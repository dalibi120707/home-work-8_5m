import { Route, Routes } from 'react-router-dom'
import './App.css'
import Posts from './pages/Posts/Posts'
import Layout from './components/Layout/Layout'
import PostEdit from './pages/PostEdit/PostEdit'

function App() {
  return (
    <div className='background'>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index path='/' element={<Posts/>}/>
            <Route path='/post-edit' element={<PostEdit/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
