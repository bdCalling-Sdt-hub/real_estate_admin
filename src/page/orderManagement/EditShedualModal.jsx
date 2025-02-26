import {
  Modal,
  Form,
  Select,
  Button,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import {
  useGetTeamMembersQuery,
  useSetAppointmentScheduleMutation,
} from "../redux/api/ordersApi";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

export const EditShedualModal = ({
  modal2Open,
  setModal2Open,
  schedule,
  refetch,
}) => {
  const { data: teamMembersData } = useGetTeamMembersQuery({
    page: 1,
    limit: 1000,
    searchTerm: "",
  });

  const { id } = useParams();

  const [setAppointmentSchedule] = useSetAppointmentScheduleMutation();

  const handleFinish = async (values) => {
    const body = {
      date: values.date,
      start_time: values.time[0],
      end_time: values.time[1],
      memberId: values.teamMembers,
    };
    try {
      const response = await setAppointmentSchedule({
        id,
        data: body,
      }).unwrap();

      message.success(response?.data);
      setModal2Open(false);
    } catch (error) {
      message.error(error?.data?.message);
    } finally {
      refetch();
    }
  };

  return (
    <Modal
      title={schedule?.date ? "Edit Appointment" : "Schedule Appointment"}
      centered
      open={modal2Open}
      onCancel={() => setModal2Open(false)}
      footer={null}
      width={600}
    >
      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          date: schedule?.date ? dayjs(schedule?.date) : null,
          time:
            schedule?.start_time && schedule?.end_time
              ? [dayjs(schedule?.start_time), dayjs(schedule?.end_time)]
              : [],
          teamMembers: schedule?.memberId || [],
        }}
      >
        <div className="flex gap-4">
          {/* Calendar Section */}
          <Form.Item
            className="w-full"
            name="date"
            label="Select Date:"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          {/* Time Selection */}
          <Form.Item
            className="w-full"
            name="time"
            label="Select Time:"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker.RangePicker className="w-full" format="HH:mm" />
          </Form.Item>
        </div>

        <Form.Item
          className="w-full"
          name="teamMembers"
          label="Select Team Members:"
          rules={[{ required: true, message: "Please select a member" }]}
        >
          <Select
            className="w-full"
            mode="multiple"
            placeholder="Select Team Members"
            options={
              teamMembersData?.data?.result?.length > 0
                ? teamMembersData?.data?.result?.map((member) => ({
                    label: member.name,
                    value: member._id,
                  }))
                : []
            }
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => setModal2Open(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-6 py-2 rounded-lg bg-[#2A216D] text-white hover:bg-purple-800"
          >
            Confirm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
