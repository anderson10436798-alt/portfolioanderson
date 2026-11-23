document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const mensagemErro = document.getElementById("mensagem-erro");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const usuario = document.getElementById("usuario").value.trim();
            const senha = document.getElementById("senha").value.trim();

            const usuarioCorreto = "anderson";
            const senhaCorreta = "1234";

            if (usuario === usuarioCorreto && senha === senhaCorreta) {
                sessionStorage.setItem("logado", "true");
                window.location.href = "dashboard.html";
            } else {
                mensagemErro.textContent = "Usuário ou senha incorretos.";
            }
        });
    }
});
