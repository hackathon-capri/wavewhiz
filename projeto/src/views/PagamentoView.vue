<script  setup>
</script>
<template>
  <main>
    <div class="cartoes">
       <ul>
      <li>
        <img src="/caixa-removebg-preview 1.png" alt="caixa-cartao">
      </li>
      <li class="elo">
        <img src="/Elo-removebg-preview 1.png" alt="elo-cartao">
      </li>
      <li class="visa">
        <img src="/Visa-removebg-preview 1.png" alt="visa-cartao">
      </li>
      <li>
        <img src="/Mastercard-removebg-preview 1.png" alt="mastercard-cartao">
      </li>
    </ul>
    </div>
  </main>
</template>
<style scoped>
main{
  background-color: #F5F5F5;
}
.cartoes ul{
  display: flex;
  list-style: none;
}
li{
  background: #c7c3c3;
  margin: 0 1vw 0 0;
  width: 100px;
  height: 60px;
}
img{
  max-width: 80%;
  max-height: 80%;
}

</style>
