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
import { useDeleteFileMutation } from "../redux/api/taskApi";
import { useParams } from "react-router-dom";

export const FinishedFile = ({ finishedFiles, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]); // Stores images for modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
  const { id } = useParams();
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteFile, { isLoading }] = useDeleteFileMutation();

  const handleDelete = async () => {
    await deleteFile({
      taskId: id,
      fileId: deleteModalOpen,
      type: "finishFile",
    });
    setDeleteModalOpen(false);
    refetch();
  };
  return (
    <div className="mt-9 min-h-screen">
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {finishedFiles.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Swiper for image slideshow */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
            >
              <SwiperSlide>
                {service.url.includes("video/upload") ? (
                  <video
                    className="w-full h-[200px] object-cover"
                    src={service.url}
                    controls
                    onClick={() => openModal(finishedFiles)}
                  />
                ) : (
                  <img
                    src={service.url}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => openModal(finishedFiles)} // Pass the entire image array
                  />
                )}
              </SwiperSlide>
            </Swiper>
            <div className="p-4 text-center flex justify-between items-center">
              <p className="font-medium text-gray-700">{service._id}</p>
              <div className="flex gap-2">
                <MdDeleteOutline
                  className="text-2xl cursor-pointer hover:text-red-500"
                  onClick={() => setDeleteModalOpen(service._id)}
                />
                <GoDownload
                  className="text-2xl cursor-pointer hover:text-red-500"
                  onClick={() => handleDownload(service.url)}
                />
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
              className="flex justify-center items-center"
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
              {modalImages[currentImageIndex]?.url?.includes("video/upload") ? (
                <video
                  src={modalImages[currentImageIndex]?.url}
                  controls
                  style={{
                    width: "768px",
                    height: "500px",
                  }}
                />
              ) : (
                <img
                  src={modalImages[currentImageIndex]?.url} // Use current image index
                  alt="Modal Content"
                  style={{
                    width: "768px",
                    height: "500px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}

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
              {modalImages.map((image, index) => {
                if (image?.url?.includes("video/upload")) {
                  return (
                    <video
                      key={index}
                      className="w-full h-[70px] object-cover"
                      src={image?.url}
                      autoPlay={false}
                      onClick={() => selectImage(index)}
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
                  );
                } else {
                  return (
                    <img
                      key={index}
                      src={image?.url}
                      alt={`Thumbnail ${index}`}
                      onClick={() => selectImage(index)}
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
                  );
                }
              })}
            </div>
          </div>
          <div className="col-span-3">
            <FinishedFileComnt fileId={finishedFiles[currentImageIndex]._id} />
          </div>
        </div>
      </Modal>
      <Modal
        centered
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "red",
            color: "white",
          },
          loading: isLoading,
        }}
      >
        <h1 className="font-semibold">
          Are you sure you want to delete this file?
        </h1>
      </Modal>
    </div>
  );
};
