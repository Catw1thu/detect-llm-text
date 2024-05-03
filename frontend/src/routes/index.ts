import { lazy, ComponentType, LazyExoticComponent } from "react";

const Home = lazy(() => import("../pages/Home"));

export interface RouteInterface {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
}

export const routes: RouteInterface[] = [
  {
    path: "/home",
    component: Home,
  },
];
