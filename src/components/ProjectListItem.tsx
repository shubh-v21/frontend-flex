interface ProjectListItemProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
}

const ProjectListItem = ({ title, description, techStack, imageUrl }: ProjectListItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all mb-4 animate-fadeIn">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-[var(--color-primary)] truncate">{title}</h3>
        <p className="text-gray-700 text-sm mb-2 line-clamp-1">{description}</p>
        <div className="flex flex-wrap gap-1">
          {techStack.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0">
        <button className="px-3 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all">
          View
        </button>
      </div>
    </div>
  );
};

export default ProjectListItem;
