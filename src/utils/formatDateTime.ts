import dayjs from "dayjs";

export const formatDateTime = (data: any) => {
  const date = new Date(data.date);
  const startTime = new Date(data.start_time);
  const endTime = new Date(data.end_time);

  const formattedDate = dayjs(date).format("DD/MM/YYYY")

  const formatTime = (time) => {
    return time
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return `${formattedDate} at ${formattedStartTime}-${formattedEndTime}`;
};
