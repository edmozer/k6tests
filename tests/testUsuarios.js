import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    // Pico
    peak_test: {
      executor: 'ramping-vus', // Aumenta o num de usuarios virtuais em etapas
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },  // Sobe para 50 em 30 segundos
        { duration: '1m', target: 50 },   // Mantem 50 vus por 1 minuto
        { duration: '30s', target: 0 },   // Reduz para 0 em 30 segundos
      ],
      gracefulStop: '10s',
    },
  },
};

// function principal 
export default function () {
  // Teste na rota GET /usuarios
  let resGet = http.get('https://serverest.dev/usuarios');
  check(resGet, {
    'GET /usuarios: status code 200': (r) => r.status === 200,
    'GET /usuarios: response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Pausa entre as iterations
  sleep(1);
}
