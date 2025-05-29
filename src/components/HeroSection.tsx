
const HeroSection = () => {
  return (
    <section className="bg-[var(--color-primary-light)] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Frontend</span> <br />
              <span className="text-[var(--color-primary)]">Playground.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              A collection of React mini-projects showcasing modern frontend
              development techniques and best practices.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                View Projects
              </a>
              <a
                href="https://github.com/shubh-v21/frontend-flex"
                className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="relative animate-fadeIn">
            <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl">
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded-lg">
                <code className="language-jsx">{`function App() {
  return (
    <div className="container">
      <h1>Welcome to Frontend Flex</h1>
      <p>Let's build amazing UIs!</p>
    </div>
  );
}`}</code>
              </pre>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[var(--color-primary)] rounded-xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
