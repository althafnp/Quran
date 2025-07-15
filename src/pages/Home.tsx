import axios from "axios"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import type { SurahList } from "../Types"
import CardSkeleton from "../components/CardSkeleton"


const Home = () => {
    const [surahList, setSurahList] = useState<SurahList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | null>(null);

    const getSurahList = async() => {
        setErr(null)
        setLoading(true)
        try {
            const response = await axios.get('https://quranapi.pages.dev/api/surah.json');
            setSurahList(response.data)
        } catch (error) {
            if(axios.isAxiosError(error)) {
                setErr(error.message)
            }
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getSurahList();
    }, [])
  return (
    <div>
        {err && (
            <div className="text-center my-6">
                <p className="text-red-500">{err}</p>
                <button onClick={getSurahList} className="mt-2 dark:text-white rounded-md p-2 cursor-pointer bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">Retry</button>
            </div>
        )}

        {loading && (
            <div className="mt-10 md:mt-20">
                {Array.from({ length: 18 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
        )}

        {!loading && !err && (
            <>
                <h1 className="font-semibold dark:text-white mt-10 md:mt-20 text-2xl md:text-4xl mb-4">Surah</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {
                        surahList.map((surah, index) => (
                            <Card key={index} index={index + 1} surahName={surah.surahName} surahNameArabic={surah.surahNameArabic} surahNameTranslation={surah.surahNameTranslation} totalAyah={surah.totalAyah} />
                        ))
                    }
                </div>
            </>
        )}
        
    </div>
    )
}

export default Home