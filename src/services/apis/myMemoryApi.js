import { MY_MEMORY_API_URL } from "../../helpers/constants";

export async function convertLanguage(sourceLanguage, targetLanguage, text) {
    const uri = `${MY_MEMORY_API_URL}?q=${text}&langpair=${sourceLanguage}|${targetLanguage}`;
    const response = await fetch(uri);
    const data = await response.json();
    return data;
}
