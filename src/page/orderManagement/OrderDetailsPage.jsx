import { Avatar, Button, Dropdown, Menu, Modal } from "antd";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PurchasedPackageSection } from "./PurchasedPackageSection";
import { MassageBox } from "./MassageBox";
import { DetailsNote } from "./DetailsNote";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditShedualModal } from "./EditShedualModal";
import {
  useGetOrderByIdQuery,
  useRemoveOrderMutation,
} from "../redux/api/ordersApi";
import Loading from "../../components/Loading";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { imageUrl } from "../redux/api/baseApi";
import { formatDateTime } from "../../utils/formatDateTime";

export const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [removeOrder, { isLoading: isRemoving }] = useRemoveOrderMutation();

  const handleRemoveOrder = async () => {
    await removeOrder(id);
    navigate("/dashboard/order-management/all");
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/dashboard/order-management/order-details/edit-order"}>
          Edit Order
        </Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to={"/dashboard/order-management/order-details/edit-services"}>
          Edit Services
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => setModal2Open(true)} key="3">
        Edit Schedule
      </Menu.Item>
      <Menu.Item key="4">Set Order On Hold</Menu.Item>
      <Menu.Item key="5" onClick={() => setRemoveModalOpen(true)}>
        Remove Order
      </Menu.Item>
      <Menu.Item key="6">Cancel Order</Menu.Item>
    </Menu>
  );
  const { id } = useParams();

  const { data, isLoading } = useGetOrderByIdQuery(id);
  if (isLoading) return <Loading />;
  return (
    <div className="p-6 bg-white min-h-screen">
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
          <span className="text-lg font-semibold">Order Details</span>
        </h1>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            className="border border-black rounded-full text-black flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            Actions <HiOutlineDotsVertical className="ml-2" />
          </Button>
        </Dropdown>
      </div>
      <div className=" max-w-7xl m-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 border p-6 rounded-md">
              <div>
                <h2 className="text-xl font-semibold">Client Name</h2>
                <div className="flex items-center gap-2">
                  <Avatar src={data?.data?.clientId?.profile_image} />
                  <p className="text-gray-500">{data?.data?.clientId?.name}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-right">
                  Total Price
                </h2>
                <p className="text-purple-600 font-bold text-lg">
                  {data?.data?.totalAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>

            <div className="border flex justify-between p-3 rounded-md">
              <p className="font-semibold">Appointment</p>
              <div className="ml-auto flex flex-col gap-2">
                {data?.data?.schedule?.date && (
                  <p className="mb-2">{formatDateTime(data?.data?.schedule)}</p>
                )}
                <button
                  onClick={() => setModal2Open(true)}
                  className="border border-[#F38E0A] text-[#F38E0A] ml-auto py-2 px-4 rounded-md w-max"
                >
                  {data?.data?.schedule?.date
                    ? "Edit Appointment"
                    : "Schedule An Appointment"}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600">{data?.data?.descriptions}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Property Information</h3>
              <ul className="text-gray-600 mt-2 space-y-2">
                <li>
                  <strong>Zip Code:</strong>{" "}
                  {data?.data?.address?.zipCode || "N/A"}
                </li>
                <li>
                  <strong>Street Number:</strong>{" "}
                  {data?.data?.address?.streetName || "N/A"}
                </li>
                <li>
                  <strong>Street Address:</strong>{" "}
                  {data?.data?.address?.streetAddress || "N/A"}
                </li>
                <li>
                  <strong>City:</strong> {data?.data?.address?.city || "N/A"}
                </li>
                <li>
                  <strong>State:</strong> {data?.data?.address?.state || "N/A"}
                </li>
                <li>
                  <strong>Pickup keys at real estate office?</strong>{" "}
                  {data?.data?.pickupKeyOffice ? "Yes" : "No"}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Order Placed By:</h3>
              <div className="flex items-center gap-2">
                <Avatar
                  src={`${imageUrl}/${data?.data?.orderPlaced?.userId?.profile_image}`}
                />
                <p className="text-gray-600">
                  {data?.data?.orderPlaced?.userId?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="h-56 w-full rounded-md overflow-hidden shadow-md">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                  style={{ width: "100%", height: "100%" }}
                  defaultCenter={{
                    lng: data?.data?.locations.coordinates[0],
                    lat: data?.data?.locations.coordinates[1],
                  }}
                  defaultZoom={13}
                  gestureHandling={"greedy"}
                >
                  <Marker
                    position={{
                      lng: data?.data?.locations.coordinates[0],
                      lat: data?.data?.locations.coordinates[1],
                    }}
                  />
                </Map>
              </APIProvider>
            </div>

            <div className="mt-6">
              {data?.data?.contactOwner && (
                <>
                  <h3 className="text-lg font-semibold">Property Owner</h3>
                  <div className="mt-2">
                    <p>
                      <strong>Owner Details-1:</strong>
                    </p>
                    <ul className="text-gray-600 mt-2 space-y-1">
                      <li>
                        <strong>Name:</strong> {data?.data?.contactInfo?.name1}
                      </li>
                      <li>
                        <strong>Email:</strong>{" "}
                        {data?.data?.contactInfo?.email1}
                      </li>
                      <li>
                        <strong>Phone Number:</strong>{" "}
                        {data?.data?.contactInfo?.phone1}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p>
                      <strong>Owner Details-2:</strong>
                    </p>
                    <ul className="text-gray-600 mt-2 space-y-1">
                      <li>
                        <strong>Name:</strong> {data?.data?.contactInfo?.name2}
                      </li>
                      <li>
                        <strong>Email:</strong>{" "}
                        {data?.data?.contactInfo?.email2}
                      </li>
                      <li>
                        <strong>Phone Number:</strong>{" "}
                        {data?.data?.contactInfo?.phone2}
                      </li>
                    </ul>
                  </div>
                </>
              )}
              {data?.data?.contactAgent && (
                <div className="mt-4">
                  <p>
                    <strong>Real Estate Agent:</strong>
                  </p>
                  {data?.data?.linkedAgents?.length > 0 &&
                    data.data.linkedAgents.map((agent) => (
                      <div key={agent._id} className="flex items-center gap-2">
                        <Avatar src={`${imageUrl}/${agent.profile_image}`} />
                        <p>{agent.name}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <DetailsNote notes={data?.data?.notes} />
        <PurchasedPackageSection tasks={data?.data?.taskIds} />
        <MassageBox files={data?.data?.uploadFiles} />
      </div>
      <EditShedualModal
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
        schedule={data?.data?.schedule}
      />
      <Modal
        open={removeModalOpen}
        onCancel={() => setRemoveModalOpen(false)}
        onOk={handleRemoveOrder}
        okText="Remove"
        cancelText="Cancel"
        okButtonProps={{
          loading: isRemoving,
        }}
      >
        <p>Are you sure you want to remove this order?</p>
      </Modal>
    </div>
  );
};
