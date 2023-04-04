import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./modules/Auth/Register";
import Login from "./modules/Auth/Login";
import { PageWrapper } from "./shared-components/PageWrapper";
import Homepage from "./modules/Homepage";
import Faq from "./modules/Faq";
import ContactAdmin from "./modules/ContactAdmin";
import ZakatCalculate from "./modules/Zakat/Calculate";
import Zakat from "./modules/Zakat";
import ZakatPay from "./modules/Zakat/Pay";
import Profile from "./modules/Profile";
import Splash from "./modules/Splash";
import { CheckUserAuth } from "./services/CheckUserAuth";
import History from "./modules/History";
import ZakatManagement from "./modules/Admin/Zakat/Management";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckUserAuth>
        <PageWrapper>
          <Homepage />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "splash",
    element: (
      <CheckUserAuth>
        <Splash />
      </CheckUserAuth>
    ),
  },
  {
    path: "register",
    element: (
      <CheckUserAuth>
        <Register />
      </CheckUserAuth>
    ),
  },
  {
    path: "login",
    element: (
      <CheckUserAuth>
        <Login />
      </CheckUserAuth>
    ),
  },
  {
    path: "zakat",
    element: (
      <CheckUserAuth>
        <PageWrapper title="Zakat">
          <Zakat />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "zakat/pay",
    element: (
      <CheckUserAuth>
        <PageWrapper title="Zakat Payment">
          <ZakatPay />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "zakat/calculate",
    element: (
      <CheckUserAuth>
        <PageWrapper title="Calculate Your Zakat">
          <ZakatCalculate />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "zakat/manage",
    element: (
      <CheckUserAuth adminOnly={true}>
        <PageWrapper title="Zakat Management">
          <ZakatManagement />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "history",
    element: (
      <CheckUserAuth>
        <PageWrapper>
          <History />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "chat",
    element: (
      <CheckUserAuth>
        <PageWrapper>
          <ContactAdmin />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "profile",
    element: (
      <CheckUserAuth>
        <PageWrapper>
          <Profile />
        </PageWrapper>
      </CheckUserAuth>
    ),
  },
  {
    path: "faq",
    element: (
      <PageWrapper>
        <Faq />
      </PageWrapper>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
