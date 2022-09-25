export async function get(path) {
    return (await fetch(process.env.REACT_APP_URL + path, {
        method: 'GET',
        credentials: 'include',
    })).json();
}

export async function post(path, body) {
    return (await fetch(process.env.REACT_APP_URL + path, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })).json();
}