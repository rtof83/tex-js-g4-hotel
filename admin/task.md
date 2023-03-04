# Definição das rotas e APIs

## PUBLIC

```javascript
// GET

// ler todas as acomodações
.get("/accommodations");
// ler uma acomodação
.get("/accommodations/id");
// ler todos os banners
.get('/banners');
// ler um banner
.get('/banners/id');
// ler todas as reservas
.get('/reservations');
// ler uma reserva
.get('/reservations/id');
// ler um usuário
.get('/users/id');
// ler todos os serviços
.get('/services');

// POST

// criar uma reserva
.post("/reservations");
// criar um usuário
.post("users");
// logar um usuário
.post("users/login");

// PUT

// atualizar uma reserva
.put('/reservations/id');
// atualizar um usuário
.put('/users/id');

// DELETE

// deletar uma reserva
.delete('/reservations/id');
// deletar um usuário
.delete('/users/id');
```

<br>
<hr>
<br>

## ADMIN
``` javascript
// GET

// ler todos os usuários
.get('/users');

// POST

// criar uma acomodação
.post("/accommodations");
// criar um banner
.post("/banners");
// criar um cupom
.post("/reservations/coupons");
// criar um serviço
.post("services");
// criar um produto
.post("products");

// PUT

// atualizar uma acomodação
.put("/accommodations/id");
// atualizar um banner
.put('/banners/id');
// atualizar um serviço
.put("/services/id");
// atualizar um cupom
.put("/reservations/coupons/id");

// DELETE

// deletar uma acomodação
.delete("/accommodations/id");
// deletar um banner
.delete('/banners/id');
// deletar um serviço
.delete("/services/id");
// deletar um cupom
.delete("/reservations/coupons/id");
```