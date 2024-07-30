export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mx-auto flex gap-5 pt-4">
      {Array.from({ length: pages }).map((_, index) => {
        return (
          <button
            className={`border px-4 py-2 font-bold ${page === index + 1 ? "bg-blue-950 text-white" : "bg-gray-200 text-gray-800"}`}
            key={index}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
