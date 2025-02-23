import { Input, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetAllServicesCategoriesQuery,
  useGetAllServicesQuery,
} from "../redux/api/serviceApi";
import { useGetAllPackageQuery } from "../redux/api/packageApi";
import { ServicesPackeg } from "../createOrder/ServicesPackeg";
import { useParams } from "react-router-dom";
import {
  useGetServicesOfOrderQuery,
  useUpdateServicesOfOrderMutation,
} from "../redux/api/ordersApi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: servicesOfOrder } = useGetServicesOfOrderQuery(id);

  const { data: servicesCategories } = useGetAllServicesCategoriesQuery();
  const { data: packages } = useGetAllPackageQuery({
    searchTerm,
  });
  const { data: services } = useGetAllServicesQuery({
    category: selectedTab,
    searchTerm,
    limit: 100,
  });

  const [formData, setFormData] = useState({
    serviceIds: [],
    services: [],
  });

  useEffect(() => {
    if (servicesOfOrder?.data) {
      const data = {
        services: [
          ...servicesOfOrder?.data?.serviceIds,
          ...servicesOfOrder?.data?.packageIds,
        ],
        serviceIds: [
          ...servicesOfOrder?.data?.serviceIds?.map((service) => service._id),
          ...servicesOfOrder?.data?.packageIds?.map((service) => service._id),
        ],
      };
      setFormData(data);
    }
  }, [servicesOfOrder]);

  const [updateServicesOfOrder, { isLoading: isUpdating }] =
    useUpdateServicesOfOrderMutation();

  const handleUpdateServices = async () => {
    try {
      const packageIds = formData?.services
        ?.filter((service) => service.package_image)
        .map((service) => service._id);
      const serviceIds = formData?.services
        ?.filter((service) => service.service_image)
        .map((service) => service._id);

      await updateServicesOfOrder({
        orderId: id,
        data: {
          packageIds: packageIds,
          serviceIds: serviceIds,
        },
      });
      message.success("Packages and Services updated successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
      message.error("Failed to update packages and services");
    }
  };
  return (
    <div className="mt-5 bg-white p-4">
      <h1 onClick={handleUpdateServices} className="flex gap-4 cursor-pointer">
        <button className="text-[#EF4849]">
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Add Services</span>
      </h1>
      <div className="flex justify-between mt-7">
        <div className="flex gap-3">
          <div
            onClick={() => setSelectedTab(null)}
            className={`px-11 py-1  cursor-pointer ${
              selectedTab === null
                ? "bg-[#2A216D] text-[white] rounded-full "
                : "border border-[#2A216D] text-[#2A216D] rounded-full "
            }`}
          >
            Packages
          </div>
          {servicesCategories?.data?.map((category) => (
            <div
              key={category._id}
              onClick={() => setSelectedTab(category._id)}
              className={`px-11 py-1  cursor-pointer ${
                selectedTab === category._id
                  ? "bg-[#2A216D] text-[white] rounded-full"
                  : "border border-[#2A216D] text-[#2A216D] rounded-full "
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>

        <Input
          placeholder="Search here..."
          style={{ width: 300 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {selectedTab === null ? (
          <ServicesPackeg
            packages={packages?.data}
            selectedTab={selectedTab}
            searchTerm={searchTerm}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <ServicesPackeg
            services={services?.data}
            selectedTab={selectedTab}
            searchTerm={searchTerm}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};
