import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage, CreateDomainPage, ListDomainsPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreateDomainPage />,
  },
  {
    path: "/domains",
    element: <ListDomainsPage />,
  },
]);

function App(): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
