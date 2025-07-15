import { useNavigate } from "react-router-dom"


const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center  my-20 '>
        <div className='flex flex-col items-center justify-between border p-15 border-gray-700 rounded-md'>
            <h1 className='dark:text-white font-semibold text-4xl'>404 - Not Found</h1>
            <button onClick={() => navigate('/')} className='dark:text-white rounded-md p-2 cursor-pointer bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300'>Back to Home</button>
        </div>
    </div>
  )
}

export default NotFound