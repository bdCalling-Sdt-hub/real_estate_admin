import { Modal, Form, Input, Button, Select, message } from "antd";
import {
  useGetAllTeamMembersQuery,
  useRejectTaskMutation,
} from "../redux/api/taskApi";
import { useGetProfileQuery } from "../redux/api/userApi";

export const RejectTask = ({ modal2Open1, setModal2Open1, refetchTasks }) => {
  const { data: teamMembers } = useGetAllTeamMembersQuery();
  const [rejectTask, { isLoading }] = useRejectTaskMutation();
  const { data: profile } = useGetProfileQuery();
  const role = profile?.data?.role;
  console.log({modal2Open1});
  
  const handleFinish = async (values) => {
    console.log({ values });

    try {
      if (role === "MEMBER") {
        await rejectTask({
          taskId: modal2Open1?._id,
          memberId: profile?.data?._id,
          reason: values.reason,
        });
      } else {
        // await rejectTask({
        //   taskId: modal2Open1?._id,
        //   memberId: values.member,
        //   reason: values.reason,
        // });
      }
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
          label={
            role === "MEMBER" ? "Selected Team Member" : "Select Team Members"
          }
          rules={[
            { required: role !== "MEMBER", message: "Recipient is required" },
          ]}
          layout="vertical"
        >
          {role === "MEMBER" ? (
            <h1 className="font-bold">{profile?.data?.name}</h1>
          ) : (
            <Select placeholder="Select a team member" mode="multiple">
              {teamMembers?.data?.length > 0 &&
                teamMembers?.data?.map((member) => (
                  <Select.Option key={member._id} value={member._id}>
                    {member.name}
                  </Select.Option>
                ))}
            </Select>
          )}
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
