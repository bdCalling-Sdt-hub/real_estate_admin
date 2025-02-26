import { Modal, Form, Input, Button, Select, message } from "antd";
import {
  useGetAllTeamMembersQuery,
  useRejectTaskMutation,
} from "../redux/api/taskApi";

export const RejectTask = ({ modal2Open1, setModal2Open1, refetchTasks }) => {
  const { data: teamMembers } = useGetAllTeamMembersQuery();
  const [rejectTask, { isLoading }] = useRejectTaskMutation();

  const handleFinish = async (values) => {
    try {
      await rejectTask({
        taskId: modal2Open1,
        memberId: values.member,
        reason: values.reason,
      });
      setModal2Open1(false);
      message.success("Task rejected successfully");
      refetchTasks();
    } catch (error) {
   
      message.error("Task rejection failed");
      refetchTasks();
    }
  };

  return (
    <Form layout="vertical" id="rejectForm" onFinish={handleFinish}>
      <Modal
        title="Reject Production Task"
        centered
        open={modal2Open1}
        onCancel={() => setModal2Open1(false)}
        footer={[
          <Button key="discard" onClick={() => setModal2Open1(false)}>
            Cancel
          </Button>,
          <Button
            className="bg-[#2A216D]"
            key="send"
            type="primary"
            form="rejectForm"
            htmlType="submit"
            loading={isLoading}
          >
            Reject
          </Button>,
        ]}
      >
        <Form.Item
          name="member"
          label="Select Team Member"
          rules={[{ required: true, message: "Recipient is required" }]}
          layout="vertical"
        >
          <Select placeholder="Select a team member">
            {teamMembers?.data?.length > 0 &&
              teamMembers?.data?.map((member) => (
                <Select.Option key={member._id} value={member._id}>
                  {member.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: "Reason is required" }]}
          layout="vertical"
        >
          <Input.TextArea
            rows={5}
            placeholder="Type your message here..."
            style={{ resize: "none" }}
          />
        </Form.Item>
      </Modal>
    </Form>
  );
};
