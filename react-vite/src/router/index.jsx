import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BrowseBlogs from '../components/BrowseBlogs/BrowseBlogs';
import BlogPage from '../components/BlogPage/BlogPage';
import Dashboard from '../components/Dashboard/Dashboard';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "blog",
        element: <BrowseBlogs />
      },
      {
        path: "blog/:blogName",
        element: <BlogPage />
      }
    ],
  },
]);