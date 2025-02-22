import { useState } from "react";
import { Form, Input, Radio, Typography } from "antd";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export const AdressTab = ({ formData, setFormData }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData.address?.lat || 0,
    lng: formData.address?.lng || 0,
  });
  const [form] = Form.useForm();

  const getLatLngFromAddress = async (address) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setMarkerPosition({ lat: lat(), lng: lng() });
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            lat: lat(),
            lng: lng(),
          },
        }));
      } else {
        console.error("Geocode failed: ", status);
      }
    });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.detail.latLng;
    setMarkerPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        lat,
        lng,
      },
    }));
    getAddressFromLatLng(lat, lng);
  };

  const handleValuesChange = async (_, allValues) => {
    setFormData({
      ...formData,
      address: {
        zipCode: allValues.zipCode,
        city: allValues.city,
        streetAddress: allValues.streetAddress,
        streetName: allValues.streetNumber,
        streetNumber: allValues.streetNumber,
      },
    });

    const address = `${allValues.streetAddress} ${allValues.streetNumber}, ${allValues.city}, ${allValues.zipCode}`;

    await getLatLngFromAddress(address);
  };

  const getAddressFromLatLng = async (lat, lng) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;

        let streetAddress = "";
        let streetNumber = "";
        let city = "";
        let state = "";
        let zipCode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("street_number")) {
            streetNumber = component.long_name;
          }
          if (component.types.includes("route")) {
            streetAddress = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            zipCode = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        });

        setFormData({
          ...formData,
          address: {
            zipCode,
            city,
            streetAddress,
            streetName: streetNumber,
            streetNumber,
            state: state,
          },
        });

        form.setFieldsValue({
          zipCode,
          city,
          streetAddress,
          streetNumber,
        });
      } else {
        console.error("Geocode failed: ", status);
      }
    });
  };
  return (
    <div
      className="pb-11"
      style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}
    >
      <Typography.Title level={3}>Address</Typography.Title>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "200px" }}
          defaultCenter={markerPosition}
          defaultZoom={6}
          gestureHandling={"greedy"}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </Map>
      </APIProvider>
      <Form
        form={form}
        initialValues={formData.address}
        onValuesChange={handleValuesChange}
        layout="vertical"
        className="mt-8"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Zip Code"
            name="zipCode"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please input your zip code!" }]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
          <Form.Item
            label="Street Number"
            name="streetNumber"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: "Please input your street number!" },
            ]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
        </div>

        <Form.Item
          label="Street Address"
          name="streetAddress"
          rules={[
            { required: true, message: "Please input your street address!" },
          ]}
        >
          <Input placeholder="Input here" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item
            label="City"
            name="city"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
        </div>

        <Form.Item label="Pickup keys at real estate office?" name="pickupKeys">
          <Radio.Group
            defaultValue={formData.pickupKeys}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, pickupKeys: e.target.value }));
            }}
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};
