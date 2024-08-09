import Speaker from '../assets/speaker-wave.svg'


function TranslatorBox() {
    return (
        <>
            <div className="w-1/2 border rounded-md shadow-md">
                    <textarea
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
                            className="w-full p-1 border border-gray-200 outline-gray-500"
                        >
                            <option>
                                English
                            </option>
                            <option>
                                French
                            </option>

                        </select>
                    </div>
                </div>
        </>
    )
}

export default TranslatorBox;