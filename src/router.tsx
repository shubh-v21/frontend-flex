import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./Home";
import Todo from "./projects/todo/Todo";
import MiniDB from "./projects/MiniDB/MiniDB";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "minidb",
        element: <MiniDB />,
      }
    ],
  },
]);
