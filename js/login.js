import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../supabase/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const mensagemErro = document.getElementById("mensagem-erro");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        mensagemErro.textContent = "A verificar dados...";

        const emailDigitado = document.getElementById("usuario").value.trim().toLowerCase();
        const senhaDigitada = document.getElementById("senha").value;

        try {
            // Busca todos os registos da tabela usuarios para evitar falhas de filtro na URL
            const url = `${SUPABASE_URL}/rest/v1/usuarios?select=*`;

            const resposta = await fetch(url, {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            });

            if (!resposta.ok) {
                mensagemErro.textContent = `Erro Supabase (${resposta.status}): verifica o supabase/config.js`;
                return;
            }

            const usuarios = await resposta.json();

            if (!usuarios || usuarios.length === 0) {
                mensagemErro.textContent = "A tabela 'usuarios' retornou vazia.";
                return;
            }

            const usuarioEncontrado = usuarios.find(
                (u) => u.email && u.email.trim().toLowerCase() === emailDigitado
            );

            if (!usuarioEncontrado) {
                mensagemErro.textContent = `E-mail não encontrado. No banco existe: ${usuarios[0].email}`;
                return;
            }

            if (usuarioEncontrado.senha === senhaDigitada) {
                sessionStorage.setItem("logado", "true");
                sessionStorage.setItem("usuarioNome", usuarioEncontrado.nome || "Anderson");
                window.location.href = "dashboard.html";
            } else {
                mensagemErro.textContent = "Senha incorreta! Verifica se escreveste exatamente como está na tabela.";
            }
        } catch (erro) {
            mensagemErro.textContent = `Falha de ligação: ${erro.message}`;
        }
    });
});
