async function fetchRepositories() {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': 'Bearer TODO'
        }
    });

    let repositories = await response.json()
    const repositoriesElement = document.getElementById('repositories')
    for (let i = 0; i < repositories.length; i++) {
        const row = document.createElement('div')
        const title = document.createElement('h1')
        const description = document.createElement('p')
        const createdAt = document.createElement('p')

        title.innerText = repositories[i].name
        description.innerText = repositories[i].description || "No description"
        let date = new Date(repositories[i].created_at)
        createdAt.innerText = date.toLocaleDateString()

        row.append(title)
        row.append(description)
        row.append(createdAt)
        repositoriesElement.append(row)
    }
}

function parseRepositories(repositories) {

}