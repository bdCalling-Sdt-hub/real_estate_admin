import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import List from "./List";
import Body from "./Body";

export const MainMassage = ({ tab }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setSelectedMessage(id);
    } else {
      setSelectedMessage(null);
    }
  }, [id]);

  const handleRowClick = (val) => {
    setSelectedMessage(val.key);
    navigate(`/dashboard/message-mail?id=${val.key}`);
  };
  return (
    <div className="bg-white p-4 h-screen">
      {selectedMessage ? (
        <Body id={selectedMessage} />
      ) : (
        <List
          tab={tab}
          handleRowClick={handleRowClick}
          setDeleteModal={setDeleteModal}
        />
      )}
      <DeleteModal open={deleteModal} setOpen={setDeleteModal} />
    </div>
  );
};
