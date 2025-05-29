import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./Home";
import Todo from "./projects/todo/Todo";

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
    ],
  },
]);
