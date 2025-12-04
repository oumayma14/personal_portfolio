import { ArrowBigRight, ExternalLink, Github } from "lucide-react";
import quizpop from "../images/quizpop.png";
const projects = [
    {
        id: 1,
        title:"E-learning platform",
        description: "A platfrom that helps users to learn through quizzes",
        image: quizpop,
        tags: ["React", "Bootstrap", "Node.js"],
        githubUrl: "https://github.com/oumayma14/e-learning-platform.git"
    }
]
export const ProjectsSection = () => {
    return (
        <section className="py-24 px-4 relative" id="projects">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl">Featured <span className="text-primary">Projects</span></h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    These are some of my latest projects, crafted with care and designed to deliver both high performance and an exceptional user experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project,key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/20 bg-secondary text-secondary-foreground">{tag}</span>
                                    ))}
                                </div>
                            <h3 className="text-xl font-semibold mb-2"> {project.title} </h3>
                            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-3">
                                    <a href={project.githubUrl}  className="text-foreground/80 hover:text-primary transition-colors duration-300" target="_blank">
                                        <Github  size={20}/>
                                    </a>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/oumayma14"
                    className="cosmic-button w-fit flex items-center mx-auto gap-2"
                    target="_blank">
                        Check My Github <ArrowBigRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}