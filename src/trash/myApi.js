export async function foobar() {
    try {
        const res = await fetch('http://localhost:8000/api/tasks')
        const json = await res.json()

        return json
    } catch(error){
        return null
    }
}