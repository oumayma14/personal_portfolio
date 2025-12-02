import { Briefcase, Code, User } from "lucide-react"

export const  AboutMe = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary">Me</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Passionate Web Developer</h3>
                        <p className="text-muted-foreground">
                            With hands-on experience in full-stack development, I specialize in building responsive, accessible, and user-friendly web applications using React.js, Node.js, Express, and MongoDB. I love turning ideas into clean, efficient, and scalable digital solutions.
                        </p>
                        <p className="text-muted-foreground">
                            What drives me is the continuous learning that comes with this field. Every project challenges me to refine my skills, adopt better practices, and stay updated with new frameworks and tools. Web development allows me to combine creativity with technical problem-solving, and it remains a domain where I feel motivated to grow and deliver professional, user-centered work.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="cosmic-button">
                                Get In Touch
                            </a>
                            <a href="#contact" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-30">
                                Download CV 
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code  className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="text-semibold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground">
                                        Creating responsive websites using modern frameworks like React.js , Bootstrap.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                             <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User  className="h-6 w-6 text-primary"/>
                                </div>
                                 <div className="text-left">
                                    <h4 className="text-semibold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground">
                                        Creating responsive websites using modern frameworks like React.js , Bootstrap.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                             <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase  className="h-6 w-6 text-primary"/>
                                </div>
                                 <div className="text-left">
                                    <h4 className="text-semibold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground">
                                        Creating responsive websites using modern frameworks like React.js , Bootstrap.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}