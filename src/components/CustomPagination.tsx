import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationRequest {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  onPageChange(page: number): void; // Now accepts page number argument
}

const CustomPagination = ({ pageNum, pageSize, totalPage, onPageChange }: PaginationRequest) => {
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPage <= 7) {
      // If total pages are 7 or fewer, show all pages
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    // Always add first page
    pages.push(1);

    if (pageNum <= 3) {
      // Near the start
      pages.push(2, 3, 4, 'ellipsis');
    } else if (pageNum >= totalPage - 2) {
      // Near the end
      pages.push('ellipsis', totalPage - 3, totalPage - 2, totalPage - 1);
    } else {
      // In the middle
      pages.push('ellipsis', pageNum - 1, pageNum, pageNum + 1, 'ellipsis');
    }

    // Always add last page
    pages.push(totalPage);

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    // Ensure the page number is within the valid range
    if (newPage >= 1 && newPage <= totalPage && newPage !== pageNum) {
      onPageChange(newPage); // Trigger the onPageChange callback
    }
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, pageNum - 1))}
            className={pageNum <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={page === pageNum}
                className={page === pageNum ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(totalPage, pageNum + 1))}
            className={pageNum >= totalPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
