import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "@/entities/session/lib/PrivateRoute";
import { PublicRoute } from "@/entities/session/lib/PublicRoute";
import MainLayout from "@/pages/layout/main";
import DocumentListPage from "@/pages/document-list";
import DocumentDetailedPage from "@/pages/document-detailed";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import BasketPage from "@/pages/basket";
import BindingPage from "@/pages/binding";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/book-of-memory-frontend/",
    children: [
      {
        path: "",
        element: <DocumentListPage />,
      },
      {
        path: "document/:id",
        element: <DocumentDetailedPage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "hello",
            element: <>Hello!</>,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "basket",
            element: <BasketPage />,
          },
          {
            path: "bindings",
            element: <BindingPage />,
          },
        ],
      },
    ],
  },
]);
