export default function Navbar() {
    return (
        <header className="w-full bg-[var(--color-bg)] text-[var(--color-text-light)]">
            <nav className="w-full">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 md:px-10 lg:px-16">
                    
                    {/* Logo */}
                    <a href="/" className="flex items-center h-full" aria-label="Fumori Home">
                        <img src="/fumori.svg" alt="Fumori Logo" className="h-5 w-auto" />
                    </a>

                    <p className="font-bold">
                        Fumori Notes
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {/* GitHub */}
                        <a
                            href="https://github.com/oujisan"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-gray)]"
                        >
                            <img src="/github.svg" alt="GitHub" className="h-6 w-auto" />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/in/oujisan"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-accent-blue)]"
                        >
                            <img src="/discord.svg" alt="Discord" className="h-6 w-auto" />
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:oujisan.main@gmail.com"
                            aria-label="Email"
                            className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-gray)]"
                        >
                            <img src="/email.svg" alt="Email" className="h-6 w-auto" />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}