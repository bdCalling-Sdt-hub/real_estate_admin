import { CreateCard } from "./CreateCard";

export const ServicesPackeg = ({ services, selectedTab, formData, setFormData }) => {
  const popularServices = selectedTab === null ? services?.data?.slice(0, 4) : services?.data;
  const regularServices = selectedTab === null ? services?.data?.slice(4, 8) : [];
  return (
    <>
      <div>
        <h2
          className="text-3xl font-semibold mb-4"
          style={{ textAlign: "center", margin: "30px 0", display: selectedTab === null ? "block" : "none" }}
        >
          Popular Packages
        </h2>
        <h2
          className="text-xl mb-4"
          style={{ textAlign: "", margin: "30px 0", display: selectedTab !== null ? "block" : "none" }}
        >
          Showing {services?.meta?.total} result
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {popularServices && popularServices?.map((service, index) => (
            <CreateCard key={index} service={service} formData={formData} setFormData={setFormData} />
          ))}
        </div>
      </div>
      <div>
        <h2
          className="text-3xl font-semibold mb-4"
          style={{ textAlign: "center", margin: "30px 0", display: selectedTab === null ? "block" : "none" }}
        >
          Regular Packages
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {regularServices && regularServices?.map((service, index) => (
            <CreateCard key={index} service={service} formData={formData} setFormData={setFormData} />
          ))}
        </div>
      </div>
    </>
  );
};
