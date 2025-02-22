import { Link, useNavigate, useParams } from "react-router-dom";
import { EditServicesCard } from "./EditServicesCard";
import { EditServicesPhotoSection } from "./EditServicesPhotoSection";
import { EditServicesVideo } from "./EditServicesVideo";
import { Button, Dropdown, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { menu } from "./constant";
import {
  useGetServicesOfOrderQuery,
  useUpdateServicesOfOrderMutation,
} from "../redux/api/ordersApi";
import Loading from "../../components/Loading";

export const EditServices = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetServicesOfOrderQuery(id);
  const [updateServicesOfOrder] = useUpdateServicesOfOrderMutation();
  if (isLoading) return <Loading />;
  console.log({ data });

  const handleRemovePackage = async ({ id: pkgId, type }) => {
    const body = {
      packageIds: data?.data?.packageIds,
      serviceIds: data?.data?.serviceIds,
    };
    if (type === "package") {
      body.packageIds = body.packageIds.filter((pkg) => pkg._id !== pkgId);
    } else {
      body.serviceIds = body.serviceIds.filter(
        (service) => service._id !== pkgId
      );
    }
    try {
      await updateServicesOfOrder({ orderId: id, data: body });
      message.success("Package removed successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Failed to remove package");
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
          <Link to={"/dashboard/order-management/order-details/add-services"}>
            <button className="bg-[#2A216D] text-white px-6 py-2 rounded shadow-md hover:bg-purple-800">
              + Add Services
            </button>
          </Link>
        </div>

        {/* Package Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Package</h3>
          <div className="grid grid-cols-3 gap-4">
            {data?.data?.packageIds?.length > 0
              ? data?.data?.packageIds?.map((pkg, index) => (
                  <EditServicesCard
                    pkg={pkg}
                    key={index}
                    handleRemovePackage={handleRemovePackage}
                  />
                ))
              : "No packages found"}
          </div>
        </div>

        <EditServicesPhotoSection />

        {/* Videos Section */}
        <EditServicesVideo />

        {/* Total Amount */}
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
          <button className="px-6 py-2 w-[200px] rounded bg-[#2A216D] text-white hover:bg-purple-800">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
