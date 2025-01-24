import React from "react";
import img from "../../assets/header/11.png";
import img1 from "../../assets/header/22.png";
import img2 from "../../assets/header/33.png";
import img3 from "../../assets/header/44.png";
import img4 from "../../assets/header/55.png";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Modal } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
export const EditServicesPhotoSection = () => {
  const photosData = [
    {
      title: "Drone Photo",
      description:
        "Help clients visualize your listing and its surroundings by capturing shots from the sky.",
      price: 25,
      images: [img1, img2, img3],
    },
    {
      title: "Drone Photo",
      description:
        "Help clients visualize your listing and its surroundings by capturing shots from the sky.",
      price: 25,
      images: [img1, img2, img3],
    },
    {
      title: "Drone Photo",
      description:
        "Help clients visualize your listing and its surroundings by capturing shots from the sky.",
      price: 25,
      images: [img1, img2, img3],
    },
  ];

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

  return (
    <div>
      {/* Photos Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Photos</h3>
        <div className="grid grid-cols-3 gap-6">
          {photosData.map((photo, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
          {photo.images.map((image, imgIndex) => (
            <SwiperSlide key={imgIndex}>
              <img
                src={image}
                alt={photo.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => openModal(photo.images, photo.title)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
