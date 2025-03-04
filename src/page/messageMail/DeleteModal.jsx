import { Modal } from "antd";

const DeleteModal = ({ open, setOpen, handleDelete, text }) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      okText="Delete"
      onOk={handleDelete}
      title="Delete Message"
      okButtonProps={{ style: { backgroundColor: "red" } }}
    >
      <p>{text}</p>
    </Modal>
  );
};

export default DeleteModal;
