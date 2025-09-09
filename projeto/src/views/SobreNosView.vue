<script setup>
// import { ref } from 'vue'
</script>
<template>
  <main>
      <h1>Sobre Nós</h1>
     <div class="maior">
      <div class="esquerda">
        <img src="/public/foto-grupo.png" alt="">
      </div>
      <div class="direita">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque <br> porttitor tristique tortor non dignissim.
          Vestibulum ante ipsum primis  in <br> faucibus orci luctus et ultrices posuere cubilia curae; Donec  vulputate <br>ultricies nulla ut aliquet.
          Pellentesque varius semper libero, non <br> pharetra turpis pellentesque nec. Nam sed elit a ipsum semper  mollis <br> vel at libero.
          Mauris at erat non odio tempor commodo vitae a  sapien.<br>  Quisque sollicitudin, felis ut, maximus dignissim, mauris justo pulvinar <br>  metus,
          id fringilla velit nunc  quis ipsum. Maecenas dolor lectus,.
        </p>
      </div>
     </div>
  </main>
</template>
<style scoped>
h1{
  margin: 4vw 18vw 2vw 20vw;
  text-align: center;
  padding: 5px 4px 5px 4px;
  display: inline-block;
  width: 50%;
  color: white;
}
.maior{
 display: flex;
 color: white;
 margin: 1vw 0 10vw 0;
}
.esquerda{
  margin: 0 0 0 15vw;
}
.direita{
  margin: 0 0 0 6vw;
}
.direita h2{
  font-size: 1.6rem;
}

</style>
