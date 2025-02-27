import { Modal } from "antd";

const DeleteModal = ({ open, setOpen }) => {
  const handleDelete = () => {
    console.log({ open });
    setOpen(false);
  };
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
      <p>
        Are you sure you want to <strong>delete</strong> this message?
      </p>
    </Modal>
  );
};

export default DeleteModal;
