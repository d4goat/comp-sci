
const Footer = ({className}: {className?: string}) => {
    return (
        <footer className={`bg-text text-white overflow-hidden ${className}`}>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                    <p>&copy; 2026 Loreast. All rights reserved.</p>
                    <p>Made by Loreast Team</p>
                </div>
            </div>
        </footer>
    )
}

export { Footer }