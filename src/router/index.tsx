import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/Layout";
import ExercisesPage from "@/pages/ExercisesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/exercises",
        element: <ExercisesPage />,
      },
    ],
  },
]);

export default router;
