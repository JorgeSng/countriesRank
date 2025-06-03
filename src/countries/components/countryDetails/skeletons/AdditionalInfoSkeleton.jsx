export const AdditionalInfoSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="p-6 rounded-lg">
                <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>

                <div className="space-y-4">
                    <div>
                        <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div>
                        <div className="h-5 bg-gray-500 rounded w-32"></div>
                    </div>

                    <div>
                        <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div>
                        <div className="space-y-1">
                            <div className="h-5 bg-gray-500 rounded w-36"></div>
                            <div className="h-5 bg-gray-500 rounded w-28"></div>
                        </div>
                    </div>

                    <div>
                        <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div>
                        <div className="h-5 bg-gray-500 rounded w-48"></div>
                    </div>

                    <div>
                        <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                <div className="h-5 bg-gray-500 rounded w-32"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                <div className="h-5 bg-gray-500 rounded w-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-lg">
                <div className="h-6 bg-gray-700 rounded w-40 mb-4"></div>
                <div className="h-5 bg-blue-600 rounded w-56"></div>
            </div>
        </div>
    );
};
