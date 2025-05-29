interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate array of page numbers
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  // Adjust if we're near the end
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border ${
            currentPage === 1 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          } transition-all`}
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
        
        {/* Show ellipsis if not starting from page 1 */}
        {startPage > 1 && (
          <>
            <button 
              onClick={() => onPageChange(1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}
        
        {/* Page numbers */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg ${
              currentPage === number
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
            } transition-all`}
          >
            {number}
          </button>
        ))}
        
        {/* Show ellipsis if not ending at last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <button 
              onClick={() => onPageChange(totalPages)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next button */}
        <button 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border ${
            currentPage === totalPages 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          } transition-all`}
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
