import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api/todos', // Sua URL base
    timeout: 10000, // Tempo limite de espera por resposta (opcional)
    headers: {
      'Content-Type': 'application/json', // Cabeçalhos padrão (opcional)
      'Access-Control-Allow-Origin': '*', // Pode ser restrito a origens específicas
    },
  });