let year = 1997
let month = 2 - 1
let day = 13
let hours = 9
let minutes = 36
setInterval(
    function startStopWatch() {


        let birthday = new Date(year, month, day, hours, minutes)
        let now = new Date()
        let diff = now - birthday

        const t = {
            years: Math.floor(Math.floor(diff / (1000 * 60 * 60 * 24)) / 365).toString().padStart(2, '0'),
            days: (Math.floor(diff / (1000 * 60 * 60 * 24)) % 365).toString().padStart(3, '0'),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
            minutes: Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0'),
            seconds: Math.floor((diff / 1000) % 60).toString().padStart(2, '0'),
        }
        const watch = document.getElementById("watch")

        watch.innerHTML = `<span class="greenColor">${t.years}</span> years : ` +
            `<span class="greenColor">${t.days}</span> days : ` +
            `<span class="greenColor">${t.hours}</span> hours : ` +
            `<span class="greenColor">${t.minutes}</span> minutes : ` +
            `<span class="greenColor">${t.seconds}</span> seconds`


        document.title = `${formatDate(birthday)} - ${formatDate(now)}`
    }
    , 100) // Update every 100 milliseconds

function rotationsAroundTheWorld() {
    const daysToOrbitTheSun = 365.25625

    let diff = Date.now() - new Date(year, month, day, hours, minutes)
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
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}