import { Modal, Form, Input, Select, Button, DatePicker, message } from "antd";
import {
  useCreateTodoMutation,
  useGetAllTeamMembersQuery,
  useGetTasksQuery,
} from "../redux/api/taskApi";
import dayjs from "dayjs";

export const ToDoAdd = ({ open, setOpen, refetch }) => {
  const { data: teamMembers } = useGetAllTeamMembersQuery({ searchTerm: "" });
  const { data: fetchedTasks } = useGetTasksQuery();
  const tasks = [];
  fetchedTasks?.data?.forEach((date) => {
    date?.tasks?.forEach((task) => {
      tasks.push({
        label: task.service?.title,
        value: task._id,
      });
    });
  });

  const [createTodo] = useCreateTodoMutation();

  const handleFinish = async (values) => {
    try {
      await createTodo({
        teamMember: [values.teamMember],
        description: values.description,
        task: values.task,
        dueDate: dayjs(values.dueDate.toString()).format("MM-DD-YY"),
      }).unwrap();

      setOpen(false);
      message.success("To Do added successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Failed to add To Do");
      refetch();
    }
  };
  return (
    <Modal
      title="Add to Do"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
      }}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          className="bg-[#2A216D]"
          key="save"
          type="primary"
          form="todoForm"
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" id="todoForm" onFinish={handleFinish}>
        <Form.Item
          name="teamMember"
          label="Select Team Member"
          rules={[{ required: true, message: "Please select a team member" }]}
        >
          <Select
            options={teamMembers?.data?.map((member) => ({
              label: member.name,
              value: member._id,
            }))}
            placeholder="Search for team members..."
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please provide a description" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Input here"
            style={{ resize: "none" }}
          />
        </Form.Item>

        <Form.Item name="task" label="Select Task (Not Required)">
          <Select placeholder="Select" options={tasks} />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Select Due Date (Or as soon as possible)"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ToDoAdd;
