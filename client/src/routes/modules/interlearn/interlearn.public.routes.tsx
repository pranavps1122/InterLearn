import React from "react";
import { INTER_LEARN } from "@/constants/Routes/interlearn.routes";

const InterLearnMainLayout = React.lazy(
  () => import("../../../components/layouts/MainLayout")
);
const LandingPage = React.lazy(
  () => import("../../../pages/Landing/LandingPage/Landing")
);
const BecomeReviewerPage = React.lazy(
  () => import("../../../pages/BecomeReviewer/BecomeReviwer")
);

const InterLearnPublicRoutes =[
  {
    path:INTER_LEARN.ROOT,
    layout:InterLearnMainLayout,
    children:[
      {path:INTER_LEARN.HOME,element:<LandingPage/>},
      {path:INTER_LEARN.CHILD.BECOME_REVIEWER,element:<BecomeReviewerPage/>},
    ]
  }
]
