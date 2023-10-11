window.addEventListener('DOMContentLoaded', (event) => {
    const fileList = document.getElementById('file-list');
    const tocContainer = document.getElementById('table-of-contents');


    // List of known text files
    const songFiles = [
        'flaaklypa.txt',
        'skyrim.txt'
    ];

    // Function to load and display the content of a text file
    function displayTextFileContent(songName) {
        fetch(`../tabs/${songName}`)
            .then(response => response.text())
            .then(data => {
                const songContent = `<pre>${data}</pre>`;
                const card = document.createElement('div');
                card.className = 'card text-dark border-dark col-lg-8 col-sm-12 mx-auto mb-5';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body no-margin';

                const cardTitle = document.createElement('h4');
                cardTitle.className = 'card-title pb-2';
                cardTitle.innerHTML = convertDisplayName(songName);

                const songDiv = document.createElement('div');
                songDiv.id = songName.split('.')[0];
                songDiv.className = 'song';
                songDiv.innerHTML = songContent;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(songDiv);
                card.appendChild(cardBody);

                // Dynamically adjust card size based on content length
                const contentHeight = songDiv.clientHeight;
                const minHeight = 100;
                const maxHeight = 600;

                if (contentHeight > minHeight && contentHeight < maxHeight) {
                    card.style.height = `${contentHeight}px`;
                } else if (contentHeight >= maxHeight) {
                    card.style.height = `${maxHeight}px`;
                }

                fileList.appendChild(card);

            })
            .catch(error => {
                fileList.insertAdjacentHTML('beforeend', `<li>Error loading ${songName}.</li>`);
                console.error(error);
            });
    }

    function convertDisplayName(filename) {
        let displayName = filename.split('.')[0]

        displayName = displayName.replaceAll("ae", "&#229;")
        displayName = displayName.replaceAll("oe", "&#248;")
        displayName = displayName.replaceAll("aa", "&#229;")
        displayName = displayName.replaceAll("_", " ")

        return displayName[0].toUpperCase() + displayName.substring(1, displayName.length)
    }

    function generateTableOfContents() {
        const tocList = document.createElement('ul');
        songFiles.forEach(fileName => {
            const displayName = convertDisplayName(fileName);
            tocList.innerHTML += `<li><a href="#${fileName.split('.')[0]}">${displayName}</a></li>`;
        });

        tocContainer.appendChild(tocList);
    }

    generateTableOfContents()

    songFiles.forEach(fileName => {
        displayTextFileContent(fileName);
    });
});
