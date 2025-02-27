import { Avatar, Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

const Body = () => {
  const navigate = useNavigate();
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");

  const email = {
    subject: "Request For Information",
    from: {
      name: "Albert Mike",
      email: "albertmikephd@gmail.com",
      img: "https://ui-avatars.com/api/?name=Albert Mike",
    },
    to: {
      name: "Me",
      email: "stevesmith24@gmail.com",
    },
    body: `Dear Smith
I hope this email finds you well. My name is Alb Mike, and I am writing to inquire about a new project your esteemed real estate company is undertaking.
I have been following the impressive work of Bproperty for some time now, and I am particularly interested in staying updated on your latest ventures. Understanding the innovative approaches and high-quality developments your company consistently delivers, I am very excited to learn more about your newest project. I understand that you may be busy, however your assistance in providing this information would be greatly valued. Please feel free to reach out to me via email or phone at your convenience.
Thank you for your time and attention to this request. I look forward to hearing from you soon and potentially exploring opportunities to collaborate or invest in your exciting new project.
Warm regards,
Albert Mike`,
    attachments: ["https://ui-avatars.com/api/?name=mike"],
  };

  const quillConfig = {
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
    ],
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
      ],
    },
  };
  return (
    <main className="p-9">
      <header>
        <Button
          icon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          type="text"
          className="text-xl font-semibold px-0"
        >
          Details
        </Button>
        <div className="flex justify-between mt-5">
          <h1 className="text-[22px] font-medium">{email.subject}</h1>
          <div className="flex gap-2">
            <Button
              icon={<StarOutlined style={{ fontSize: "18px" }} />}
              type="text"
            />
            <Button
              icon={<DeleteOutlined style={{ fontSize: "18px" }} />}
              type="text"
            />
          </div>
        </div>
      </header>
      <div className="flex items-center gap-[10px] mt-5">
        <Avatar
          src={email.from.img}
          alt={email.from.name}
          className="w-12 h-12"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-[6px]">
            <h1 className="font-semibold">{email.from.name}</h1>
            <span className="text-sm font-normal">{`<${email.from.email}>`}</span>
          </div>
          <span className="text-sm font-normal">To: {email.to.email}</span>
        </div>
      </div>
      <p
        className="mt-[18px]"
        dangerouslySetInnerHTML={{ __html: email.body }}
      />
      <Button
        type="primary"
        onClick={() => setReply((p) => !p)}
        className="bg-[#2A216D] text-white mt-12"
        size="large"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_735_5380"
              style={{ "mask-type": "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_735_5380)">
              <path
                d="M19 18.5V15C19 14.1026 18.6827 13.3366 18.0481 12.7019C17.4134 12.0673 16.6474 11.75 15.75 11.75H6.37302L10.223 15.6L9.15383 16.6538L3.5 11L9.15383 5.34619L10.223 6.40002L6.37302 10.25H15.75C17.0628 10.25 18.1826 10.7135 19.1096 11.6404C20.0365 12.5673 20.5 13.6872 20.5 15V18.5H19Z"
                fill="#FEFEFE"
              />
            </g>
          </svg>
        }
      >
        Reply
      </Button>
      {reply && (
        <div className="relative">
          <ReactQuill
            className="mt-6 custom-quill bg-white"
            value={content}
            onChange={setContent}
            placeholder="Write your email..."
            formats={quillConfig.formats}
            modules={quillConfig.modules}
          />
          <Button
            type="primary"
            className="bg-[#2A216D] text-white absolute right-4 bottom-4"
            size="large"
            icon={
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.723 7.83848L1.76537 13.7231C1.46411 13.8436 1.1779 13.8176 0.90675 13.6452C0.635583 13.4727 0.5 13.2224 0.5 12.8942V1.10586C0.5 0.777639 0.635583 0.527314 0.90675 0.354881C1.1779 0.182447 1.46411 0.156489 1.76537 0.277006L15.723 6.16158C16.0948 6.32568 16.2806 6.60517 16.2806 7.00003C16.2806 7.3949 16.0948 7.67438 15.723 7.83848ZM1.99997 12L13.85 7.00003L1.99997 2.00003V5.69236L7.423 7.00003L1.99997 8.30771V12Z"
                  fill="#FEFEFE"
                />
              </svg>
            }
            iconPosition="end"
          >
            Send Mail
          </Button>
        </div>
      )}
    </main>
  );
};

export default Body;
