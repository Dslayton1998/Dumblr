import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BlogPage from '../components/BlogPage/BlogPage';
import Dashboard from '../components/Dashboard/Dashboard';
import CreateBlogForm from '../components/CreateBlogForm/CreateBlogForm';
import Layout from './Layout';
import UpdateBlog from '../components/UpdateBlog/UpdateBlog';


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
        path: "blog/:blogId",
        element: <BlogPage />
      },
      {
        path: "blog/new",
        element: <CreateBlogForm />
      },
      {
        path: "blog/:blogId/update",
        element: <UpdateBlog />
      }
    ],
  },
]);