import React, { useState } from "react";
import img11 from "../../assets/header/11.png";
import img22 from "../../assets/header/22.png";
import img33 from "../../assets/header/33.png";
import img44 from "../../assets/header/44.png";
import img55 from "../../assets/header/55.png";
import img66 from "../../assets/header/66.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { FinishedFileComnt } from "./FinishedFileComnt";
import "swiper/css";
import "swiper/css/navigation";
import { Modal } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { GoDownload } from "react-icons/go";

const servicesData = [
  { id: "P5467457756", images: [img11, img22, img33] },
  { id: "P5467457757", images: [img44, img55, img66] },
  { id: "P5467457758", images: [img11, img22, img33] },
  { id: "P5467457759", images: [img44, img55, img66] },
];

export const SourceFile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]); // Stores images for modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  
  const openModal = (images) => {
    setModalImages(images); 
    setCurrentImageIndex(0);
    setIsModalOpen(true); 
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
  };

  // Show the previous image
  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1
    );
  };

  // Show the next image
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === modalImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Select an image via thumbnail
  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className="mt-9 min-h-screen">
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Swiper for image slideshow */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
            >
              {service.images.map((image, imgIndex) => (
                <SwiperSlide key={imgIndex}>
                  <img
                    src={image}
                    alt={`Image ${imgIndex}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => openModal(service.images)} // Pass the entire image array
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="p-4 text-center flex justify-between items-center">
              <p className="font-medium text-gray-700">{service.id}</p>
              <div className="flex gap-2">
              <MdDeleteOutline className="text-2xl"/>
              <GoDownload className="text-2xl"/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing images */}
      <Modal
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width="70%"
        
      >
        <div className="grid grid-cols-12 ">
          <div className="col-span-9 ">
          <div
            style={{
              textAlign: "center",
              position: "relative",
              padding: "20px",
            }}
          >
            {/* Previous Button */}
            <button
              onClick={showPreviousImage}
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "40px",
                color: "white",
              }}
            >
              <IoIosArrowBack />
            </button>

            {/* Display the current image */}
            <img
              src={modalImages[currentImageIndex]} // Use current image index
              alt="Modal Content"
              style={{
                width: "100%",
                
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Next Button */}
            <button
              onClick={showNextImage}
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "40px",
                color: "white",
              }}
            >
              <IoIosArrowForward />
            </button>
          </div>

          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {modalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                onClick={() => selectImage(index)} // Select image on click
                style={{
                  width: "100px",
                  height: "70px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    currentImageIndex === index
                      ? "2px solid black"
                      : "2px solid transparent",
                  borderRadius: "5px",
                }}
              />
            ))}
          </div>
        
          </div>
          <div className="col-span-3">
          <FinishedFileComnt></FinishedFileComnt>
        </div>
        </div>
        
      </Modal>
    </div>
  );
};
