import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";


import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";

import Login from "../Auth/Login";
import { MessageMail } from "../page/messageMail/MessageMail";
import { OrderManagement } from "../page/orderManagement/OrderManagement";
import { ClientManagement } from "../page/clientManagement/ClientManagement";
import { Services } from "../page/Services/Services";
import { Packeges } from "../page/Packeges/Packeges";
import { ServicesCategories } from "../page/ServiceCategories/ServicesCategories";
import { PricingGroup } from "../page/pricingGroup/PricingGroup";
import { InvoiceOrder } from "../page/invoiceOrder/InvoiceOrder";
import { TeamMember } from "../page/TeamMember/TeamMember";
import { TaskManagement } from "../page/TaskManagement/TaskManagement";
import { CreateANewOrder } from "../page/createOrder/CreateANewOrder";
import CreateServices from "../page/createOrder/CreateServices";
import { Agent } from "../page/clientManagement/Agent";
import { OrderDetailsPage } from "../page/orderManagement/OrderDetailsPage";
import { AllServiceTask } from "../page/TaskManagement/AllServiceTask";
import { ProjectFile } from "../page/TaskManagement/ProjectFile";
import { UserDetailsPage } from "../page/messageMail/UserDetailsPage";
import { EditOrder } from "../page/orderManagement/EditOrder";
import { EditServices } from "../page/orderManagement/EditServices";
import { AddServicePage } from "../page/orderManagement/AddServicePage";
import { AddPricingPage } from "../page/pricingGroup/AddPricingPage";
import { EditPricingPage } from "../page/pricingGroup/EditPricingPage";
import { Report } from "../page/Report/Report";
import { TaskManagementPage } from "../page/TaskManagement/TaskManagementPage";
import Settings from "../page/Settings/Settings";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/message-mail",
        element: <MessageMail></MessageMail>
      },
      {
        path: "/dashboard/message-mail/user-details",
        element: <UserDetailsPage></UserDetailsPage>
      },
      {
        path: "/dashboard/create-new-order",
        element: <CreateANewOrder></CreateANewOrder>
      },
      {
        path: "/dashboard/create-services",
        element: <CreateServices></CreateServices>
      },
      {
        path: "/dashboard/order-management/:tab?",
        element: <OrderManagement></OrderManagement>
      },
      
      {
        path: "/dashboard/order-management/order-details",
        element: <OrderDetailsPage></OrderDetailsPage>
      },
      {
        path: "/dashboard/order-management/order-details/edit-order",
        element: <EditOrder></EditOrder>
      },
      {
        path: "/dashboard/order-management/order-details/edit-services",
        element: <EditServices></EditServices>
      },
      {
        path: "/dashboard/order-management/order-details/add-services",
        element: <AddServicePage></AddServicePage>
      },
      {
        path: "/dashboard/client-management",
        element: <ClientManagement></ClientManagement>
      },
      {
        path: "/dashboard/client-management/agent-client",
        element: <Agent></Agent>
      },
      {
        path: "/dashboard/services",
        element: <Services></Services>
      },
      {
        path: "/dashboard/packages",
        element: <Packeges></Packeges>
      },
      {
        path: "/dashboard/service-categories",
        element: <ServicesCategories></ServicesCategories>
      },
      {
        path: "/dashboard/pricing-group",
        element: <PricingGroup></PricingGroup>
      },
      {
        path: "/dashboard/pricing-group/add-pricing-group",
        element: <AddPricingPage></AddPricingPage>
      },
      {
        path: "/dashboard/pricing-group/edit-pricing-group",
        element: <EditPricingPage></EditPricingPage>
      },
      {
        path: "/dashboard/report",
        element:<Report></Report>
      },
      {
        path: "/dashboard/invoice-order",
        element: <InvoiceOrder></InvoiceOrder>
      },
      {
        path: "/dashboard/team-member",
        element: <TeamMember></TeamMember>
      },
      {
        path: "/dashboard/task-managementPage",
        element: <TaskManagementPage></TaskManagementPage>
      },
      {
        path: "/dashboard/task-management",
        element: <TaskManagement></TaskManagement>
      },
      {
        path: "/dashboard/task-management/all-Services",
        element: <AllServiceTask></AllServiceTask>
      },
      {
        path: "/dashboard/task-management/all-Services/project-file",
        element: <ProjectFile></ProjectFile>
      },
      {
        path: "/dashboard/settings",
        element: <Settings></Settings>
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>
      },
      
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
