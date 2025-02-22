import React from "react";
import img from "../../assets/header/11.png";
import img1 from "../../assets/header/22.png";
import img2 from "../../assets/header/33.png";
import img3 from "../../assets/header/44.png";
import img4 from "../../assets/header/55.png";
import { Link, useNavigate } from "react-router-dom";
import { EditServicesCard } from "./EditServicesCard";
import { EditServicesPhotoSection } from "./EditServicesPhotoSection";
import { EditServicesVideo } from "./EditServicesVideo";
import { Button, Dropdown, Menu } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { menu } from "./constant";

export const EditServices = () => {
  const navigate = useNavigate();
  // Data for packages, photos, and videos
  const packageData = [
    {
      title: "Luxury Packages",
      description:
        "Our most popular package including our most popular service:",
      features: ["Photos", "Videos", "Floor Plan"],
      price: 25,
      images: [img1, img2, img3],
    },
    {
      title: "Standard Packages",
      description: "Includes essential services for your property:",
      features: ["Photos", "Floor Plan"],
      price: 15,
      images: [img1, img2, img3],
    },
  ];

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
        <Dropdown overlay={menu} trigger={["click"]}>
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
            {packageData.map((pkg, index) => (
              <EditServicesCard pkg={pkg} key={index}></EditServicesCard>
            ))}
          </div>
        </div>

        {/* Photos Section */}
        {/* <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Photos</h3>
          <div className="grid grid-cols-3 gap-6">
            {photosData.map((photo, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold">{photo.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {photo.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-red-500">
                      Price: ${photo.price}
                    </span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <EditServicesPhotoSection></EditServicesPhotoSection>

        {/* Videos Section */}
        <EditServicesVideo></EditServicesVideo>

        {/* Total Amount */}
        <div className="flex justify-between items-center text-lg font-semibold mb-6">
          <span>Total Amount</span>
          <span>$2550</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 w-[200px] rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
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
