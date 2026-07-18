import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/Layout";
import ExercisesPage from "@/pages/ExercisesPage";
import OverviewPage from "@/pages/OverviewPage";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import ExerciseCreationPage from "@/pages/ExerciseCreationPage";
import ExerciseSessionPage from "@/pages/ExerciseSessionPage/ExerciseSessionPage";

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
        {
          path: URL_PATH[NAVIGATION_ENDPOINT.CREATE_EXERCISE],
          element: <ExerciseCreationPage />,
        },
        {
          path: `/${URL_PATH[NAVIGATION_ENDPOINT.SESSION]}/:id`,
          element: <ExerciseSessionPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default router;
