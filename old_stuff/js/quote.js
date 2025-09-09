async function getQuote() {
    let data = await getQuoteFromLocalStorage()
    const quoteElement = document.getElementById("quote")
    const authorElement = document.getElementById("author")
    quoteElement.innerHTML = '<i>"' + data.quote + '"</i>'
    authorElement.innerText = "--- " + data.author + " ---"
}

async function getQuoteOfTheDayFromQuotesRest() {
    const response = await fetch("https://quotes.rest/qod?language=en", {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    if (response.status) {
        let quoteBody = await response.json()
        if (quoteBody.contents.quotes[0]) {
            return quoteBody.contents.quotes[0]
        }
    } else {
        console.error("Could not get Quote of the day")
    }
    return null
}

async function getQuoteFromLocalStorage() {
    let data = localStorage.getItem(getDate() + "-quote")
    if (data === null || data === undefined || data === "") {
        let quote = await getQuoteOfTheDayFromQuotesRest()
        if (quote !== null) {
            localStorage.clear()
            localStorage.setItem(getDate() + "-quote", JSON.stringify(quote))
            return quote
        }
    } else {
        return JSON.parse(data)
    }
}

function getDate() {
    return new Date().toISOString().split("T")[0]
}