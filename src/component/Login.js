export default function Login(){
    function handleLogin(){
        localStorage.setItem("isLoggedIn","true");
        window.location.href="/todos";
    }
    return (
        <>
        <h1>Login</h1>
            <button onClick={handleLogin}>
                Login
            </button>
        </>
    );
}