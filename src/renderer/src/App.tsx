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
    <div className="h-full">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default App
