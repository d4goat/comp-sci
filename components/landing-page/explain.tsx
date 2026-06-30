import Copy from "../molecul/copy"

const Explain = () => {
    return (
        <section className="relative min-h-screen px-5 sm:px-10 md:px-20 py-16 md:py-28 flex flex-col justify-center items-center overflow-hidden">
            <div className="flex flex-col gap-8 md:gap-10 justify-center items-center w-full">
                <Copy>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-justify font-black text-text">
                        <span className="underline text-theme">Merupakan</span> sebuah website yang bertujuan untuk mengenalkan pesona alam, budaya, dan ekowisata Banyuwangi melalui pengalaman digital yang informatif dan inspiratif.
                        Dengan menghadirkan informasi yang menarik dan mudah diakses, <span className="text-theme italic">Journey with Loreast</span> diharapkan dapat
                        menginspirasi lebih banyak orang untuk menikmati keindahan Banyuwangi sekaligus berkontribusi dalam mewujudkan pariwisata yang berkelanjutan.
                    </h2>
                </Copy>
            </div>
        </section>
    )
}

export { Explain }