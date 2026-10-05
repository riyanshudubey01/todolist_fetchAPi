const BASE_URL = "http://localhost:8000";

export async function fetchwithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = localStorage.getItem("accessToken");
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${accessToken}`);

    let response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers
    });

    if(response.ok) return response;

    if(response.status===401){
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                refreshToken:refreshToken
            })
        });
        if(!refreshResponse.ok){
            throw new Error("Refresh token expired");
        }
        const data = await refreshResponse.json() as { accessToken: string };
        localStorage.setItem("accessToken",data.accessToken);
        headers.set("Authorization", `Bearer ${data.accessToken}`);
        response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers
        });
        return response;
    }
    throw new Error(`Request failed: ${response.status}`);
}