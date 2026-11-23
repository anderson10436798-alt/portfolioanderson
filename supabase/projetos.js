import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const TABELA_PROJETOS = "projetos";
const ENDPOINT_REST = `${SUPABASE_URL}/rest/v1/${TABELA_PROJETOS}`;

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    };
}

// Busca todos os projetos cadastrados no Supabase
export async function listarProjetos() {
    const resposta = await fetch(`${ENDPOINT_REST}?select=*&order=id.desc`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os projetos do Supabase.");
    }

    return await resposta.json();
}

// Insere um novo projeto vindo do formulário do dashboard.html
export async function cadastrarProjeto(projeto) {
    const resposta = await fetch(ENDPOINT_REST, {
        method: "POST",
        headers: {
            ...getHeaders(),
            "Prefer": "return=representation"
        },
        body: JSON.stringify([projeto])
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível salvar o projeto no Supabase.");
    }

    return await resposta.json();
}
