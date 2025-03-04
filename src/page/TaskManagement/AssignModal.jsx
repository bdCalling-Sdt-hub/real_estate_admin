import { Modal, Form, Button, Select, message } from "antd";
import {
  useGetAllTeamMembersQuery,
  useAssignTaskMutation,
} from "../redux/api/taskApi";

export const AssignModal = ({ setModal2Open, modal2Open, refetchTasks }) => {
  const { data: teamMembers } = useGetAllTeamMembersQuery();
  const [assignTask, { isLoading }] = useAssignTaskMutation();

  const handleFinish = async ({ member }) => {
    try {
      await assignTask({ taskId: modal2Open, memberId: member });
      setModal2Open(false);
      message.success("Task assigned successfully");
      refetchTasks();
    } catch (error) {
      message.error("Task assignment failed");
      refetchTasks();
    }
  };

  return (
    <Form id="memberForm" onFinish={handleFinish}>
      <Modal
        title="Assign Team Member"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={[
          <Button key="discard" onClick={() => setModal2Open(false)}>
            Cancel
          </Button>,
          <Button
            className="bg-[#2A216D]"
            key="send"
            type="primary"
            htmlType="submit"
            form="memberForm"
            loading={isLoading}
          >
            Add
          </Button>,
        ]}
      >
        <Form.Item
          name="member"
          label="Team Member"
          rules={[{ required: true, message: "Recipient is required" }]}
          layout="vertical"
        >
          <Select placeholder="Select a team member" mode="multiple">
            {teamMembers?.data?.length > 0 &&
              teamMembers?.data?.map((member) => (
                <Select.Option key={member._id} value={member._id}>
                  {member.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Modal>
    </Form>
  );
};
