import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/layout/main";
import DocumentListPage from "@/pages/document-list";
import DocumentDetailedPage from "@/pages/document-detailed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DocumentListPage />,
      },
      {
        path: "/document/:id",
        element: <DocumentDetailedPage />,
      },
    ],
  },
]);
