import { LightMode, DarkMode } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate()
  return (
    <div className="sticky top-4 z-50 px-4 md:px-16 lg:px-44">
        <nav className="dark:bg-gray-900 border border-gray-700 bg-gray-300 rounded-2xl px-6 py-2 mx-auto">
            <div className="flex items-center justify-between">
                {/* Logo/Title */}
                <h1 onClick={() => navigate('/')} className="dark:text-white text-lg md:text-2xl font-bold cursor-pointer">
                    القرآن
                </h1>
          
                {/* Theme Toggle */}
                <Tooltip title='Change Theme'>
                    <button onClick={toggleTheme} className="p-2 rounded-md dark:bg-black bg-white transition-colors">
                        {darkMode ? (
                            <LightMode className="text-yellow-400" />
                        ) : (
                            <DarkMode className="text-black" />     
                        )}
                    </button>
                </Tooltip>
                
            </div>
        </nav>
    </div>
  )
}

export default Navbar