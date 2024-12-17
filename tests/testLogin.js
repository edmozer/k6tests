import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    // Stress
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },  // Sobe para 100 vus em 1 minuto
        { duration: '2m', target: 200 },  // Sobe para 200 vus em 2 minutos
        { duration: '1m', target: 0 },    // Reduz para 0 em 1 minuto
      ],
      gracefulStop: '20s',
    },
  },
};

// function principal 
export default function () {
  // Teste na rota POST /login
  let payload = JSON.stringify({
    email: 'fulano@qa.com',
    password: 'teste',
  });

  let params = {
    headers: { 'Content-Type': 'application/json' },
  };

  let resPost = http.post('https://serverest.dev/login', payload, params);
  check(resPost, {
    'POST /login: status code 200': (r) => r.status === 200,
    'POST /login: response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Pausa entre as iterations
  sleep(1);
}
