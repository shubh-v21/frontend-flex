const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              About This Project
            </h2>
            <p className="text-gray-700 mb-4">
              Frontend-Flex is my personal playground for revisiting and
              mastering React concepts through focused mini-projects.
            </p>
            <p className="text-gray-700 mb-4">
              Each project tackles specific concepts like state management,
              hooks, API integration, or UI patterns.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg">
                React
              </span>
              <span className="px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg">
                TailwindCSS
              </span>
              <span className="px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg">
                Vite
              </span>
            </div>
          </div>
          <div className="bg-[var(--color-primary-light)] p-8 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg"></div>
            <h3 className="text-2xl font-bold mb-4">Why This Project?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[var(--color-primary)] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  Reinforce core React concepts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[var(--color-primary)] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  Practice clean, modular code
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[var(--color-primary)] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  Build small, self-contained apps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[var(--color-primary)] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  Explore new frontend techniques
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
