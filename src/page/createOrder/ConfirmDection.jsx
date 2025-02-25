import React from "react";
import { ConfirmCard } from "./ConfirmCard";
import { imageUrl } from "../redux/api/baseApi";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Upload } from "antd";

export const ConfirmSection = ({ formData, setFormData }) => {
  const totalAmount = formData?.services?.reduce(
    (acc, service) => acc + service?.price,
    0
  );
  return (
    <div>
      <h2 className="text-center text-xl font-bold mb-5">Confirm Info</h2>
      <div className="flex flex-col md:flex-row p-5 font-sans">
        {/* Map Section */}
        <div className="flex-1 mb-5 md:mb-0 md:mr-5">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              style={{ width: "100%", height: "500px" }}
              defaultCenter={{
                lat: formData?.address?.lat,
                lng: formData?.address?.lng,
              }}
              defaultZoom={6}
              gestureHandling={"greedy"}
            >
              <Marker
                position={{
                  lat: formData?.address?.lat,
                  lng: formData?.address?.lng,
                }}
              />
            </Map>
          </APIProvider>
        </div>

        {/* Information Section */}
        <div className="flex-1">
          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              Please check your information
            </h3>
            <p className="text-sm">
              <strong>Zip Code:</strong> {formData?.address?.zipCode || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Street Number:</strong>{" "}
              {formData?.address?.streetName || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Street Address:</strong>{" "}
              {formData?.address?.streetAddress || "N/A"}
            </p>
            <p className="text-sm">
              <strong>City:</strong> {formData?.address?.city || "N/A"}
            </p>
            <p className="text-sm">
              <strong>State:</strong> {formData?.address?.state || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Pickup keys at real estate office?</strong>{" "}
              {formData?.pickupKeys || "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-sm">
              <strong>Name Property Owner:</strong>{" "}
              {formData?.contactInfo?.name1}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {formData?.contactInfo?.email1}
            </p>
            <p className="text-sm">
              <strong>Phone Number:</strong> {formData?.contactInfo?.phone1}
            </p>
            {formData.linkedAgents && (
              <>
                <p className="text-sm">
                  <strong>Real Estate Agent:</strong>
                </p>
                <div className="flex items-center mt-2">
                  <img
                    src={
                      formData?.linkedAgents?.profile_image
                        ? `${imageUrl}${formData?.linkedAgents?.profile_image}`
                        : `https://ui-avatars.com/api/?name=${formData?.linkedAgents?.name}`
                    }
                    alt="Agent"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="text-sm">
                    {formData?.linkedAgents?.name}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-semibold mb-2">
              Overview of Packages/Services
            </h3>
            <div className="grid grid-cols-3 gap-5">
              {formData.services.length > 0 &&
                formData.services.map((service, index) => (
                  <ConfirmCard key={index} service={service} />
                ))}
            </div>
          </div>
          <FileUploadAndDescription
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex justify-between mt-12">
            <h3 className="text-lg font-semibold mb-2">Total Amount:</h3>
            <h3 className="text-lg font-semibold mb-2">
              {totalAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUploadAndDescription = ({ formData, setFormData }) => {
  const uploadProps = {
    customRequest: ({ onSuccess }) => {
      onSuccess("ok");
    },
    onChange: (info) => {
      setFormData({ ...formData, uploadFiles: info.fileList });
    },
    multiple: true,
    fileList: formData?.uploadFiles,
  };
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-2">File & Description</h3>
      <div className="flex gap-4">
        <div className="w-full h-52">
          <h4 className="mb-3 font-medium">Upload File</h4>
          <div className="w-full h-full border-2 border-dashed border-[#2A216D] text-[#2A216D] rounded-md p-2 cursor-pointer flex items-center justify-center">
            <Upload {...uploadProps}>
              <p className="font-semibold flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_196_742"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_196_742)">
                    <path
                      d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                      fill="#2A216D"
                    />
                  </g>
                </svg>
                Upload File
              </p>
            </Upload>
          </div>
        </div>
        <div className="w-full h-52">
          <h4 className="mb-3 font-medium">Description For Client</h4>
          <textarea
            className="w-full border border-[#2A216D] rounded-md h-full p-4"
            placeholder="Description here"
            value={formData?.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      <div className="w-full h-52 mt-16">
        <h4 className="mb-3 font-medium">
          Notes Internal (Not visible to client)
        </h4>
        <textarea
          className="w-full border border-[#2A216D] rounded-md h-full p-4"
          placeholder="Write here"
          value={formData?.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};
