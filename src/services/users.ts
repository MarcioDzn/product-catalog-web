export async function getMe() {
    const token = localStorage.getItem("access_token");

    const response = await fetch("http://localhost:8000/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    return response.json();
}