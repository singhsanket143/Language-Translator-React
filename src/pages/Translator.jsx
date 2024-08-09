import TranslatorBox from "../components/TranslatorBox";
import SwapIcon from "../assets/arrows-right-left.svg"
import { TranslatorContext } from "../context/TranslatorContext";
import { useContext, useState } from "react";
import { convertLanguage } from "../services/apis/myMemoryApi";
function Translator() {

    const { textToBeTranslated, setTextToBeTranslated } = useContext(TranslatorContext);

    const [sourceLanguage, setSourceLanguage] = useState('en-GB');
    const [destinationLanguage, setDestinationLanguage] = useState('es-ES');

    const [loading, setLoading] = useState(false);

    const [translatedText, setTranslatedText] = useState('');

    function utterText(text, language) {
        const synth = window.speechSynthesis; // synthesis controller 

        const utterance = new SpeechSynthesisUtterance(text); // create a new speech utterance
        utterance.lang = language;

        synth.speak(utterance); // trigger the speech synthesis
    }

    function updatedTextToBeTransLated(text) {
        setTextToBeTranslated(text);
    }

    function clearInput() {
        setTextToBeTranslated('');
        setTranslatedText('');
    }

    async function handleApiCall() {
        if(!textToBeTranslated.trim()) {
            setTranslatedText("Input text cannot be empty");
            return;
        }
        if(!sourceLanguage.trim()) {
            setTranslatedText("Source language cannot be empty");
            return;
        }
        if(!destinationLanguage.trim()) {
            setTranslatedText("Destination language cannot be empty");
            return;
        }
        if(sourceLanguage === destinationLanguage) {
            setTranslatedText("Source and destination languages cannot be the same");
            return;
        }

        try {
            setLoading(true);
            const response = await convertLanguage(sourceLanguage, destinationLanguage, textToBeTranslated);
            const translatedTextResponse = response.responseData.translatedText;
            setTranslatedText(translatedTextResponse);
        } catch (error) {
            console.log(error);
            setTranslatedText("An error occurred while translating the text");
        } finally {
            setLoading(false);
        }
        
    }

    function handleSwap() {
        const tempLanguage = sourceLanguage; // input language
        const tempText = textToBeTranslated; // input text

        setSourceLanguage(destinationLanguage);
        setDestinationLanguage(tempLanguage);

        setTextToBeTranslated(translatedText);
        setTranslatedText(tempText);
    }

    function handleSourceLanguage(language) {
        setSourceLanguage(language);
    }

    function handleDestinationLanguage(language) {
        setDestinationLanguage(language);
    }

    return (
        <div className="w-full min-h-[100vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-28">
            <section className="w-1/2 mx-auto text-center rounded ">
                <h1 className="text-4xl font-bold">Language Translator App</h1>
                <div className="flex flex-col md:flex-row items-center justify-between py-6">

                    <TranslatorBox 
                        placeholder="Enter the text to be converted" 
                        onChange={updatedTextToBeTransLated} 
                        onLanguageSelected={handleSourceLanguage} 
                        languageCode={sourceLanguage}
                        textValue={textToBeTranslated}
                        handleSpeech={utterText}
                    />
                    <img 
                        onClick={handleSwap}
                        src={SwapIcon}
                        alt="Swap icon"
                        className="my-auto cursor-pointer"

                    />
                    <TranslatorBox 
                        textValue={translatedText} 
                        handleSpeech={utterText}
                        onLanguageSelected={handleDestinationLanguage} 
                        languageCode={destinationLanguage}
                    />
                </div>
                <button 
                    onClick={handleApiCall}
                    className="w-full text-white p-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    {(loading) ? 'Translating text ...' : 'Translate Text'}
                </button>
                <button 
                    onClick={clearInput}
                    className="w-full text-white p-2 mt-2 bg-slate-500 rounded-md hover:bg-slate-600"
                >
                    Clear Input
                </button>
            </section>
        </div>
    )
}

export default Translator;