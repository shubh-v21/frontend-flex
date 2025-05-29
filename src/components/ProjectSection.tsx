import { useState } from "react";
import Pagination from "./Pagination";
import ProjectListItem from "./ProjectListItem";
import { allProjects } from "../data/projects";

const ProjectSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const indexOfLastProject = currentPage * ITEMS_PER_PAGE;

  const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;

  const currentProjects = allProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore these mini-projects that demonstrate various React concepts
            and techniques.
          </p>
        </div>

        {/* Vertical list of projects */}
        <div className="space-y-2">
          {currentProjects.map((project, index) => (
            <ProjectListItem key={index} {...project} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
