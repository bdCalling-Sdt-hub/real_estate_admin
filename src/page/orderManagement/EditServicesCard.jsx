import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Modal } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
export const EditServicesCard = ({ pkg, handleRemovePackage, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (images, title) => {
    setModalImages(images);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
  };
  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === modalImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  const images = pkg?.package_image || pkg?.service_image;
  const title = pkg?.name || pkg?.title;
  return (
    <div>
      <div className="border rounded-lg shadow-md overflow-hidden mb-4">
        <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
          {images?.length > 0 &&
            images?.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(images, title)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="p-4">
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-sm text-gray-600 mb-4">
            {pkg?.descriptions}
            <br />
            {pkg?.services?.length > 0 &&
              pkg?.services?.map((feature) => (
                <span key={feature._id}>
                  • {feature?.title} <br />
                </span>
              ))}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[#D80027]">
              Price:{" "}
              {Number(pkg?.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <button
              onClick={() => handleRemovePackage({ id: pkg?._id, type })}
              className="bg-[#D80027] text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width="50%"
      >
        <div
          style={{ textAlign: "center", position: "relative", margin: "-30px" }}
        >
          <button
            onClick={showPreviousImage}
            style={{
              position: "absolute",
              left: -100,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "80px",
              color: "white",
            }}
          >
            <IoIosArrowBack />
          </button>
          <img
            src={modalImages[currentImageIndex]}
            alt={modalTitle}
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
          <button
            onClick={showNextImage}
            style={{
              position: "absolute",
              right: -100,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "80px",
              color: "white",
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </Modal>
    </div>
  );
};
