import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Surah from './pages/Surah'
import Footer from './components/Footer'
import NotFound from './components/404'

const App = () => {
  return (
    <div className='min-h-screen dark:bg-black px-5 md:px-10 lg:px-20 transition-all ease-in-out duration-300 pb-5'>
        <Navbar />

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Surah/>} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
    </div>
  )
}

export default App