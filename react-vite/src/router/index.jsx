import CreatePostForm from '../components/CreatePostForm/CreatePostForm';
import CreateBlogForm from '../components/CreateBlogForm/CreateBlogForm';
import LandingPage from '../components/LandingPage/LandingPage';
import UpdateBlog from '../components/UpdateBlog/UpdateBlog';
import UpdatePost from '../components/UpdatePost/UpdatePost';
import SignupFormPage from '../components/SignupFormPage';
import Dashboard from '../components/Dashboard/Dashboard';
import LoginFormPage from '../components/LoginFormPage';
import BlogPage from '../components/BlogPage/BlogPage';
import { createBrowserRouter } from 'react-router-dom';
import MyBlogs from '../components/MyBlogs/MyBlogs';
import Layout from './Layout';


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
        path: "blog/users/:userId",
        element: <MyBlogs />
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
      },
      {
        path: 'post/:postId/update',
        element: <UpdatePost />
      }
    ],
  },
]);