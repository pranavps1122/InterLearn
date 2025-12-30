import { UserPublicRoutes } from "./modules/user/user.public.routes";
import { AdminPublicRoutes } from "./modules/admin/admin.public.routes";
import { ReviewerPublicRoutes } from "./modules/reviewer/reviewer.public.routes";
import { AdminPrivateRoutes } from "./modules/admin/admin.private.routes";
import { ReviewerPrivateRoutes } from "./modules/reviewer/reviewer.private.routes";
import { UserPrivateRoutes } from "./modules/user/user.private.routes";
import { AppRoute } from "./route.types";

const routes: AppRoute[] = [
  ...UserPublicRoutes,
  ...AdminPublicRoutes,
  ...AdminPrivateRoutes,
  ...ReviewerPublicRoutes,
  ...ReviewerPrivateRoutes,
  ...UserPrivateRoutes,
];

export default routes;
