const Highlight = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="relative inline-block" data-copy-highlight>
            <span className="relative z-10">{children}</span>
            <span className="absolute top-0 -left-1 w-[105%] h-full -z-10 highlight-bg" />
        </span>
    )
}

export { Highlight }