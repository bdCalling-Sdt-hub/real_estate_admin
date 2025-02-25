import { Checkbox, message } from "antd";
import { useGetAllClientsQuery } from "../redux/api/ordersApi";
import { imageUrl } from "../redux/api/baseApi";

export const CreateANewOrder = ({ setActiveTab, formData, setFormData }) => {
  const { data: clientData } = useGetAllClientsQuery();

  const handleClientChange = (client) => {
    setFormData({ ...formData, client });
  };

  const selectedClient = formData.client;

  const handleContinue = () => {
    if (selectedClient) {
      setActiveTab(1);
    } else {
      message.error("Please select a client");
    }
  };
  return (
    <div className="">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-bold text-4xl text-[#2A216D] mb-2">
              Create A New Order
            </h1>
            <p>Select a client/company</p>
          </div>
        </div>
        <div className="flex flex-col bg-white p-11 gap-5 rounded">
          {clientData?.data &&
            clientData.data?.result.map((client) => (
              <ClientCard key={client._id} client={client} handleClientChange={handleClientChange} selectedClient={selectedClient} />
            ))}
          <button
            className="bg-[#2A216D] text-white text-center py-2 rounded"
            onClick={() => handleContinue()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientCard = ({ client, handleClientChange, selectedClient }) => {
  const image = client.profile_image
    ? `${imageUrl}${client.profile_image}`
    : `https://ui-avatars.com/api/?name=${client.name}`;
  return (
    <Checkbox checked={selectedClient === client._id} onChange={() => handleClientChange(client._id)}>
      <div className="flex items-center gap-5">
        <img className="w-[40px] rounded-full" src={image} alt={client.name} />
        <span className="font-semibold">{client.name}</span>
      </div>
    </Checkbox>
  );
};
