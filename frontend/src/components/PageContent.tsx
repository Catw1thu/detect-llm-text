import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SuspensePage from "../pages/SuspensePage";
import { routes, RouteInterface } from "../routes/index";

const Page404 = lazy(() => import("../pages/Page404"));

export default function PageContent() {
  return (
    <div className="drawer-content flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
        <Suspense fallback={<SuspensePage />}>
          <Routes>
            {routes.map((route: RouteInterface, routeIndex) => {
              return (
                <Route
                  key={routeIndex}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
