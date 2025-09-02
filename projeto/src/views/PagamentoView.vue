<script setup>
</script>

<template>
  <main>
    <div class="cartoes">
      <div class="cartao-item">
        <input type="checkbox" id="caixa">
        <label for="caixa">
          <img src="/caixa-removebg-preview 1.png" alt="caixa-cartao">
        </label>
      </div>

      <div class="cartao-item">
        <input type="checkbox" id="elo">
        <label for="elo" class="elo">
          <img src="/Elo-removebg-preview 1.png" alt="elo-cartao">
        </label>
      </div>

      <div class="cartao-item">
        <input type="checkbox" id="visa">
        <label for="visa" class="visa">
          <img src="/Visa-removebg-preview 1.png" alt="visa-cartao">
        </label>
      </div>

      <div class="cartao-item">
        <input type="checkbox" id="mastercard">
        <label for="mastercard">
          <img src="/Mastercard-removebg-preview 1.png" alt="mastercard-cartao">
        </label>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="dadosCartao">
        <ul class="lista">
          <li>
            <label for="numero">Número do cartão:</label>
            <input type="tel" id="numero" placeholder="0000 0000 0000 0000" maxlength="16">
          </li>
          <li>
            <label for="nome">Titular do cartão:</label>
            <input type="text" id="nome" placeholder="Informe seu nome">
          </li>
        </ul>

        <div class="datacvc">
          <div class="datavalidade">
            <label for="mes">Selecione o mês:</label>
            <select id="mes" name="mes">
              <option value="01">Mês</option>
              <option value="02">Janeiro</option>
              <option value="03">Fevereiro</option>
              <option value="04">Março</option>
              <option value="05">Abril</option>
              <option value="06">Maio</option>
              <option value="07">Junho</option>
              <option value="08">Julho</option>
              <option value="09">Agosto</option>
              <option value="10">Setembro</option>
              <option value="11">Outubro</option>
              <option value="12">Novembro</option>
              <option value="13">Dezembro</option>
            </select>
            <input type="tel" id="dataDevalidade" placeholder="Ano" />
          </div>

          <div class="cvc">
            <label for="cvc">CVC:</label>
            <input type="tel" id="cvc" placeholder="000">
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  background-color: #F5F5F5;
  padding: 5%;
}

.cartoes {
  margin: 0 0 3vw 8vw;
  display: flex;
  gap: 3vw;
}

.cartao-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.6rem;
}

.cartao-item input[type="checkbox"] {
  transform: scale(1.5);
  cursor: pointer;
}

.cartoes label {
  background: #c7c3c3;
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  padding: 15px 30px;
  cursor: pointer;
}

.cartoes label:hover {
  transform: scale(1.2);
}

.cartoes img {
  max-width: 200%;
  max-height: 200%;
}

.dadosCartao {
  margin: 0 0 0 8vw;
}

.dadosCartao input {
  padding: 9px 5px;
}

.dadosCartao ul li {
  list-style: none;
}

.dadosCartao label {
  margin: 0 15px 0 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #04394A;
}

.datacvc {
  display: flex;
}

.cvc {
  margin: 5px 0 0 25px;
}

.datavalidade select {
  padding: 9px 5px;
  margin: 0 0.8vw 0 0;
}
</style>
