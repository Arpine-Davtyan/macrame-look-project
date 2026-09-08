import Link from "next/link";

const Hero = () => {
    return (
        <section className="section hero">
            <div className="container">
                <div className="hero-content">
                    <h3 className="bg-ivory italic py-1 px-5 capitalize">Պատվիրիր · Վայելիր · Վերադարձրու</h3>
                    <h1>Մակրամե, որը կարելի է վայելել՝ առանց գնելու</h1>
                    <p className="simple-text max-w-sm">
                        Ձեռագործ մակրամե իրերի հավաքածու՝ տարբեր առիթների, տարածքների ու գաղափարների համար։ Ընտրիր քեզ անհրաժեշտը, վարձիր և դարձրու քո օրը կամ տարածքը ավելի յուրահատուկ։
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
