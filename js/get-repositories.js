async function fetchRepositories() {
    const input = document.getElementById("access_token")
    const token = input.value
    if (token === null || token === undefined || token.length < 5) {
        console.log("Incorrect access token")
        input.value = '';
    } else {
        const response = await fetch('https://api.github.com/users/BredeFK/repos', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${token}`
            }
        });

        let repositories = await response.json()
        if (response.status === 200) {
            document.getElementById("info").classList.add("hideElement")
            document.getElementById("formElement").classList.add("hideElement")
            const repositoriesElement = document.getElementById('repositories')
            for (const repository of repositories) {
                const row = document.createElement('div')
                const title = document.createElement('h2')
                const description = document.createElement('p')
                const createdAt = document.createElement('p')

                title.innerText = repository.name
                description.innerText = repository.description || "No description"
                let date = new Date(repository.created_at)
                createdAt.innerText = date.toLocaleDateString()

                row.append(title)
                row.append(description)
                row.append(createdAt)
                repositoriesElement.append(row)
            }
        } else {
            console.log("Access token is not valid")
            input.value = "";
        }
    }
}