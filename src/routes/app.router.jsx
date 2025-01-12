import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/home/home";
import Itinerary from "../pages/itinerary/itinerary";

const AppRouter = () => {
    const routes = [
      {
        path: "/",
        element: (
          <div className="container">
            <Home />
          </div>
        ),
      },
      {
        path: "/itinerary",
        element: (
          <div className="container">
            <Itinerary />
          </div>
        ),
      },
      { path: "*", element: <Navigate to={"/"}></Navigate>  }, // Redirige si la ruta no existe
    ];
  
    return useRoutes(routes);
  };
  
  export default AppRouter;