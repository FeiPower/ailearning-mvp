import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showPageNumbers = true,
  maxPageNumbers = 5 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const halfMax = Math.floor(maxPageNumbers / 2);
    
    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, currentPage + halfMax);
    
    if (currentPage <= halfMax) {
      endPage = Math.min(maxPageNumbers, totalPages);
    }
    
    if (currentPage + halfMax >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span className="pagination-button-text">Previous</span>
      </button>
      
      {showPageNumbers && (
        <div className="pagination-numbers">
          {currentPage > Math.floor(maxPageNumbers / 2) + 1 && totalPages > maxPageNumbers && (
            <>
              <button
                className="pagination-number"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              <span className="pagination-ellipsis">...</span>
            </>
          )}
          
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`pagination-number ${page === currentPage ? 'pagination-active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          
          {currentPage < totalPages - Math.floor(maxPageNumbers / 2) && totalPages > maxPageNumbers && (
            <>
              <span className="pagination-ellipsis">...</span>
              <button
                className="pagination-number"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}
      
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="pagination-button-text">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;

