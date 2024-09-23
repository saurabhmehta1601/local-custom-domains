import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage, CreateDomainPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreateDomainPage />,
  },
]);

function App(): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
