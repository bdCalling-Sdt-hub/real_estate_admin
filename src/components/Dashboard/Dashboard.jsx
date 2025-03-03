import { IncomeOverview } from "./IncomeOverview";
import { OrderTrends } from "./OrderTrends";
import { RecentOrder } from "./RecentOrder";
import logo from "../../assets/header/profileLogo.png";
import order from "../../assets/header/order.png";
import { TbCalendarClock } from "react-icons/tb";
import { UnreadMessage } from "./UnreadMessage";
import {
  useGetOrderStatusQuery,
  useGetStatusQuery,
} from "../../page/redux/api/dashboardApi";

const Dashboard = () => {
  const { data: status } = useGetStatusQuery();
  const { data: orderStatus } = useGetOrderStatusQuery();

  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white">
          <div className="border-b">
            <div className="flex flex-col md:flex-row gap-5 items-center p-4">
              <img
                className="w-[70px] h-[70px] rounded-full"
                src={logo}
                alt="Profile"
              />
              <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                Good Morning, Robert!
              </h1>
            </div>
          </div>
          <div className="px-4 py-4">
            <h1 className="text-lg md:text-xl">Assign Tasks:</h1>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Completed", value: status?.data?.Completed },
                { label: "Delivered", value: status?.data?.Delivered },
                {
                  label: "In-Production",
                  value: status?.data?.["In-Production"],
                },
                { label: "Pending", value: status?.data?.Pending },
                { label: "Revisions", value: status?.data?.Revisions },
                { label: "Scheduled", value: status?.data?.Scheduled },
                { label: "Submitted", value: status?.data?.Submitted },
              ].map((task, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-xl flex items-center justify-center text-white">
                      {task.value || "0"}
                    </p>
                  </div>
                  <p className="text-sm md:text-base">{task.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-slate-300 flex items-center justify-center p-4">
            <div className="text-center space-y-2">
              <h1 className="text-xl md:text-2xl font-semibold">Order Today</h1>
              <div className="flex justify-center">
                <img
                  className="bg-slate-100 rounded-full w-[50px] md:w-[70px]"
                  src={order}
                  alt="Order"
                />
              </div>
              <p className="text-xl md:text-2xl font-bold">
                {orderStatus?.data?.todayOrders || "0"}
              </p>
            </div>
          </div>
          <div className="border-t md:border-t-0 border-slate-300 flex items-center justify-center p-4">
            <div className="text-center space-y-2">
              <h1 className="text-xl md:text-2xl font-semibold">
                Pending Orders
              </h1>
              <div className="flex justify-center">
                <div className="bg-slate-100 w-[50px] md:w-[70px] h-[50px] md:h-[70px] text-4xl md:text-6xl rounded-full flex items-center justify-center text-[#2A216D]">
                  <TbCalendarClock />
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold">
                {orderStatus?.data?.pendingOrders || "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="bg-white">
          <IncomeOverview />
        </div>
        <div className="bg-white">
          <OrderTrends />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="bg-white">
          <UnreadMessage />
        </div>
        <div className="bg-white">
          <RecentOrder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
