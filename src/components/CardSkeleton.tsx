
const CardSkeleton = () => {
  return (
    <div className="dark:bg-black border border-gray-700 rounded-sm p-3 animate-pulse">
        <div className="flex items-center justify-between">
            {/* Order Number Skeleton */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 dark:bg-gray-700 rounded-md"></div>
          
                {/* Surah Info Skeleton */}
                <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-500 dark:bg-gray-700 rounded w-20 md:w-24"></div>
                    <div className="h-3 bg-gray-500 dark:bg-gray-700 rounded w-16 md:w-20"></div>
                </div>
            </div>
        
            {/* Arabic Name and Verse Count Skeleton */}
            <div className="flex flex-col items-end gap-2">
                <div className="h-4 bg-gray-500 dark:bg-gray-700 rounded w-16 md:w-20"></div>
                <div className="h-3 bg-gray-500 dark:bg-gray-700 rounded w-12 md:w-16"></div>
            </div>
        </div>
    </div>
  )
}

export default CardSkeleton