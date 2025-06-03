export const MainInfoSkeleton = () => {
    return (

        <div className="space-y-6 animate-pulse">

            <div className="w-full h-48 bg-gray-300 rounded-lg shadow-lg" />

            <div className="p-6 rounded-lg space-y-4">
                <div className="h-8 bg-gray-300 rounded w-2/3" />
                <div className="h-6 bg-gray-300 rounded w-1/2" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <div className="h-4 bg-gray-400 rounded w-1/3 mb-2" />
                            <div className="h-6 bg-gray-300 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
