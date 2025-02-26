export const formatAddress = (address) => {
  const addressArray = [
    address?.streetAddress,
    address?.streetName,
    address?.city,
    address?.zipCode,
  ].filter(Boolean);
  if (addressArray.length === 0) return "N/A";
  return addressArray.join(", ");
};
