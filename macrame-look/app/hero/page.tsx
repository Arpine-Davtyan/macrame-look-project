import Link from "next/link";

const Hero = () => {
    return (
        <section className="section hero">
            <div className="container">
                <div className="hero-content">
                    <h3 className="bg-ivory italic py-1 px-5">Rent. Wear. Repeat.</h3>
                    <h1>Timeless Macrame For Every Occasion</h1>
                    <p className="simple-text max-w-sm">
                        Rent beautiful macrame clothing, bags, accessories and nets for any occasion — sustainably and stylishly.
                    </p>
                    <Link
                        href={`/products`}
                        className="btn"
                    >
                        Վարձույթ
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
