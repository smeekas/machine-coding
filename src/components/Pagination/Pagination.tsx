import { useState } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  total: number;
  defaultPerPage?: number;
  current?: number;
  onPageChange: (page: number) => void;
  nextButton?: boolean;
  prevButton?: boolean;
  showPerPage?: boolean;
};
function Pagination({
  total,
  defaultPerPage,
  current,
  onPageChange,
  nextButton,
  prevButton,
}: PaginationProps) {
  const [perPage, setPerPage] = useState(defaultPerPage ?? 10);
  const [page, setPage] = useState(current ?? 1);

  const totalPage = +(total / perPage).toFixed(0);
  const onPageChangeHandler = (index: number) => {
    setPage(index);
    onPageChange(index + 1);
  };
  const onPerPageChangeHandler = (newSize: number) => {
    setPerPage(newSize);
    setPage(1);
  };
  const nextPageHandler = () => {
    setPage((prev) => prev + 1);
    onPageChange(page + 1);
  };
  const prevPageHandler = () => {
    setPage((prev) => prev - 1);
    onPageChange(page - 1);
  };
  console.log(page);
  const shouldPrevButton = page > 1 && prevButton;
  const shouldNextButton = page < totalPage && nextButton;

  const showPrevPage = page > 1; //for 2,3,4,5....
  const showNextPage = page < totalPage; //till N-1 (for N next page don't exists)

  const shouldShowFirst = page > 2; //because for page 2 we will show page-1 as prev page via showPrevPage
  const shouldShowLast = page < totalPage - 1; //for page N-2 we will show page-N-1 as prev page.

  function isActive(pageNumber: number) {
    return pageNumber === page
      ? `${styles.page} ${styles.active}`
      : `${styles.page}`;
  }
  return (
    <>
      <div className={styles.pages}>
        {shouldPrevButton && (
          <button
            className={styles.page}
            onClick={prevPageHandler}
            tabIndex={0}
          >
            {"<"}
          </button>
        )}
        {shouldShowFirst && (
          <>
            <button
              tabIndex={0}
              className={isActive(1)}
              onClick={() => onPageChangeHandler(1)}
            >
              {1}
            </button>
            ...
          </>
        )}
        {showPrevPage && (
          <button
            tabIndex={0}
            className={isActive(page - 1)}
            onClick={() => onPageChangeHandler(page - 1)}
          >
            {page - 1}
          </button>
        )}
        <button tabIndex={0} className={isActive(page)}>
          {page}
        </button>
        {showNextPage && (
          <button
            tabIndex={0}
            className={isActive(page + 1)}
            onClick={() => onPageChangeHandler(page + 1)}
          >
            {page + 1}
          </button>
        )}

        {shouldShowLast && (
          <>
            ...
            <button
              tabIndex={0}
              className={isActive(totalPage)}
              onClick={() => onPageChangeHandler(totalPage)}
            >
              {totalPage}
            </button>
          </>
        )}
        {shouldNextButton && (
          <button
            className={styles.page}
            onClick={nextPageHandler}
            tabIndex={0}
          >
            {">"}
          </button>
        )}
      </div>
      <select onChange={(e) => onPerPageChangeHandler(+e.target.value)}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
}

export default Pagination;
