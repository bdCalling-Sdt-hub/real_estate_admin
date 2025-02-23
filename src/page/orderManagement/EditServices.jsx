import { Link, useNavigate, useParams } from "react-router-dom";
import { EditServicesCard } from "./EditServicesCard";
import { Button, Dropdown, message, Spin } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { menu } from "./constant";
import {
  useGetServicesOfOrderQuery,
  useUpdateServicesOfOrderMutation,
} from "../redux/api/ordersApi";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";

export const EditServices = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetServicesOfOrderQuery(id);
  const [updateServicesOfOrder, { isLoading: isUpdating }] =
    useUpdateServicesOfOrderMutation();
  const [packagesAndServices, setPackagesAndServices] = useState([]);

  useEffect(() => {
    setPackagesAndServices(data?.data);
  }, [data]);

  if (isLoading) return <Loading />;

  const services = {};
  packagesAndServices?.serviceIds?.forEach((service) => {
    const category = service?.category?.name;
    services[category] = [...(services[category] || []), service];
  });
  const handleRemovePackage = async ({ id: pkgId, type }) => {
    if (type === "package") {
      const updatedPackages = packagesAndServices.packageIds.filter(
        (pkg) => pkg._id !== pkgId
      );
      setPackagesAndServices({
        ...packagesAndServices,
        packageIds: updatedPackages,
      });
    } else {
      const updatedServices = packagesAndServices.serviceIds.filter(
        (service) => service._id !== pkgId
      );
      setPackagesAndServices({
        ...packagesAndServices,
        serviceIds: updatedServices,
      });
    }
  };

  const handleUpdateServices = async () => {
    try {
      await updateServicesOfOrder({
        orderId: id,
        data: {
          packageIds: packagesAndServices?.packageIds,
          serviceIds: packagesAndServices?.serviceIds,
        },
      });
      message.success("Packages and Services updated successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Failed to update packages and services");
    }
  };
  return (
    <div className="bg-white p-4">
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
          <span className="text-lg font-semibold">Edit Services</span>
        </h1>
        <Dropdown overlay={() => menu(id)} trigger={["click"]}>
          <Button
            className="border border-black rounded-full text-black flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            Actions <HiOutlineDotsVertical className="ml-2" />
          </Button>
        </Dropdown>
      </div>
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit Services
        </h2>
        {/* Add Services Button */}
        <div className="flex justify-end mb-6">
          <Link
            to={`/dashboard/order-management/order-details/add-services/${id}`}
          >
            <button className="bg-[#2A216D] text-white px-6 py-2 rounded shadow-md hover:bg-purple-800">
              + Add Services
            </button>
          </Link>
        </div>
        {/* Package Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Package</h3>
          <div className="grid grid-cols-3 gap-4">
            {packagesAndServices?.packageIds?.length > 0
              ? packagesAndServices?.packageIds?.map((pkg, index) => (
                  <EditServicesCard
                    pkg={pkg}
                    key={index}
                    handleRemovePackage={handleRemovePackage}
                    type="package"
                  />
                ))
              : "No packages found"}
          </div>
        </div>
        {Object.keys(services).map((category) => (
          <div className="mb-8" key={category}>
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-3 gap-4">
              {services[category]?.length > 0
                ? services[category]?.map((service, index) => (
                    <EditServicesCard
                      pkg={service}
                      key={index}
                      handleRemovePackage={handleRemovePackage}
                      type="service"
                    />
                  ))
                : "No packages found"}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center text-lg font-semibold mb-6">
          <span>Total Amount</span>
          <span>
            {Number(data?.data?.totalAmount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 w-[200px] rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          {isUpdating ? (
            <button className="px-6 py-2 w-[200px] rounded bg-[#2A216D] text-white hover:bg-purple-800">
              <Spin />
            </button>
          ) : (
            <button
              onClick={handleUpdateServices}
              className="px-6 py-2 w-[200px] rounded bg-[#2A216D] text-white hover:bg-purple-800"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
