import React from 'react';
import { ServicesPackeg } from './ServicesPackeg';
import { OverviewPackage } from './OverviewPackage';
import { ConfirmCard } from './ConfirmCard';
import img1 from "../../assets/header/11.png";
import img2 from "../../assets/header/22.png";
import img3 from "../../assets/header/33.png";
import img4 from "../../assets/header/44.png";
import img5 from "../../assets/header/55.png";
import img6 from "../../assets/header/66.png";
import img7 from "../../assets/header/77.png";
import img8 from "../../assets/header/88.png";

export const ConfirmSection = () => {
  const servicesData = [
    {
      title: "Luxury Packages",
      description: "Our most popular package including our most popular service",
      features: ["Photos", "Videos", "Floor Plan"],
      price: "$25",
      images: [img1, img2, img3],
    },
    {
      title: "Premium Packages",
      description: "Our most popular package including our most popular service",
      features: ["Photos", "Cinematic Video", "Floor Plan"],
      price: "$45",
      images: [img4, img5, img6],
    },
    {
      title: "Luxury Packages",
      description: "Our most popular package including our most popular service",
      features: ["Photos", "Highlight Video", "Cinematic Video"],
      price: "$50",
      images: [img7, img8, img1],
    },
    {
      title: "Premium Packages",
      description: "Our most popular package including our most popular service",
      features: ["Photos", "Videos", "Cinematic Video"],
      price: "$35",
      images: [img2, img3, img4],
    },
  ];
  return (
    <div>
        <h2 className="text-center text-xl font-bold mb-5">Confirm Info</h2>
        <div className="flex flex-col md:flex-row p-5 font-sans">
      {/* Map Section */}
      <div className="flex-1 mb-5 md:mb-0 md:mr-5">
        {/* Dynamic Map Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093744!2d144.95373531550403!3d-37.81621897975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57728e9d4b548f2!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1638251191422!5m2!1sen!2sau"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Dynamic Map"
          className="rounded-lg"
        ></iframe>
      </div>

      {/* Information Section */}
      <div className="flex-1">
        

        <div className="mb-5">
          <h3 className="text-lg font-semibold">Please check your information</h3>
          <p className="text-sm"><strong>Zip Code:</strong> 3535</p>
          <p className="text-sm"><strong>Street Number:</strong> 12/4</p>
          <p className="text-sm"><strong>Street Address:</strong> 1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
          <p className="text-sm"><strong>City:</strong> Hawaii</p>
          <p className="text-sm"><strong>State:</strong> California</p>
          <p className="text-sm"><strong>Pickup keys at real estate office?</strong> Yes</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <p className="text-sm"><strong>Name Property Owner:</strong> Robert Smith</p>
          <p className="text-sm"><strong>Email:</strong> smith24@gmail.com</p>
          <p className="text-sm"><strong>Phone Number:</strong> +456636646004</p>
          <p className="text-sm"><strong>Real Estate Agent:</strong></p>
          <div className="flex items-center mt-2">
            <img
              src="https://via.placeholder.com/50" // Replace with agent profile picture
              alt="Agent"
              className="w-12 h-12 rounded-full mr-3"
            />
            <span className="text-sm">Ronald Richards</span>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-5">
                  {servicesData.slice(0,3).map((service, index) => (
                    // <div
                    //   key={index}
                    //   style={{
                    //     border: "1px solid #ccc",
                    //     borderRadius: "10px",
                    //     overflow: "hidden",
                    //     marginBottom: "20px",
                    //   }}
                    // >
                    //   <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
                    //     {service.images.map((image, imgIndex) => (
                    //       <SwiperSlide key={imgIndex}>
                    //         <img
                    //           src={image}
                    //           alt={service.title}
                    //           style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                    //           onClick={() => openModal(service.images, service.title)}
                    //         />
                    //       </SwiperSlide>
                    //     ))}
                    //   </Swiper>
                    //   <div className="p-3">
                    //     <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    //     <p>{service.description}</p>
                    //     <ul className="mt-3 list-disc ml-7">
                    //       {service.features.map((feature, featureIndex) => (
                    //         <li key={featureIndex}>{feature}</li>
                    //       ))}
                    //     </ul>
                    //   </div>
                    //   <div className="border-t flex justify-between p-3 items-center">
                    //     <p style={{ color: "#9B3C7B", fontWeight: "bold" }}>Price: {service.price}</p>
                    //     <button
                    //       style={{
                    //         padding: "5px 20px",
                    //         backgroundColor: "#2A216D",
                    //         color: "white",
                    //         border: "none",
                    //         borderRadius: "3px",
                    //         cursor: "pointer",
                    //       }}
                    //     >
                    //       Add
                    //     </button>
                    //   </div>
                    // </div>
                    <ConfirmCard key={index} service={service}></ConfirmCard>
                  ))}
                </div>
        </div>
      </div>
    </div>
    </div>
  );
};