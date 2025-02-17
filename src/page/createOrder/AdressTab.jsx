import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Typography } from "antd";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

export const AdressTab = ({ formData, setFormData }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const placesLibrary = useMapsLibrary("places");
  const [service, setService] = useState(null);

  const handleMapClick = (e) => {
    setMapCenter(e.detail.latLng);
  };
  useEffect(() => {
    if (placesLibrary) {
      const service = new placesLibrary.placesService();
      setService(service);
    }
  }, [placesLibrary]);

  const handleValuesChange = async (_, allValues) => {
    setFormData({
      ...formData,
      address: {
        zipCode: allValues.zipCode,
        city: allValues.city,
        streetAddress: allValues.streetAddress,
        streetName: allValues.streetNumber,
      },
    });

    const fullAddress = `${allValues.streetAddress || ""} ${
      allValues.city || ""
    } ${allValues.zipCode || ""}`;
    if (!service || fullAddress.length === 0) {
      setMapCenter({ lat: 0, lng: 0 });
      return;
    }
    const request = { input: fullAddress };
    service.getQueryPredictions(request, (res) => {
      setMapCenter(res.predictions[0].geometry.location);
    });
  };
  return (
    <div
      className="pb-11"
      style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}
    >
      <Typography.Title level={3}>Address</Typography.Title>
      <APIProvider apiKey={""}>
        <Map
          style={{ width: "100%", height: "140px" }}
          defaultCenter={mapCenter}
          defaultZoom={6}
          gestureHandling={"greedy"}
          onClick={handleMapClick}
        >
          <Marker position={mapCenter} />
        </Map>
      </APIProvider>
      <Form
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
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};
