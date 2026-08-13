import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <div className="flex flex-col gap-10 lg:flex-row">
                    <div className="w-full lg:min-w-lg">
                        <Image
                            src="/images/about.png"
                            alt="about"
                            width={600}
                            height={450}
                            loading="eager"
                            className="h-auto w-full"
                        />
                    </div>

                    <div>
                        <h2>About Us</h2>

                        <div className="divider"></div>

                        <p className="about-bold-text">
                            Macrame Look was born from a love for handmade
                            beauty and sustainable living.
                        </p>

                        <p className="simple-text font-dm-sans text-lg font-normal">
                            We believe you don’t have to own everything to feel
                            special. Our mission is to make handcrafted macrame
                            pieces accessible for every occasion through a
                            simple and mindful rental experience. We believe
                            you don’t have to own everything to feel special.
                            Our mission is to make handcrafted macrame pieces
                            accessible for every occasion through a simple and
                            mindful rental experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;