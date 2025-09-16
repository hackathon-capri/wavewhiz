<script setup></script>
<template>
  <div class="quadrado">
    <div class="detalhes">
      <img src="/login-icon.png" alt="Ícone de login" />
      <h1>Adicione seu item:</h1>
    </div>
    <div class="listas">
      <div>
        <ul>
          <li>
            <p>Nome do Produto:</p>
          </li>
          <li>
            <p>Precificação:</p>
          </li>
          <li>
            <p>Descrição:</p>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
    <div class="botoes">
      <button type="submit">Enviar</button>
      <button type="button" @click="resetForm">Limpar</button>
    </div>
  </div>
</template>

<style scoped>
.quadrado {
  margin: 5vw auto;
  width: 1300px;
  min-height: 600px;
  border: 5px solid white;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
}
.detalhes {
  margin: 20px 20px 20px 20px;
}
.detalhes img {
  height: 70px;
  width: 75px;
}
.detalhes h1 {
  font-size: 1.4rem;
  background-color: #08607C;
  padding: 10px 30px 10px 30px;
  margin-left: 15px;
  border-radius: 100px;
}
.listas {
  display: flex;
  margin-top: 7vw;
  font-size: 1.4rem;
}
.listas ul {
  list-style: none;
  margin: 0 10vw 0 10vw;
}
.listas li {
  margin-bottom: 20px;
}
.botoes {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
}

.botoes button {
  background-color: #08607c;
  color: white;
  border: none;
  padding: 15px 35px;
  font-weight: bold;
  border-radius: 100px;
  cursor: pointer;
  font-size: 1.2rem;
}

.botoes button:hover {
  background-color: #0e98c2;
  transition: 0.3s;
}

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 768px) {
  .quadrado {
    width: 95%;
    padding: 15px;
    min-height: auto;
  }

  .detalhes {
    align-items: flex-start;
    display: flex;
    align-items: center;
    margin: 20px 20px 20px 20px;
  }

  .detalhes img {
    height: 50px;
    width: 55px;
    margin: 0 8px 2px 0;
  }

  .detalhes h1 {
    font-size: 1.2rem;
    padding: 8px 20px;
    margin-left: 15px;
  }

  .listas {
    flex-direction: column;
    margin-top: 3rem;
    font-size: 1rem;
  }

  .listas ul {
    margin: 0 0 2rem 0;
  }

  .botoes {
    flex-direction: column;
    gap: 0.8rem;
  }

  .botoes button {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
  }
}
</style>
