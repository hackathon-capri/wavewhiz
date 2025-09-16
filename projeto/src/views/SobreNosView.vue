<script setup>
// import { ref } from 'vue'
</script>
<template>
  <div class="template">
    <div class="esquerda">
  <img src="/Rectangle 439.png" alt="" />
    </div>
    <div class="direita">
      <h1>Sobre Nós</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor tristique
        tortor non dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia curae; Donec vulputate ultricies nulla ut aliquet. Pellentesque varius
        semper libero, non pharetra turpis pellentesque nec. Nam sed elit a ipsum semper mollis vel
        at libero. Mauris at erat non odio tempor commodo vitae a sapien. Quisque sollicitudin,
        felis ut, maximus dignissim, mauris justo pulvinar metus, id fringilla velit nunc quis
        ipsum. Maecenas dolor lectus,.
      </p>
    </div>
  </div>
</template>
<style scoped>
div.template {
  display: flex;
  margin: 10vw 10vw 10vw 10vw;
}

div.esquerda {
  margin: 0 5vw 0 0;
}
div.esquerda img {
  width: 35vw;
  height: 50vh;
}
div.direita h1 {
  color: white;
  font-size: 3rem;
  padding-bottom: 12px;
  margin-top: 2vw;
}
div.direita hr {
  border: 2px solid white;
  width: 13vw;
  margin-bottom: 20px;
}
div.direita p {
  color: white;
  margin: 3vw 0 0 0;
  width: 110%;
  font-size: 20px;
  font-weight: 600;
}

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 768px) {
  div.template {
    flex-direction: column;
    margin: 5vw;
  }

  div.esquerda {
    margin: 0 0 3vw 0;
    text-align: center;
  }

  div.esquerda img {
    width: 80vw;
    height: 25vh;
    margin-top: 5vw;
  }

  div.direita h1 {
    font-size: 2rem;
    text-align: center;
  }

  div.direita hr {
    width: 50%;
    margin: 10px auto 20px auto;
  }

  div.direita p {
    width: 100%;
    font-size: 16px;
    text-align: justify;
    margin: 0;
  }
}

</style>
