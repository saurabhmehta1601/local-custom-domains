import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { HomePage, CreateDomainPage, ListDomainsPage } from '@/pages'

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/create',
    element: <CreateDomainPage />
  },
  {
    path: '/domains',
    element: <ListDomainsPage />
  }
]

const router = createMemoryRouter(routes)

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
