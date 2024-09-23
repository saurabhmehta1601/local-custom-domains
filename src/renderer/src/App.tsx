import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
