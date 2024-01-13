import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "@/entities/session/lib/PrivateRoute";
import { PublicRoute } from "@/entities/session/lib/PublicRoute";
import MainLayout from "@/pages/layout/main";
import DocumentListPage from "@/pages/document-list";
import DocumentDetailedPage from "@/pages/document-detailed";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import BasketPage from "@/pages/basket";
import BindingListPage from "@/pages/binding-list";
import BindingDetailedPage from "@/pages/binding-detailed";
import NotFoundPage from "@/pages/not-found";
import AddDocumentPage from "@/pages/add-document";
import DocumentTablePage from "@/pages/document-table";
import VeteranListPage from "@/pages/veteran-list";
import AddVeteranPage from "@/pages/add-veteran";
import HomePage from "@/pages/home";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/book-of-memory-frontend/",
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "documents",
        element: <DocumentListPage />,
      },
      {
        path: "documents/:id",
        element: <DocumentDetailedPage />,
      },
      {
        path: "veterans",
        element: <VeteranListPage />,
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
            element: <BindingListPage />,
          },
          {
            path: "bindings/:id",
            element: <BindingDetailedPage />,
          },
          {
            path: "documents/add",
            element: <AddDocumentPage />,
          },
          {
            path: "documents/:id/edit",
            element: <AddDocumentPage />,
          },
          {
            path: "documents/table",
            element: <DocumentTablePage />,
          },
          {
            path: "veterans/:id/edit",
            element: <AddVeteranPage />,
          },
          {
            path: "veterans/add",
            element: <AddVeteranPage />,
          },
        ],
      },
    ],
  },
]);
