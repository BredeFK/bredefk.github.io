function renderSong(data) {
    const notesBefore = [];
    const notesAfter = [];
    const tabLines = [];
    let columns = 0;

    data.split('\n').forEach(line => {
        if (line.trim().startsWith('<')) {
            (tabLines.length === 0 ? notesBefore : notesAfter).push(`<p class="song-note">${line}</p>`);
        } else {
            columns = Math.max(columns, line.trimEnd().length);
            tabLines.push(highlightFrets(line));
        }
    });

    while (tabLines.length > 0 && tabLines.at(-1).trim() === '') {
        tabLines.pop();
    }
    while (tabLines.length > 0 && tabLines[0].trim() === '') {
        tabLines.shift();
    }

    return notesBefore.join('') + `<pre style="--columns: ${columns}">${tabLines.join('\n')}</pre>` + notesAfter.join('');
}

function highlightFrets(line) {
    const isStringLine = /^\s*[A-Ga-g][#b]?\|/.test(line);
    return isStringLine ? line.replaceAll(/\d+/g, '<span class="fret">$&</span>') : line;
}

window.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');
    const tocContainer = document.getElementById('table-of-contents');


    // List of known text files
    const songs = [
        {file: 'flaaklypa.guitar', title: 'Flåklypa'},
        {file: 'skyrim.guitar', title: 'Skyrim'},
        {file: 'seven_nation_army.guitar', title: 'Seven nation army'},
        {file: 'tetris.guitar', title: 'Tetris'},
        {file: 'wii_channel_theme.guitar', title: 'Wii channel theme'}
    ];

    const accentColors = ['#7fa6cc', '#7cc49a', '#e0b25c', '#e08a9b', '#b39ddb', '#6cc5c9'];

    // Function to load and display the content of a text file
    function displayTextFileContent({file, title}, index) {
        const card = document.createElement('div');
        fileList.appendChild(card);

        fetch(`../tabs/${file}`)
            .then(response => response.text())
            .then(data => {
                const songContent = renderSong(data);
                card.id = file.split('.')[0];
                card.className = 'card song-card mb-4';
                card.style.setProperty('--accent', accentColors[index % accentColors.length]);

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h2');
                cardTitle.className = 'song-title';
                cardTitle.textContent = title;

                const songDiv = document.createElement('div');
                songDiv.className = 'song';
                songDiv.innerHTML = songContent;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(songDiv);
                card.appendChild(cardBody);
            })
            .catch(error => {
                fileList.insertAdjacentHTML('beforeend', `<p>Error loading ${title}.</p>`);
                console.error(error);
            });
    }

    function generateTableOfContents() {
        const tocList = document.createElement('ul');
        songs.forEach(({file, title}, index) => {
            tocList.innerHTML += `<li><a href="#${file.split('.')[0]}" style="--accent: ${accentColors[index % accentColors.length]}">${title}</a></li>`;
        });

        tocContainer.appendChild(tocList);
    }

    generateTableOfContents()

    songs.forEach(displayTextFileContent);
});
