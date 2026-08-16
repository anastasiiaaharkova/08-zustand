import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';


interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;