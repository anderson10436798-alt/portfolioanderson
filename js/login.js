
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import {
    SUPABASE_URL,
    SUPABASE_ANON_KEY
} from "../supabase/config.js";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");
    const mensagemErro = document.getElementById("mensagem-erro");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;

        mensagemErro.textContent = "Verificando acesso...";

        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if (error) {
                throw error;
            }

            if (data.session) {
                window.location.href = "dashboard.html";
            }

        } catch (error) {

            console.error("Erro no login:", error);

            mensagemErro.textContent =
                "E-mail ou senha incorretos. Verifique seus dados.";

        }

    });

});
