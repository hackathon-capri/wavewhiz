<script>
    export default {
  name: "FormasSimples"
}
</script>

<template>
    <header>

    </header>
    <main>
        <section>
            <div class="quadrado">
              <div class="detalhes">
                  <img src="/public/login-icon.png" alt="">
                  <h1>Cadastre-se como empreendedor:</h1>
              </div>
            </div>
        </section>
    </main>
    <footer>
         <img src="/public/logo-footer.png" alt="" />
         <div class="info">
            <p>Desenvolvimento:</p>
            <p>Ana Paula, Anna Flávia, Emilly, Kelly, Pietra.</p>
            <p><a href="tel:+5547999205622">+55 (47) 9 9920-5622</a></p>
         </div>
         <div class="aba-footer">
           <ul>
          <li>Início</li>
          <li>Sobre</li>
          <li>Cadastro</li>
          <li>Salvos</li>
          <li>Carrinho</li>
         </ul>
         </div>
         <div class="categoria-footer">
           <ul>
          <li>Lojas</li>
          <li>Artesanato</li>
          <li>Roupas</li>
          <li>Alimentação</li>
          <li>Outros</li>
         </ul>
         </div>
             <div class="socialmedia">
           <span class="fa-brands fa-square-instagram"></span>
           <span class="fa-brands fa-linkedin"></span>
         </div>
    </footer>
</template>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
  background-color: #04394A;
}
.formas {
  display: flex;
  gap: 20px;
}
.quadrado {
  margin: 5vw auto 5vw auto;
  width: 1400px;
  height: 600px;
  background: #04394A;
  border: #f1f1f1 4px solid;
  display: flex;
  justify-content: center;
  align-items: self-start;
}
.detalhes {
  text-align: center;
  color: white;
  padding: 2vw 0 0 0;
}
.detalhes img {
  padding: 0 0 1.5vw 0;
}
.detalhes h1 {
  padding: 1.5vw 0 0 0;
  font-size: 1.3rem;
  background-color: #08607C;
  border-radius: 60px;
  width: 35vw;
  padding: 1vw 0 1vw 0 ;
  display: flex;
  justify-content: center;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  gap: 40px;
}
footer img {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}
.info {
  display: flex;
  flex-direction: column;
  max-width: 220px;
}
.info p {
  margin: 4px 0;
}
.info a {
  text-decoration: none;
  color: #f1f1f1;
  font-weight: bold;
}

.aba-footer ul,
.categoria-footer ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}
.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 28px;
}

.socialmedia span {
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>
