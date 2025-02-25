import { useState, useEffect } from "react";
import { IoSendOutline } from "react-icons/io5";
import { VscReply } from "react-icons/vsc";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../redux/api/taskApi";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { useSelector } from "react-redux";
import parseJWT from "../../utils/parseJWT";
import io from "socket.io-client";

export const FinishedFileComnt = ({ fileId }) => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetCommentsQuery(id);
  const [isReply, setIsReply] = useState(null);

  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [postComment, { isLoading: isPosting }] = usePostCommentMutation();

  const token = useSelector((state) => state.logInUser.token);
  const { authId } = parseJWT(token);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://10.0.60.118:5000?id=${authId}`);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-white min-h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  const commentsWithReplies = data?.data
    ?.filter((comment) => {
      if (fileId) {
        return comment.fileId === fileId;
      }
      return !comment.fileId;
    })
    ?.reduce((acc, comment) => {
      if (comment?.replayId) {
        const parentComment = acc.find(
          (item) => item._id === comment.replayId._id
        );
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(comment);
        }
      } else {
        acc.push({ ...comment, replies: [] });
      }
      return acc;
    }, []);

  const handleReplyToggle = (commentId) => {
    setIsReply(isReply === commentId ? null : commentId);
  };

  const handlePostComment = async (replayId) => {
    try {
      await postComment({
        taskId: id,
        comment: replayId ? reply : comment,
        replayId: replayId ? replayId : null,
        fileId: fileId ? fileId : null,
      });
      setComment("");
      setReply("");
      if (replayId) {
        setIsReply(null);
      }
      message.success("Comment added successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Failed to add comment");
    }
  };

  const handleRequestRevision = () => {
    if (!comment.trim()) {
      message.error("Please enter a comment");
      return;
    }

    const callback = (response) => {
      if (response.status === "ok") {
        setComment("");
        setIsReply(null);
        setReply("");
        message.success("Request for revision sent");
        refetch();
      } else {
        message.error("Failed to send request for revision");
      }
    };

    socket.emit(
      "revision-messages",
      { taskId: id, fileId: fileId, text: comment },
      callback
    );
  };
  return (
    <div>
      {/* Right Comments Section */}
      <div className="bg-white border-l">
        <div className="text-lg font-bold mb-4 border-b">
          <h2 className="p-3">Comments</h2>
        </div>
        <div className="pl-4">
          <div className="mb-6 relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              className="w-full border border-gray-300 rounded-md p-3 mb-3 resize-none"
              rows={4}
            />
            <div className="absolute flex gap-3 bottom-6 right-[5px]">
              {fileId && (
                <button
                  onClick={() => handleRequestRevision()}
                  className="border px-3 rounded"
                >
                  Request for revision
                </button>
              )}
              {isPosting && !isReply ? (
                <button className="absolute flex gap-3 bottom-6 right-[5px] bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600">
                  <Spin />
                </button>
              ) : (
                <button
                  onClick={() => handlePostComment()}
                  className="flex gap-3 bottom-6 right-[5px] bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                  Send
                  <IoSendOutline className="text-xl mt-[3px]" />
                </button>
              )}
            </div>
          </div>

          <div className="h-[calc(100vh-540px)] overflow-y-auto">
            {commentsWithReplies.map((comment) =>
              comment?.isRevision ? (
                <RevisionComponent
                  key={comment._id}
                  comment={comment}
                  handleReplyToggle={handleReplyToggle}
                  isReply={isReply}
                  setReply={setReply}
                  reply={reply}
                  isPosting={isPosting}
                  handlePostComment={handlePostComment}
                />
              ) : (
                <div className="border-t pt-4" key={comment._id}>
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        comment?.comment?.userId?.profile_image
                          ? `${import.meta.env.VITE_BASE_URL}/${
                              comment?.comment?.userId?.profile_image
                            }`
                          : `https://ui-avatars.com/api/?name=${comment?.comment?.userId?.name}`
                      }
                      alt={comment?.comment?.userId?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {comment?.comment?.userId?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {comment?.comment?.text}
                  </p>

                  <button
                    onClick={() => handleReplyToggle(comment._id)}
                    className="text-[#2A216D] flex gap-3 mt-2 hover:underline mb-2"
                  >
                    <VscReply className="text-xl" />
                    Reply
                  </button>

                  {isReply === comment._id && (
                    <div className="border-t pt-4 mb-2">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Leave a reply"
                        className="w-full border border-gray-300 rounded-md p-3 mb-3 resize-none"
                      />
                      {isPosting && comment._id === isReply ? (
                        <button className="bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600">
                          <Spin />
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePostComment(comment._id)}
                          className="bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600"
                        >
                          Send
                        </button>
                      )}
                    </div>
                  )}

                  {/* Display Replies */}
                  {comment.replies.length > 0 &&
                    comment.replies.map((reply) => (
                      <div className="pl-8 my-4" key={reply._id}>
                        <div className="flex items-start gap-4">
                          <img
                            src={
                              reply?.comment?.userId?.profile_image
                                ? `${import.meta.env.VITE_API_URL}/${
                                    reply?.comment?.userId?.profile_image
                                  }`
                                : `https://ui-avatars.com/api/?name=${reply?.comment?.userId?.name}`
                            }
                            alt={reply?.comment?.userId?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {reply?.comment?.userId?.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          {reply?.comment?.text}
                        </p>
                      </div>
                    ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RevisionComponent = ({
  comment,
  handleReplyToggle,
  isReply,
  setReply,
  reply,
  isPosting,
  handlePostComment,
}) => {
  return (
    <div className="border-t pt-4">
      <div className="border border-[#9D99BC] bg-[#F9F9FF] p-2 rounded-md">
        <div className="flex justify-between border-b pb-2">
          <p className="text-[#2A216D] font-medium">Revision Request</p>
          <div className="flex items-center gap-2">
            <img
              src={
                comment?.comment?.userId?.profile_image
                  ? `${import.meta.env.VITE_BASE_URL}/${
                      comment?.comment?.userId?.profile_image
                    }`
                  : `https://ui-avatars.com/api/?name=${comment?.comment?.userId?.name}`
              }
              alt={comment?.comment?.userId?.name}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-gray-900 font-medium">
              {comment?.comment?.userId?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end mt-4">
          <p className="text-gray-600 text-sm">{comment?.comment?.text}</p>
          <button
            onClick={() => handleReplyToggle(comment._id)}
            className="text-[#2A216D] flex items-center gap-2 hover:underline border-l pl-2"
          >
            <VscReply className="text-xs" />
            Reply
          </button>
        </div>
      </div>

      {/* Handle Replies */}
      {isReply === comment._id && (
        <div className="border-t pt-4 mb-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Leave a reply"
            className="w-full border border-gray-300 rounded-md p-3 mb-3 resize-none"
          />
          {isPosting && comment._id === isReply ? (
            <button className="bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600">
              <Spin />
            </button>
          ) : (
            <button
              onClick={() => handlePostComment(comment._id)}
              className="bg-[#2A216D] text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Send
            </button>
          )}
        </div>
      )}

      {/* Display Replies */}
      {comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <div className="pl-8 my-4" key={reply._id}>
            <div className="flex items-start gap-4">
              <img
                src={
                  reply?.comment?.userId?.profile_image
                    ? `${import.meta.env.VITE_API_URL}/${
                        reply?.comment?.userId?.profile_image
                      }`
                    : `https://ui-avatars.com/api/?name=${reply?.comment?.userId?.name}`
                }
                alt={reply?.comment?.userId?.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {reply?.comment?.userId?.name}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{reply?.comment?.text}</p>
          </div>
        ))}
    </div>
  );
};
