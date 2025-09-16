<script setup>
import { ref } from 'vue'

const bandeiras = [
  { valor: 'caixa', img: '/caixa-removebg-preview 1.png' },
  { valor: 'elo', img: '/Elo-removebg-preview 1.png' },
  { valor: 'visa', img: '/Visa-removebg-preview 1.png' },
  { valor: 'mastercard', img: '/Mastercard-removebg-preview 1.png' },
]

const bandeiraSelecionada = ref('')
</script>

<template>
  <main>
    <div class="maior">
      <div class="esquerda">
        <div class="cartoes">
          <div
            v-for="(bandeira, i) in bandeiras"
            :key="i"
            class="cartao-item"
            :class="bandeiraSelecionada == bandeira.valor ? 'cartao-selecionado' : ''"
            @click="bandeiraSelecionada = bandeira.valor"
          >
            <img :src="bandeira.img" :alt="bandeira.valor" />
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="dadosCartao">
            <ul class="lista">
              <li>
                <label for="numero">Número do cartão:</label>
                <input type="tel" id="numero" placeholder="0000 0000 0000 0000" maxlength="16" />
              </li>
              <li>
                <label for="nome">Titular do cartão:</label>
                <input type="text" id="nome" placeholder="Informe seu nome" />
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
                <input type="tel" id="cvc" placeholder="000" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="direita">
        <h3>Subtotal</h3>
        <hr />
        <div class="subtotal">
          <p>2 itens</p>
          <p>R$ 479,89</p>
          <!-- provisório -->
        </div>
        <hr />
        <h4>Tipo de pagamento</h4>

        <ul class="tipo-pagamento">
          <li>
            <input type="radio" name="tipo-pagamento" id="valor1" value="credito" />
            <label for="valor1">
              <img src="/Vector.png" alt="Cartão de Crédito" />
              Cartão de Crédito
            </label>
          </li>
          <li>
            <input type="radio" name="tipo-pagamento" id="valor2" value="pix" />
            <label for="valor2">
              <img src="/pix-removebg-preview 1.png" alt="Pix" />
              Pix
            </label>
          </li>
          <li>
            <input type="radio" name="tipo-pagamento" id="valor3" value="debito" />
            <label for="valor3">
              <img src="/Vector(1).png" alt="Cartão de Débito" />
              Cartão de Débito
            </label>
          </li>
        </ul>

        <button class="finalizar">Finalizar compra</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
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

  background: #c7c3c3;
  width: 180px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  padding: 15px 30px;
  cursor: pointer;
}

.cartao-selecionado {
  transform: scale(1.1);
  border: 1.8px solid #04394a;
}

.cartao-item:hover {
  transform: scale(1.1);
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
  color: #04394a;
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

.maior {
  display: flex;
  gap: 2rem;
}

.direita {
  background-color: #dbdcdc;
  padding: 7%;
  margin: 0;
}

.direita h3 {
  color: #04394a;
  margin: 0 10vw 1vw 0;
  font-size: 1.8rem;
}

.direita hr {
  color: #04394a;
  margin: 1.4vw 0 1.4vw 0;
}

.direita h4 {
  font-size: 1.5rem;
  color: #04394a;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #04394a;
}

.esquerda {
  margin: 10vw 0 10vw 0;
}
.tipo-pagamento {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}

.tipo-pagamento li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.tipo-pagamento input[type='radio'] {
  transform: scale(1.2);
  cursor: pointer;
}

.tipo-pagamento label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  color: #04394a;
  font-weight: 500;
}

.tipo-pagamento img {
  background: white;
  padding: 4px;
  width: 35px;
  height: 35px;
  object-fit: contain;
}

.finalizar {
  background-color: #04394a;
  color: white;
  padding: 10px 45px;
  flex: center;
  font-size: 1.1rem;
  border: none;
  margin: 2rem auto 0 auto;
  margin-top: 2rem;
  cursor: pointer;
  display: block;
}
</style>
