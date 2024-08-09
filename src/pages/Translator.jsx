import TranslatorBox from "../components/TranslatorBox";
import SwapIcon from "../assets/arrows-right-left.svg"
function Translator() {

    return (
        <div className="w-full h-[100vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-28">
            <section className="w-1/2 mx-auto text-center rounded ">
                <h1 className="text-4xl font-bold">Language Translator App</h1>
                
                <div className="flex justify-between py-6">

                    <TranslatorBox />
                    <img 
                        src={SwapIcon}
                        alt="Swap icon"
                        className="my-auto cursor-pointer"

                    />
                    <TranslatorBox />
                </div>
            </section>
        </div>
    )
}

export default Translator;