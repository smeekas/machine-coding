import Pagination from "../../components/Pagination/Pagination";

function PaginationPage() {
  return (
    <Pagination
      total={100}
      defaultPerPage={10}
      current={1}
      prevButton
      nextButton
      onPageChange={console.log}
    />
  );
}

export default PaginationPage;
