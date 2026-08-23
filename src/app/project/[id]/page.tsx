import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  // Use a single showcase image
  const imageToShow = project.fullImage || project.image;

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent/30 selection:text-white pb-24">
      {/* Navigation Bar */}
      <nav className="w-full fixed top-0 left-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-text-secondary hover:text-accent font-mono text-sm uppercase tracking-widest transition-colors"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight animate-fade-in">
            {project.title}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl animate-fade-in" style={{ animationDelay: "100ms" }}>
            {project.description}
          </p>
        </header>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-20 animate-fade-in" style={{ animationDelay: "200ms" }}>
          
          {/* Left Column: Tech & Features */}
          <div className="lg:col-span-1 flex flex-col gap-10">
            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-mono uppercase text-text-muted tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent"></span>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="tech-badge text-[12px] py-1.5 px-3"
                    style={{
                      color: tag.color,
                      borderColor: `${tag.color}40`,
                      backgroundColor: `${tag.color}15`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-sm font-mono uppercase text-text-muted tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-accent"></span>
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-text-secondary">
                      <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-3 bg-accent hover:bg-accent-hover text-white text-xs font-mono tracking-[0.15em] uppercase px-6 py-4 rounded-md transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]"
                >
                  <span>View Live Project</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-3 bg-card-bg hover:bg-surface border border-card-border hover:border-accent text-text-secondary hover:text-white text-xs font-mono tracking-[0.15em] uppercase px-6 py-4 rounded-md transition-all"
                >
                  <span>View Source Code</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Image Showcase */}
          <div className="lg:col-span-2">
            <div className="w-full flex justify-center">
              <Image
                src={imageToShow}
                alt={`${project.title} screenshot`}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
