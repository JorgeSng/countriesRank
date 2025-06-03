export const SkeletonGrid = () => {
    const skeletonItems = Array(10).fill(0); 
    return (
        <div className="w-full animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-gray-400 text-sm font-semibold py-2 px-4 rounded-t-md border-b border-gray-200">

                {['Flag', 'Name', 'Population', 'Area (km²)', 'Region'].map((title) => (
                    <div key={title} className="hidden md:block bg-gray-300 rounded h-4 w-20"></div>
                ))}
                <div className="md:hidden bg-gray-300 rounded h-4 w-12"></div>
                <div className="md:hidden bg-gray-300 rounded h-4 w-16"></div>
            </div>

            {skeletonItems.map((_, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-4 h-[72px] py-2 px-4 border-b border-gray-200">
                    <div className="hidden md:block bg-gray-300 rounded h-8 w-20"></div>
                    <div className="hidden md:block bg-gray-300 rounded h-6 w-20"></div>
                    <div className="hidden md:block bg-gray-300 rounded h-6 w-20"></div>
                    <div className="hidden md:block bg-gray-300 rounded h-6 w-20"></div>
                    <div className="hidden md:block bg-gray-300 rounded h-6 w-20"></div>

                    <div className="md:hidden bg-gray-300 rounded h-6 w-full col-span-1"></div>
                    <div className="md:hidden bg-gray-300 rounded h-6 w-20 text-right"></div>
                </div>
            ))}
        </div>
    );
};
