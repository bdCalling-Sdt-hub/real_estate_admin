import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import List from "./List";
import Body from "./Body";

export const MainMassage = ({ tab, favContacts, refetchFavs }) => {
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

  const handleRowClick = ({ record, authId }) => {
    const secondParticipantId = record.participants.filter(
      (p) => p._id != authId
    )[0]?._id;

    navigate(`/dashboard/message-mail?id=${secondParticipantId}`);
  };
  return (
    <div className="bg-white p-4 h-[90vh]">
      {selectedMessage ? (
        <Body id={selectedMessage} />
      ) : (
        <List
          tab={tab}
          favContacts={favContacts}
          refetchFavs={refetchFavs}
          handleRowClick={handleRowClick}
        />
      )}
    </div>
  );
};
