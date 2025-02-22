import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Modal } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
export const ConfirmCard = ({ service }) => {
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

  const images = service?.service_image || service?.package_image;
  const name = service?.title || service?.name;
  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
          {images?.map((image, imgIndex) => (
            <SwiperSlide key={imgIndex}>
              <img
                src={image}
                alt={name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => openModal(images, name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="p-3">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="line-clamp-2 min-h-[50px]">{service?.descriptions}</p>
          <ul className="mt-3 list-disc ml-7">
            {service?.services?.map((service) => (
              <li key={service._id}>{service.title}</li>
            ))}
          </ul>
        </div>
        <div className="border-t flex justify-between p-3 items-center">
          <p style={{ color: "#9B3C7B", fontWeight: "bold" }}>
            Price: ${service?.price.toLocaleString()}
          </p>
        </div>
      </div>
      {/* Modal with Swiper */}
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
