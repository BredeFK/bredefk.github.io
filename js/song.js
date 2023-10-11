window.addEventListener('DOMContentLoaded', (event) => {
    const fileList = document.getElementById('file-list');

    // Function to fetch and list text files in the directory
    function listTextFiles() {
        fetch('../tabs/')
            .then(response => response.text())
            .then(data => {
                const files = data
                    .split('\n')
                    .filter(line => line.trim().endsWith('.txt'))
                    .map(line => line.trim());

                console.log(files)

                if (files.length === 0) {
                    fileList.innerHTML = 'No song files found';
                } else {
                    fileList.innerHTML = files.map(file => `<li><a href="${file}">${file}</a></li>`).join('');
                }
            })
            .catch(error => {
                fileList.innerHTML = '<li>Error listing song files.</li>';
                console.error(error);
            });
    }

    listTextFiles();
});
