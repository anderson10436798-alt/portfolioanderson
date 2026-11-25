import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../supabase/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const mensagemErro = document.getElementById("mensagem-erro");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        mensagemErro.textContent = "";

        const emailDigitado = document.getElementById("usuario").value.trim();
        const senhaDigitada = document.getElementById("senha").value;

        try {
            const url = `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(emailDigitado)}&select=id,nome,email,senha`;

            const resposta = await fetch(url, {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            });

            if (!resposta.ok) {
                throw new Error("Erro ao consultar o banco de dados.");
            }

            const usuarios = await resposta.json();
            const usuarioEncontrado = usuarios[0];

            if (usuarioEncontrado && usuarioEncontrado.senha === senhaDigitada) {
                sessionStorage.setItem("logado", "true");
                sessionStorage.setItem("usuarioNome", usuarioEncontrado.nome);
                window.location.href = "dashboard.html";
            } else {
                mensagemErro.textContent = "E-mail ou senha incorretos. Verifique seus dados.";
            }
        } catch (erro) {
            console.error(erro);
            mensagemErro.textContent = "Não foi possível validar o login agora.";
        }
    });
});
