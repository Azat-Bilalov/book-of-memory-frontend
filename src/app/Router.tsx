import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/layout/main";
import Home from "@/pages/home";
import DocumentListPage from "@/pages/document-list";
import DocumentDetailedPage from "@/pages/document-detailed";
import BindingListPage from "@/pages/binding-list";
import BindingDetailedPage from "@/pages/binding-detailed";
import NotFoundPage from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/book-of-memory-frontend",
        element: <Home />,
      },
      {
        path: "/book-of-memory-frontend/documents",
        element: <DocumentListPage />,
      },
      {
        path: "/book-of-memory-frontend/document/:id",
        element: <DocumentDetailedPage />,
      },
      {
        path: "/book-of-memory-frontend/bindings",
        element: <BindingListPage />,
      },
      {
        path: "/book-of-memory-frontend/binding/:id",
        element: <BindingDetailedPage />,
      },
    ],
  },
]);
