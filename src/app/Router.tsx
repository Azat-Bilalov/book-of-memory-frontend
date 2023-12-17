import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/layout/main";
import DocumentListPage from "@/pages/document-list";
import DocumentDetailedPage from "@/pages/document-detailed";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/book-of-memory-frontend",
        element: <DocumentListPage />,
      },
      {
        path: "/book-of-memory-frontend/document/:id",
        element: <DocumentDetailedPage />,
      },
      {
        path: "/book-of-memory-frontend/login",
        element: <LoginPage />,
      },
      {
        path: "/book-of-memory-frontend/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
