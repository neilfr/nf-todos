export const getStages = async () => {
    const response = await fetch("http://localhost:8000/api/stages",)
    if (!response.ok) { throw new Error(`Error: ${response.status}`)}

    return await response.json()
}