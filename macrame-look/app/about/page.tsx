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
                        <h2>Մեր Մասին</h2>

                        <div className="divider"></div>

                        <p className="about-bold-text">
                            Մակրամե՝ քո ամենահիշվող պահերի համար
                        </p>

                        <p className="simple-text font-dm-sans text-sm font-normal">
                            Յուրաքանչյուր ստեղծագործող մարդ իր ներսում կրում է մի աշխարհ՝ լցված երազանքներով, զգացողություններով ու մտքերով, որոնք ժամանակի ընթացքում դառնում են գաղափարներ, իսկ հետո՝ իրականություն։
                            Այս նախագիծը հենց այդպիսի ճանապարհի արդյունք է։
                            Սկզբում այն պարզապես մի պատկեր էր՝ մտքում ծնված, ապա՝ թելից ու հանգույցներից հյուսված մի պատմություն:
                            Մակրամեն ինձ համար միայն ձեռագործ տեխնիկա չէ։ Այն հանգստություն է, ինքնարտահայտման ձև։
                            Ամեն մի հատված մշակվում է ուշադրությամբ, որպեսզի վերջում ստացվի այն, ինչ զգացվում է ոչ միայն աչքով, այլ նաև սրտով։
                            Եթե դու էլ ես գնահատում ձեռագործի արժեքը, ապա այս մակրամե աշխատանքը ստեղծված է հենց քեզ համար։
                            Գրիր մեզ՝ քո գաղափարը կյանքի կոչելու համար:
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;