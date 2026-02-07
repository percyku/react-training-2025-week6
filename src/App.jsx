import { useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/index";

const router = createHashRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
