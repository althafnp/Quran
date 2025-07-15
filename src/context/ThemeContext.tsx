import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
    children: ReactNode;
}


export const ThemeProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem('darkMode');
        return stored ? JSON.parse(stored) : true
    }) 


    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode
        })
    };

    useEffect(() => {
        if(darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])


    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}



export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if(!context) throw new Error('useTheme must be used within a ThemeProvider');

    return context;
}