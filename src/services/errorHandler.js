export function getErrorMessage(errorType){
    const msg = String(errorType?.message ?? errorType ?? '') //
    if (msg.includes('429')) return ["Probably ", "ran out of API credits", " (I only get 5 every minute)"]
    if (msg.includes('401')) return ["Probably ", "the API key was rejected", " (check the .env file)"]
    if (msg.includes('No stock data')) return ["Probably ", "the API returned no data", " (maybe a holiday?)"]
    return ["", "an unexpected error occurred", ""]
}