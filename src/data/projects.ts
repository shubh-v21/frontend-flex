import todo from "../assets/project_icons/todo.png";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
}

export const allProjects: Project[] = [
  {
    title: "React Todo App",
    description:
      "A simple but powerful todo application with filter and search capabilities.",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    imageUrl: todo,
    link: "todo",
  },
];
