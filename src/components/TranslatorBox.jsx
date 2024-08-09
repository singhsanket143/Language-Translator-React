import { useState } from 'react';
import Speaker from '../assets/speaker-wave.svg'
import languages from '../helpers/languages';


function TranslatorBox({ textValue, placeholder, onChange, onLanguageSelected , languageCode}) {

    const [langaugeSelected, setLanguageSelected] = useState(languageCode ?? 'en-GB');

    function handleTextChange(event) {
        onChange?.(event.target.value);
    }

    function handleLanguageChange(event) {
        setLanguageSelected(event.target.value);
        onLanguageSelected?.(event.target.value);
    }

    return (
        <>
            <div className="w-1/2 border rounded-md shadow-md">
                    <textarea
                        placeholder={placeholder}
                        onChange={handleTextChange}
                        value={textValue}
                        className="w-full p-2 focus:outline-gray-200"
                        rows={8}
                    >

                    </textarea>

                    <div className='flex items-center justify-between w-full gap-2 border rounded-md'>
                        <img 
                            src={Speaker}
                            alt="speak icon"
                            className="rounded-sm cursor-pointer hover:bg-gray-100"

                        />
                        <select
                            name="language"
                            value={langaugeSelected}
                            onChange={handleLanguageChange}
                            className="w-full p-1 border border-gray-200 outline-gray-500"
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}

                        </select>
                    </div>
                </div>
        </>
    )
}

export default TranslatorBox;