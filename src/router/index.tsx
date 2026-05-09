import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/Layout";
import ExercisesPage from "@/pages/ExercisesPage";
import OverviewPage from "@/pages/OverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "/exercises",
        element: <ExercisesPage />,
      },
    ],
  },
]);

export default router;
