import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { SourceFile } from "./SourceFile";
import { FinishedFile } from "./FinishedFile";
import { MdOutlineFileUpload } from "react-icons/md";
import { FinishedFileComnt } from "./FinishedFileComnt";
import { useGetTaskDetailsQuery } from "../redux/api/taskApi";
import Loading from "../../components/Loading";
import { message, Spin, Upload } from "antd";
import handleFileUpload from "../../utils/handleFileUpload";
import { useSelector } from "react-redux";

export const ProjectFile = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("source");
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetTaskDetailsQuery(id);
  const [uploadLoading, setUploadLoading] = useState(false);

  const token = useSelector((state) => state.logInUser.token);

  const uploadProps = {
    name: "sourceFile",
    accept: "image/*, video/*",
    itemRender() {},
    customRequest: async (options) => {
      setUploadLoading(true);
      const uploadConfig = {
        field: selectedTab === "source" ? "sourceFile" : "finishFile",
        action:
          selectedTab === "source"
            ? `/task/add-source-file/${id}`
            : `/task/add-finished-file/${id}`,
      };
      try {
        const formData = new FormData();
        formData.append(uploadConfig.field, options.file);
        await handleFileUpload({
          formData: formData,
          action: uploadConfig.action,
          method: "PATCH",
          token: token,
        });
        message.success("File uploaded successfully");
        refetch();
      } catch (error) {
        
        message.error("File upload failed");
      } finally {
        setUploadLoading(false);
      }
    },
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-white  p-5">
      <div
        className={`grid gap-4 ${
          selectedTab === "source" ? "" : "grid-cols-8"
        }`}
      >
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

          <div className="flex justify-between mt-7 w-full">
            <div className="flex gap-3 border-b">
              <div
                onClick={() => setSelectedTab("source")}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px 5px 0px 0px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab === "source" ? "#F5ECF2" : "white",
                  color: selectedTab === "source" ? "#9B3C7B" : "black",
                }}
              >
                Source File
              </div>
              <div
                onClick={() => setSelectedTab("finished")}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px 5px 0px 0px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab === "finished" ? "#F5ECF2" : "white",
                  color: selectedTab === "finished" ? "#9B3C7B" : "black",
                }}
              >
                Finished File
              </div>
            </div>
            <div>
              <Upload {...uploadProps}>
                {uploadLoading ? (
                  <button className="bg-[#2A216D] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
                    <Spin />
                  </button>
                ) : (
                  <button className="bg-[#2A216D] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
                    <MdOutlineFileUpload className="text-xl" /> Upload
                  </button>
                )}
              </Upload>
            </div>
          </div>
          {selectedTab === "finished" && data?.data?.finishFile.length > 0 && (
            <div>
              <FinishedFile
                finishedFiles={data?.data?.finishFile}
                refetch={refetch}
              />
            </div>
          )}
        </div>
        <div className="col-span-2">
          {selectedTab === "finished" && (
            <div>
              <FinishedFileComnt />
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex justify-end -mt-16">
        {selectedTab === "source" && (
          <div className="flex gap-4">
            <button className="bg-[#D80027] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
              <GoDownload className="text-xl" /> Download
            </button>
            <button className="bg-[#2A216D] flex items-center gap-3 text-[white] rounded px-11 py-2.5">
              <MdOutlineFileUpload className="text-xl" /> Upload
            </button>
          </div>
        )}
      </div> */}
      {selectedTab === "source" && data?.data?.sourceFile.length > 0 && (
        <div>
          <SourceFile sourceFiles={data?.data?.sourceFile} refetch={refetch} />
        </div>
      )}
    </div>
  );
};
