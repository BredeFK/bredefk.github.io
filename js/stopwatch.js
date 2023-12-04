let year = new Date().getFullYear()
let month = 12 - 1
let day = 24

const queryString = new URLSearchParams(window.location.search)
setInterval(
    function startStopWatch() {

        let date = new Date(year, month, day)

        if (queryString.has("date")) {
            date = new Date(queryString.get("date"))
        }

        let now = new Date()
        let diff = date - now

        const t = {
            //years: Math.floor(Math.floor(diff / (1000 * 60 * 60 * 24)) / 365).toString().padStart(2, '0'),
            days: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
            minutes: Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0'),
            seconds: Math.floor((diff / 1000) % 60).toString().padStart(2, '0'),
        }
        const watch = document.getElementById("watch")

        watch.innerHTML = //`<span class="greenColor">${t.years}</span> years : ` +
            `<span class="greenColor">${t.days}</span> days : ` +
            `<span class="greenColor">${t.hours}</span> hours : ` +
            `<span class="greenColor">${t.minutes}</span> minutes : ` +
            `<span class="greenColor">${t.seconds}</span> seconds`

        document.title = `${(queryString.has("date")) ? "Time until " + formatDate(date) : "Time until Jul"}`
    }
    , 100) // Update every 100 milliseconds

function rotationsAroundTheWorld() {
    const daysToOrbitTheSun = 365.25625

    let diff = Date.now() - new Date(year, month, day)
    let years = Math.floor(Math.floor(diff / (1000 * 60 * 60 * 24)) / 365)
    let days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365

    let yearsAndDay = years + (days / daysToOrbitTheSun)
    let numberOfOrbits = (daysToOrbitTheSun * yearsAndDay) / 365
    const rotations = document.getElementById("rotations")
    rotations.innerHTML = `<span class="greenColor">${numberOfOrbits}</span> orbits around the sun`
    rotations.title = `(Days to orbit the sun * years and days you've lived) / 365` +
        `\n(${daysToOrbitTheSun} * ${yearsAndDay}) / ${365}`

}

function formatDate(date) {
    const month = date.toLocaleDateString('default', {month: 'long'})
    return `${date.getDate()}. ${month} ${date.getFullYear()}`
    //return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}