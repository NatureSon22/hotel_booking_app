import SearchStore from "../context/searchStore";

const SortOptionSelector = () => {
  const setSortOption = SearchStore((state) => state.setSortOption);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <div>
      <select
        name=""
        id=""
        onChange={handleChange}
        className="border border-x-gray-200 p-2"
      >
        <option value="all">All</option>
        <option value="starRating">Star Rating</option>
        <option value="pricePerNightAsc">Price Per Night (Low to High)</option>
        <option value="pricePerNightDesc">Price Per Night (High to Low)</option>
      </select>
    </div>
  );
};

export default SortOptionSelector;
