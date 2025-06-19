import { createBrowserRouter } from "react-router-dom";
import Blog from "../Pages/Blogs/Blog";
import SinglePost from "../Pages/SinglePost/SinglePost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Blog />,
  },
  {
    path : "/blog/:slug",
    element : <SinglePost/>
  },
]);
