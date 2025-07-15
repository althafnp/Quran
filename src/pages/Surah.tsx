import { useNavigate, useParams } from "react-router-dom";
import Verse from "../components/Verse";
import { ArrowBack, PlayArrow, NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import axios from "axios";
import { useEffect, useState } from "react";
import type { SurahData } from "../Types";
import VerseSkeleton from "../components/VerseSkeleton";
import AudioPlayer from "../components/AudioPlayer";

const Surah = () => {

    const navigate = useNavigate()

    const { id } = useParams();
    const currentId = Number(id)

    const [surah, setSurah] = useState<SurahData | null>(null);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | null>(null);

    const getSurah = async() => {
        setLoading(true);
        setErr(null);

        try {
            const response = await axios.get(`https://quranapi.pages.dev/api/${id}.json`)
            setSurah(response.data)
        } catch (error) {
            if(axios.isAxiosError(error)) {
                setErr(error.message)
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSurah()
    }, [id])

  return (
    <div className="md:px-10 py-8 relative">
        <Tooltip title='Back'>
            <div onClick={() => navigate('/')} className="cursor-pointer mb-6 w-fit">
                <ArrowBack className="dark:text-white" />
            </div>
        </Tooltip>
        

        {err && (
            <div className="text-center my-6">
                <p className="text-red-500">{err}</p>
                <button onClick={getSurah} className="mt-2 dark:text-white rounded-md p-2 cursor-pointer bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">Retry</button>
            </div>
        )}

        {loading && (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <VerseSkeleton key={i} />
                ))}
            </div>
        )}

        {!loading && surah && (
            <>
                {/* Surah Title */}
                <div className="text-center mb-12">
                    <h1 className="dark:text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-10">{surah.surahNameArabicLong}</h1>
                    {surah.surahNameArabicLong !== 'سُورَةُ ٱلْفَاتِحَةِ' && <h1 className="dark:text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>}
                </div>

                <div className="w-fit rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                    <button onClick={() => setShowPlayer(true)} className="dark:text-white p-2 cursor-pointer">Play Audio<PlayArrow /></button>
                </div>

                {/* Verses */}
                <div className="space-y-0">
                    {
                        surah.arabic1.map((ayah, index) => (
                            <Verse
                                key={index}
                                arabicText={ayah}
                                translation={surah.english[index]}
                                verseNumber={index + 1}
                            />
                        ))
                    }
                </div>

                <div className="text-center">
                    <Tooltip title='Previous'>
                        <span>
                            <button
                                onClick={() => navigate(`/${currentId - 1}`)} 
                                disabled={currentId <=1} 
                                className={`p-2 rounded-md transition duration-100 mr-2
                                    ${currentId <= 1 
                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                                        : 'dark:text-white bg-gray-300 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-700 cursor-pointer'
                                    }
                                    `}   
                                    >
                                <NavigateBefore />
                            </button>
                        </span>
                    </Tooltip>

                    <Tooltip title='Next'>
                        <span>
                            <button
                                onClick={() => navigate(`/${currentId + 1}`)}
                                disabled={currentId >= 114}
                                className={`p-2 rounded-md transition duration-100 
                                    ${currentId >= 114 
                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                                        : 'dark:text-white bg-gray-300 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-700 cursor-pointer'
                                    }
                                    `}                    >
                                <NavigateNext />
                            </button>                  
                        </span>
                    </Tooltip>
                </div>

                {showPlayer && (
                    <AudioPlayer 
                        audioUrl={surah.audio[4].originalUrl} 
                        surahName={surah.surahNameArabicLong} 
                        reciterName={surah.audio[4].reciter} 
                        onClose={() => setShowPlayer(false)} 
                    />
                )}
            </>
        )

        }
    
    </div>
  )
}

export default Surah