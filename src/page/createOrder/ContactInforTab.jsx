import { Form, Input, Radio, Checkbox, Typography } from "antd";
import { useGetClientAgentsQuery } from "../redux/api/ordersApi";
import { imageUrl } from "../redux/api/baseApi";

export const ContactInforTab = ({ formData, setFormData }) => {
  const agents = useGetClientAgentsQuery(formData.client);
  const selectedAgent = formData?.linkedAgents;
  const handleFinish = (_, allValues) => {
    setFormData({ ...formData, contactInfo: allValues });
  };

  const handleCheckboxChange = (checkedValues) => {
    setFormData((prev) => ({
      ...prev,
      linkedAgents: checkedValues,
    }));
  };
  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <Typography.Title level={3}>Contact Info</Typography.Title>
      <Radio.Group
        value={formData?.contactAgent}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            contactAgent: e.target.value,
          }))
        }
      >
        <Radio value="false">Please Contact Property Owner</Radio>
        <Radio value="true">Please Contact Real Estate Agent</Radio>
      </Radio.Group>

      <div>
        <Form
          initialValues={formData.contactInfo}
          onValuesChange={handleFinish}
          layout="vertical"
        >
          {formData?.contactAgent === "false" && (
            <>
              <Typography.Title
                level={5}
                style={{ textAlign: "left", marginTop: "20px" }}
              >
                Owner Details - 01
              </Typography.Title>
              <Form.Item
                label="Name Property Owner"
                name="name1"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the property owner!",
                  },
                ]}
              >
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email1"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item
                label="Mobile Phone"
                name="phone1"
                rules={[
                  {
                    required: true,
                    message: "Please input the mobile phone number!",
                  },
                ]}
              >
                <Input placeholder="Input here" />
              </Form.Item>

              <Typography.Title
                level={5}
                style={{ textAlign: "left", marginTop: "20px" }}
              >
                Owner Details - 02
              </Typography.Title>
              <Form.Item label="Name Property Owner" name="name2">
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email2"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item label="Mobile Phone" name="phone2">
                <Input placeholder="Input here" />
              </Form.Item>
            </>
          )}

          <Typography.Title
            level={5}
            style={{ textAlign: "left", marginTop: "20px" }}
          >
            Linked real estate agent
          </Typography.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {agents.data?.data?.length > 0 &&
              agents.data?.data?.map((agent) => (
                <AgentCheckbox
                  key={agent?._id}
                  agent={agent}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedAgent={selectedAgent}
                />
              ))}
          </div>
        </Form>
      </div>
    </div>
  );
};

const AgentCheckbox = ({ agent, handleCheckboxChange, selectedAgent }) => {
  return (
    <Checkbox
      checked={selectedAgent?._id === agent?._id}
      onChange={() => handleCheckboxChange(agent)}
      key={agent?._id}
      value={agent?._id}
    >
      <div className="flex items-center gap-5">
        <img
          className="w-[30px] rounded-full h-[30px] object-cover"
          src={
            agent.profile_image
              ? `${imageUrl}${agent.profile_image}`
              : `https://ui-avatars.com/api/?name=${agent.name}`
          }
          alt={agent.name}
        />
        <span className="font-semibold">{agent.name}</span>
      </div>
    </Checkbox>
  );
};
