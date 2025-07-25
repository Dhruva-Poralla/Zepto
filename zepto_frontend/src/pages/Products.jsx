import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import notfound from "../assets/notfound.json";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import MobileFilter from "../components/MobileFilter";

export default function Products() {
  const { data, fetchAllProducts } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [category, setCatgory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [price, SetPrice] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0,0);
  }, []);

  const handleCategoryChange = (e) => {
    setCatgory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const handlePagination = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0,0);
  };

  const filterData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "ALL" || item.category === category) &&
      (brand === "ALL" || item.brand === brand) &&
      item.price >= price[0] &&
      item.price <= price[1]
  );

  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} price={price} SetPrice={SetPrice} category={category} setCatgory={setCatgory} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange}/>
      {
          data?.length > 0 ? (
     
        <>
          <div className="flex gap-8">
            <FilterSection
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              price={price}
              SetPrice={SetPrice}
              category={category}
              setCatgory={setCatgory}
              handleBrandChange={handleBrandChange}
              handleCategoryChange={handleCategoryChange}
            />
            {filterData?.length > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-7 gap-2 mt-10">
                  {filterData
                    ?.slice(page * 8 - 8, page * 8)
                    .map((product, index) => {
                      return <ProductCard key={index} product={product} />;
                    })}
                </div>
                <Pagination
                  handlePagination={handlePagination}
                  page={page}
                  dynamicPage={dynamicPage}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center md:h-[600px] md:w-[900px] mt-10">
                <Lottie animationData={notfound} classID="w-[500px]" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}
