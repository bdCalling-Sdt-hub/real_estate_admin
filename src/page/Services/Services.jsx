import { useEffect, useState } from "react";
import { Input } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CategoryWiseServices } from "./CategoryWiseServices";
import { AddServices } from "./AddServices";
import { useGetAllServicesCategoriesQuery } from "../redux/api/serviceApi";

export const Services = () => {
  
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchTerm, setSearch] = useState("");
  const navigate = useNavigate();
  const [category, setCategoryData] = useState("");

  const { data: getAllCategory, isLoading } =
    useGetAllServicesCategoriesQuery();

  const data =
    getAllCategory?.data?.map((item, index) => ({
      key: item?._id,
      slNo: (index + 1).toString().padStart(2, "0"),
      categoryName: item?.name,
      categoryId: item?._id,
    })) || [];

  useEffect(() => {
    if (data.length > 0 && !category) {
      setCategoryData(data[0].categoryId);
    }
  }, [data]);

  const handleCategory = (categoryId) => {
    
    setCategoryData(categoryId);
  };

  console.log(
    category
      ? data.find((item) => item?.categoryId === category)?.categoryName
      : ""
  );

  return (
    <div className="bg-white h-screen p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Services</span>
        </h1>
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="flex justify-between">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-3">
          {isLoading ? (
            <p>Loading categories...</p>
          ) : (
            data.map((item) => (
              <button
                key={item?.categoryId}
                onClick={() => handleCategory(item?.categoryId)}
                className={`px-4 py-2 border rounded ${
                  category === item?.categoryId
                    ? "bg-[#2A216D] text-white"
                    : "bg-gray-200"
                }`}
              >
                {item?.categoryName}
              </button>
            ))
          )}
        </div>
        <div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#2A216D] text-white rounded px-11 py-2.5"
          >
            + New Services
          </button>
        </div>
      </div>

      <AddServices
        key={category}  // Force re-render when category changes
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        selectedCategory={category ? data?.find((item) => item?.categoryId === category)?.categoryName : ''}
        categoryId={category}  
      />
      <div>
        <CategoryWiseServices category={category} searchTerm={searchTerm}/>
      </div>
    </div>
  );
};
