import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./modules/Auth/Register";
import Login from "./modules/Auth/Login";
import { PageWrapper } from "./shared-components/PageWrapper";
import Homepage from "./modules/Homepage";
import Faq from "./modules/Faq";
import ContactAdmin from "./modules/ContactAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Homepage />
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
  {
    path: "zakat",
    element: (
      <PageWrapper>
        <p>Zakat</p>
      </PageWrapper>
    ),
  },
  {
    path: "chat",
    element: (
      <PageWrapper>
        <ContactAdmin />
      </PageWrapper>
    ),
  },
  {
    path: "profile",
    element: (
      <PageWrapper>
        <p>Profil</p>
      </PageWrapper>
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
