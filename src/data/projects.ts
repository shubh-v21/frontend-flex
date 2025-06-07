import todo from "../assets/project_icons/todo.png";
import minidb from "../assets/project_icons/minidb.png";
interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
}

export const allProjects: Project[] = [
  {
    title: "Todo App",
    description:
      "A simple but powerful todo application with filter and search capabilities.",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    imageUrl: todo,
    link: "todo",
  },
  {
    title: "MiniDB",
    description:
      "Create tables, manage columns, and perform CRUD operations using browser localStorage.",
    techStack: ["React", "TypeScript", "TailwindCSS" , "CRUD"],
    imageUrl: minidb, // Placeholder image
    link: "minidb",
  },
];
