import { CheckCircle2 } from "lucide-react";

type RentalModalSuccessProps = {
    onClose: () => void;
};

const RentalModalSuccess = ({
    onClose,
}: RentalModalSuccessProps) => {
    return (
        <div className="px-6 py-16 text-center sm:px-10">
            <div className="mx-auto flex-center h-16 w-16 rounded-full bg-ivory">
                <CheckCircle2
                    size={32}
                    strokeWidth={1.5}
                    className="text-purple/80"
                />
            </div>

            <h3 className="mt-5 font-serif text-2xl">
                Հայտը ուղարկված է
            </h3>

            <p className="mx-auto mt-3 text-sm leading-6 text-ink">
                Շնորհակալություն։<br />
                Շուտով կապ կհաստատենք Ձեզ հետ պատվերը հաստատելու համար։
            </p>
        </div>
    );
};

export default RentalModalSuccess;