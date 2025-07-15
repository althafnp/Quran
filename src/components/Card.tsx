import { useNavigate } from "react-router-dom"
import type { SurahList } from "../Types"


const Card = ({ index, surahName, surahNameArabic, surahNameTranslation, totalAyah }: SurahList) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/${index}`)} className="dark:bg-black border border-gray-700 hover:border-green-500 dark:hover:border-green-300  font-semibold rounded-sm p-3 hover:bg-gray-750 transition-all ease-in-out duration-300 cursor-pointer group">
      <div className="flex items-center justify-between">
        {/* Order Number */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-500 dark:bg-gray-700 rounded-md flex items-center justify-center text-white text-sm font-semibold group-hover:bg-green-400 dark:group-hover:bg-green-300 group-hover:text-black transition-colors duration-300">
            {index}
          </div>
          
          {/* Surah Info */}
          <div className="flex flex-col">
            <h3 className="dark:text-white text-sm md:text-base">{surahName}</h3>
            <p className="dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-300 text-gray-700 text-xs md:text-sm transition-colors">{surahNameTranslation}</p>
          </div>
        </div>
        
        {/* Arabic Name and Verse Count */}
        <div className="flex flex-col items-end">
          <h4 className="dark:text-white text-sm md:text-base mb-1">{surahNameArabic}</h4>
          <p className="dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-300 text-gray-700 text-xs md:text-sm transition-colors">{totalAyah}</p>
        </div>
      </div>
    </div>
  )
}

export default Card