'use server';


export async function fetchUsersApi(endpoint: string){
    const res = await fetch(`http://localhost:3000/api/proxy/${endpoint}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}