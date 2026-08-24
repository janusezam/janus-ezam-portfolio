import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectDetailGallery from "@/components/ProjectDetailGallery";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Janus Ezam Tagud`,
    description: project.description,
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent/30 selection:text-white flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <nav className="w-full fixed top-0 left-0 z-40 bg-background/85 backdrop-blur-md border-b border-card-border">
          <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
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
              <span>Back to Projects</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-28 md:pt-32 max-w-6xl mx-auto px-6 md:px-12 pb-20">
          {/* Breadcrumb & Header Section */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#projects" className="hover:text-accent transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-accent truncate max-w-[200px] sm:max-w-none">{project.title}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight animate-fade-in">
              {project.title}
            </h1>
            <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              {project.description}
            </p>
          </header>

          {/* Details & Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            
            {/* Left Column: Tech, Features & Action Buttons (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
              
              {/* Technologies */}
              <div className="bg-card-bg border border-card-border rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-mono uppercase text-text-muted tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-accent"></span>
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="tech-badge text-[11px] sm:text-xs py-1.5 px-3 rounded-md font-mono font-medium"
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
                <div className="bg-card-bg border border-card-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xs font-mono uppercase text-text-muted tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-3 h-[2px] bg-accent"></span>
                    Key Capabilities & Features
                  </h3>
                  <ul className="space-y-3.5">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm">
                        <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-accent">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons (Only shown if links exist) */}
              {(project.liveUrl || project.codeUrl) && (
                <div className="flex flex-col gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center gap-3 bg-accent hover:bg-accent-hover text-white text-xs font-mono tracking-[0.15em] uppercase px-5 py-3.5 rounded-lg transition-all shadow-md shadow-accent/20"
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
                      className="w-full inline-flex justify-center items-center gap-3 bg-surface hover:bg-surface-border/40 border border-surface-border text-text-secondary hover:text-text-primary text-xs font-mono tracking-[0.15em] uppercase px-5 py-3.5 rounded-lg transition-all"
                    >
                      <span>View Source Code</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Image Showcase (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ProjectDetailGallery project={project} />
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
