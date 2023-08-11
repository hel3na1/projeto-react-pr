import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://teste-api-node-production.up.railway.app/', // Sua URL base
    timeout: 10000, // Tempo limite de espera por resposta (opcional)
    headers: {
      'Content-Type': 'application/json', // Cabeçalhos padrão (opcional)
      'Access-Control-Allow-Origin': '*', // Pode ser restrito a origens específicas
    },
  });