import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/Layout";
import ExercisesPage from "@/pages/ExercisesPage";
import OverviewPage from "@/pages/OverviewPage";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <OverviewPage />,
        },
        {
          path: URL_PATH[NAVIGATION_ENDPOINT.EXERCISES],
          element: <ExercisesPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default router;
