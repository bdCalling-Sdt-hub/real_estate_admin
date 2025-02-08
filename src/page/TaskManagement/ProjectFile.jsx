import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SourceFile } from "./SourceFile";
import { FinishedFile } from "./FinishedFile";
import { MdOutlineFileUpload } from "react-icons/md";
import { FinishedFileComnt } from "./FinishedFileComnt";
import { GoDownload } from "react-icons/go";
export const ProjectFile = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  return (
    <div className="bg-white  p-5">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-6">
          <h1 className="flex gap-4 ">
            <button onClick={() => navigate(-1)} className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span
              onClick={() => navigate(-1)}
              className="text-lg cursor-pointer font-semibold"
            >
              Project Files
            </span>
          </h1>

          <div className="flex justify-between mt-7">
            <div className="flex gap-3 border-b">
              <div
                onClick={() => setSelectedTab("all")}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px 5px 0px 0px",
                  cursor: "pointer",
                  backgroundColor: selectedTab === "all" ? "#F5ECF2" : "white",
                  color: selectedTab === "all" ? "#9B3C7B" : "black",
                }}
              >
                Source File
              </div>
              <div
                onClick={() => setSelectedTab("submitted")}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px 5px 0px 0px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab === "submitted" ? "#F5ECF2" : "white",
                  color: selectedTab === "submitted" ? "#9B3C7B" : "black",
                }}
              >
                Finished File
              </div>
            </div>
            {selectedTab === "submitted" && (
              <div>
                <button className="bg-[#2A216D] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
                  <MdOutlineFileUpload className="text-xl" /> Upload
                </button>
              </div>
            )}
          </div>
          {selectedTab === "submitted" && (
            <div>
              <FinishedFile></FinishedFile>
            </div>
          )}
        </div>
        <div className="col-span-2">
          {selectedTab === "submitted" && (
            <div>
              <FinishedFileComnt></FinishedFileComnt>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end -mt-16">
        {selectedTab === "all" && (
          <div className="flex gap-4">
            <button className="bg-[#D80027] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
              <GoDownload className="text-xl" /> Download
            </button>
            <button className="bg-[#2A216D] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
              <MdOutlineFileUpload className="text-xl" /> Upload
            </button>
          </div>
        )}
      </div>
      {selectedTab === "all" && (
        <div>
          <SourceFile></SourceFile>
        </div>
      )}
    </div>
  );
};
