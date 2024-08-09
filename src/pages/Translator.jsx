import TranslatorBox from "../components/TranslatorBox";
import SwapIcon from "../assets/arrows-right-left.svg"
import { TranslatorContext } from "../context/TranslatorContext";
import { useContext, useState } from "react";
import { convertLanguage } from "../services/apis/myMemoryApi";
function Translator() {

    const { textToBeTranslated, setTextToBeTranslated } = useContext(TranslatorContext);

    const [sourceLanguage, setSourceLanguage] = useState('en-GB');
    const [destinationLanguage, setDestinationLanguage] = useState('es-ES');

    const [translatedText, setTranslatedText] = useState('');

    function updatedTextToBeTransLated(text) {
        setTextToBeTranslated(text);
    }

    async function handleApiCall() {
        const response = await convertLanguage(sourceLanguage, destinationLanguage, textToBeTranslated);
        const translatedTextResponse = response.responseData.translatedText;
        setTranslatedText(translatedTextResponse);
    }

    function handleSourceLanguage(language) {
        setSourceLanguage(language);
    }

    function handleDestinationLanguage(language) {
        setDestinationLanguage(language);
    }

    return (
        <div className="w-full h-[100vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-28">
            <section className="w-1/2 mx-auto text-center rounded ">
                <h1 className="text-4xl font-bold">Language Translator App</h1>
                <div className="flex justify-between py-6">

                    <TranslatorBox placeholder="Enter the text to be converted" onChange={updatedTextToBeTransLated} onLanguageSelected={handleSourceLanguage} />
                    <img 
                        src={SwapIcon}
                        alt="Swap icon"
                        className="my-auto cursor-pointer"

                    />
                    <TranslatorBox textValue={translatedText} onLanguageSelected={handleDestinationLanguage} />
                </div>
                <button 
                    onClick={handleApiCall}
                    className="w-full text-white p-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Translate Text 
                </button>
            </section>
        </div>
    )
}

export default Translator;