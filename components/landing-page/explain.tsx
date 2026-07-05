import Copy from "../molecul/copy"
import { useTranslations } from "next-intl"

const Explain = () => {
    const t = useTranslations("About")
    return (
        <section id="about" className="relative min-h-screen px-5 sm:px-10 md:px-20 md:py-28 flex flex-col justify-center items-center overflow-hidden">
            <div className="flex flex-col gap-8 md:gap-10 justify-center items-center w-full">
                <Copy>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-justify font-black text-text">
                        <span className=" ">{t("part1")}</span>{t("part2")}<span className=" italic">{t("part3")}</span>{t("part4")}
                    </h2>
                </Copy>
            </div>
        </section>
    )
}

export { Explain }