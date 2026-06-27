import Copy from "../molecul/copy"

const Explain = () => {
    return (
        <section className="relative min-h-dvh px-20 py-28 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-10 justify-center items-center">
                {/* <Copy>
                    <h2 className="capitalize text-7xl font-heading">
                        Apa itu <strong className="font-heading italic text-theme">
                            Banyutrip?
                        </strong>
                    </h2>
                </Copy> */}
                <Copy>
                    <h2 className="text-5xl leading-tight text-justify font-black text-text">
                        <span className="underline text-theme text-[3.2rem]">Merupakan</span> sebuah website yang bertujuan untuk mengenalkan pesona alam, budaya, dan ekowisata Banyuwangi melalui pengalaman digital yang informatif dan inspiratif.
                        Dengan menghadirkan informasi yang menarik dan mudah diakses, <span className="text-theme italic">Journey with Loreast</span> diharapkan dapat
                        menginspirasi lebih banyak orang untuk menikmati keindahan Banyuwangi sekaligus berkontribusi dalam mewujudkan pariwisata yang berkelanjutan.
                    </h2>
                </Copy>
            </div>
        </section>
    )
}

export { Explain }