import { Modal, Form, Input, Button, Select, message } from "antd";
import { useRejectTaskMutation } from "../redux/api/taskApi";
import { useGetProfileQuery } from "../redux/api/userApi";
import { useEffect } from "react";

export const RejectTask = ({ modal2Open1, setModal2Open1, refetchTasks }) => {
  const [form] = Form.useForm(); // ✅ Create a form instance
  const [rejectTask, { isLoading }] = useRejectTaskMutation();
  const { data: profile } = useGetProfileQuery();
  const role = profile?.data?.role;
  const defaultMembers = modal2Open1?.members?.map((m) => m._id) || [];

  useEffect(() => {
    if (modal2Open1) {
      form.setFieldsValue({
        member: role === "MEMBER" ? profile?.data?._id : defaultMembers,
      });
    }
  }, [modal2Open1, profile, role, form]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        taskId: modal2Open1?._id,
        memberId: role === "MEMBER" ? profile?.data?._id : values.member,
        reason: values.reason,
      };

      await rejectTask(payload);

      setModal2Open1(false);
      message.success("Task rejected successfully");
    } catch (error) {
      message.error("Task rejection failed");
    } finally {
      refetchTasks();
    }
  };

  return (
    <Form
      layout="vertical"
      id="rejectForm"
      form={form} // ✅ Bind the form instance
      onFinish={handleFinish}
    >
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
              {modal2Open1?.members?.map((member) => (
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
