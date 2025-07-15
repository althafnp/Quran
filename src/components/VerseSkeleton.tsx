

const VerseSkeleton = () => {
  return (
    <div className="mb-8 md:mb-12 animate-pulse">
        {/* Arabic Text Skeleton */}
        <div className="text-right mb-4">
            <div className="flex justify-end items-center gap-2">
                {/* Verse number skeleton */}
                <div className="h-6 md:h-8 lg:h-9 w-8 md:w-10 lg:w-12 bg-gray-500 dark:bg-gray-700 rounded"></div>
                {/* Arabic text skeleton - multiple lines */}
                <div className="flex flex-col items-end gap-2">
                    <div className="h-6 md:h-8 lg:h-9 bg-gray-500 dark:bg-gray-700 rounded w-64 md:w-80 lg:w-96"></div>
                    <div className="h-6 md:h-8 lg:h-9 bg-gray-500 dark:bg-gray-700 rounded w-48 md:w-60 lg:w-72"></div>
                    <div className="h-6 md:h-8 lg:h-9 bg-gray-500 dark:bg-gray-700 rounded w-32 md:w-40 lg:w-48"></div>
                </div>
            </div>
        </div>

        {/* Translation Skeleton */}
        <div className="text-left">
            <div className="flex flex-col gap-2">
                <div className="h-4 md:h-5 lg:h-6 bg-gray-500 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-gray-500 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-gray-500 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700"></div>
    </div>
  )
}

export default VerseSkeleton