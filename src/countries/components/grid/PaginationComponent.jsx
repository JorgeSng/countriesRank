
export const PaginationComponent = ({ currentPage, totalPages, handleNextPage, handlePrevPage}) => {
  return (
      <div className="flex justify-between items-center py-4">
          <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="min-w-24 px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-gray-300 enabled:cursor-pointer"
          >
              Previous
          </button>
          <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
          </span>
          <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="min-w-24 px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-gray-300 enabled:cursor-pointer"
          >
              Next
          </button>
      </div>
  );
}

