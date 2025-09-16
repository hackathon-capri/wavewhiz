<script setup></script>

<template>
  <div class="introducao">
    <h1>Descubra as principais <br> lojas de <strong>ALIMENTOS</strong></h1>
  <hr/>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non rutrum mauris. Praesent
    ut sodales orci. Sed gravida enim a sem semper, ut ullamcorper purus venenatis. Integer ac
    tortor.
  </p>
  </div>
    <ul>
      <li>
        <img src="" alt="">
        <h2>Nome da Loja</h2>
      </li>
    </ul>
</template>

<style scoped>
div.introducao {
  margin-left: 15px;
}
div.introducao h1 {
  color: white;
  font-family: 'Playfair Display', serif;
  margin-top: 5vw;
}
div.introducao strong {
  color: #98E6FF;
  font-family: 'Playfair Display', serif;
}
hr {
  border: none;
  height: 1.5px;
  background-color: white;
  width: 23%;
  margin: 10px 0;
}
div.introducao p {
  color: white;
  width: 28%;
}
ul {
  display: flex;
  margin-top: 3vw;
  margin-left: 15px;
}
ul li {
  margin: 2vw 4vw 2vw 4vw;
  list-style: none;
}

ul li img {
  border: solid 5px #08607C;
  border-radius: 30px;
  width: 120px;
  height: 100px;
  padding: 30px;

}
ul li h2 {
  font-size: 1.2rem;
  color: white;
  background-color: #08607C;
  border-radius: 100px;
  width: fit-content;
  padding: 5px 10px 5px 10px;
  margin-top: 10px;
  margin-left: 9px;
}
</style>
