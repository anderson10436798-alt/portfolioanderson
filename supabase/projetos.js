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

export async function listarProjetos() {
    const resposta = await fetch(`${ENDPOINT_REST}?select=*&order=criado_em.desc`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!resposta.ok) {
        const detalhe = await resposta.text();
        throw new Error(`Erro ao listar (${resposta.status}): ${detalhe}`);
    }

    return await resposta.json();
}

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
        const detalhe = await resposta.text();
        throw new Error(`Erro Supabase (${resposta.status}): ${detalhe}`);
    }

    return await resposta.json();
}
