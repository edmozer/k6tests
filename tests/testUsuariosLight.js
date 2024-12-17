import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 1 },  // Começa com 1 usuário por 15 segundos
    { duration: '30s', target: 3 },  // Aumenta para 3 usuários por 30 segundos
    { duration: '15s', target: 0 },  // Reduz para 0 usuários em 15 segundos
  ],
};

export default function () {
  // Faz uma request GET para a rota /usuarios
  const res = http.get('https://serverest.dev/usuarios');
  
  // Validações para conferir o status da resposta
  check(res, {
    'status code é 200': (r) => r.status === 200,
    'tempo de resposta é < 500ms': (r) => r.timings.duration < 500,  // Alterado para 500ms
  });

  sleep(1); // Aguarda 1 segundo entre as iterações
}
