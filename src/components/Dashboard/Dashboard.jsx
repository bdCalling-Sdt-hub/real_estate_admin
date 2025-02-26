import { IncomeOverview } from "./IncomeOverview";
import { OrderTrends } from "./OrderTrends";
import { RecentOrder } from "./RecentOrder";
import logo from "../../assets/header/profileLogo.png";
import order from "../../assets/header/order.png";
import { TbCalendarClock } from "react-icons/tb";
import { UnreadMessage } from "./UnreadMessage";
import { useGetStatusQuery } from "../../page/redux/api/dashboardApi";

const Dashboard = () => {
  const { data: status } = useGetStatusQuery();


  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-2 gap-5">
        <div className=" bg-white">
          <div className=" border-b">
            <div className="flex gap-5 items-center p-4">
              <img
                className="w-[70px] h-[70px] rounded-full"
                src={logo}
                alt=""
              />
              <h1 className="text-2xl font-semibold">Good Morning, Robert!</h1>
            </div>
          </div>
          <div className=" px-4 py-4">
            <h1 className="col-span-1 text-xl">Assign Tasks:</h1>
            <div className="col-span-4">
              <div className="flex justify-between pt-4">
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                      {status?.data?.Completed} 
                    </p>
                  </div>
                  <p className="text-center">Total Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.Delivered}
                    </p>
                  </div>
                  <p className="text-center">Production Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.['In-Production']}
                    </p>
                  </div>
                  <p className="text-center">Other Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.Pending}
                    </p>
                  </div>
                  <p className="text-center">Other Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.Revisions}
                    </p>
                  </div>
                  <p className="text-center">Other Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.Scheduled}
                    </p>
                  </div>
                  <p className="text-center">Other Tasks</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p className="bg-[#F38E0A] p-2 h-[45px] w-[45px] rounded-full text-2xl flex items-center justify-center text-white">
                    {status?.data?.Submitted}
                    </p>
                  </div>
                  <p className="text-center">Other Tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white grid grid-cols-2  ">
          <div className="border-r border-slate-300 flex items-center justify-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold">Order Today</h1>
              <div className="flex justify-center">
              <img
                className="bg-slate-100 rounded-full w-[70px]"
                src={order}
                alt=""
              />
              </div>
              <p className="text-center text-2xl font-bold">82,677</p>
            </div>
          </div>
          <div className="border-r border-slate-300 flex items-center justify-center">
            <div className=" space-y-4">
             
                <h1 className="text-3xl font-semibold">Pending Orders</h1>
                <div className="flex justify-center">
                <div className="bg-slate-100 w-[70px]  h-[70px] text-6xl rounded-full flex items-center justify-center text-[#2A216D]">
                  <TbCalendarClock />
                </div>
                </div>
                <p className="text-center text-2xl font-bold">45,000</p>
            
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="bg-white">
          <IncomeOverview></IncomeOverview>
        </div>
        <div className="bg-white">
          <OrderTrends></OrderTrends>
        </div>
      </div>
      <div className=" mt-5 grid grid-cols-2 gap-5">
        <div className="bg-white">
        <UnreadMessage></UnreadMessage>
        </div>
        <div className="bg-white">
        <RecentOrder></RecentOrder>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
