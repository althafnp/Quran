import { LightMode, DarkMode } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate()
    
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if(currentScrollY < 50) {
                setIsVisible(true)
            } else if(currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])
  return (
    <div className={`sticky top-4 z-50 px-4 md:px-16 lg:px-44 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
        <nav className="dark:bg-gray-900 border border-gray-700 shadow dark:shadow-gray-800 shadow-gray-500 bg-gray-100 rounded-2xl px-6 py-2 mx-auto">
            <div className="flex items-center justify-between">
                {/* Logo/Title */}
                <h1 onClick={() => navigate('/')} className="dark:text-white text-lg md:text-2xl font-bold cursor-pointer font-arabic">
                    القرآن
                </h1>
          
                {/* Theme Toggle */}
                <Tooltip title='Change Theme'>
                    <button onClick={toggleTheme} className="p-2 border rounded-md dark:bg-black bg-white transition-colors">
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