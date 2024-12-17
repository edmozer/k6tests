import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Bota cerca de 10 usuarios por 30 segundos
    { duration: '1m', target: 50 },  // Deixa 50 users por 1 minuto
    { duration: '30s', target: 0 },  // Reduz de pouco a pouco os usuarios -> 30s
  ],
};

export default function () {
  // faz uma request GET para a rota principal
  const res = http.get('https://serverest.dev/');
  
  // Validations simples para conferir o status da resposta
  check(res, {
    'status code is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1); // Aguarda 1 segundo entre as iterations
}
