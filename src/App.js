import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./modules/Auth/Register";
import Login from "./modules/Auth/Login";
import DashboardMuzzaki from "./modules/Dashboard/Muzzaki";
import MyBottomNavigation from "./shared-components/MyBottomNavigation";
import { PageWrapper } from "./shared-components/PageWrapper";

const PageWrapperWithBottomNav = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="grow overflow-auto">{children}</div>
      <MyBottomNavigation />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <DashboardMuzzaki />
      </PageWrapper>
    ),
  },
  {
    path: "splash",
    element: <h1>Hello World</h1>,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
