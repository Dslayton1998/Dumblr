import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BlogPage from '../components/BlogPage/BlogPage';
import Dashboard from '../components/Dashboard/Dashboard';
import CreateBlogForm from '../components/CreateBlogForm/CreateBlogForm';
import UpdateBlog from '../components/UpdateBlog/UpdateBlog';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import CreatePostForm from '../components/CreatePostForm/CreatePostForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path: "post/new",
        element: <CreatePostForm />
      }
    ],
  },
]);