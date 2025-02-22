import { CreateCard } from "./CreateCard";

export const ServicesPackeg = ({
  packages,
  services,
  selectedTab,
  searchTerm,
  formData,
  setFormData,
}) => {
  const nonDefaultResult = selectedTab || searchTerm;
  const popularPackages = !nonDefaultResult
    ? packages?.data?.slice(0, 4)
    : packages?.data || services?.data;
  const regularPackages = !nonDefaultResult
    ? packages?.data?.slice(4, packages?.data?.length)
    : [];
  return (
    <>
      <div>
        <h2
          className="text-3xl font-semibold mb-4"
          style={{
            textAlign: "center",
            margin: "30px 0",
            display: !nonDefaultResult ? "block" : "none",
          }}
        >
          Popular Packages
        </h2>
        <h2
          className="text-xl mb-4"
          style={{
            textAlign: "",
            margin: "30px 0",
            display: nonDefaultResult ? "block" : "none",
          }}
        >
          Showing {packages?.meta?.total || services?.meta?.total} result
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {popularPackages &&
            popularPackages?.map((_package) => (
              <CreateCard
                key={_package._id}
                _package={_package}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
        </div>
      </div>
      <div>
        <h2
          className="text-3xl font-semibold mb-4"
          style={{
            textAlign: "center",
            margin: "30px 0",
            display: selectedTab === null ? "block" : "none",
          }}
        >
          Regular Packages
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {regularPackages &&
            regularPackages?.map((_package) => (
              <CreateCard
                key={_package._id}
                _package={_package}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
        </div>
      </div>
    </>
  );
};
