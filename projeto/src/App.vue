<template>
  <div class="container">
    <header>
      <nav>
        <div class="logo"><h1>WaveWhiz</h1></div>
        <div class="pesquisa">
          <span class="fa-solid fa-magnifying-glass"></span>
          <input type="" placeholder="" />
        </div>
        <div class="abas">
          <ul>
            <li class="icons"><span class="fa-solid fa-house"></span></li>
            <li class="sobre"><a href="#">Sobre</a></li>
            <li class="icons"><span class="fa-solid fa-user"></span></li>
            <li class="icons"><span class="fa-solid fa-list"></span></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <div class="introducao">
        <p class="seja">Seja</p>
        <h1>Bem-Vindo!</h1>
        <hr />
        <p class="texto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non rutrum mauris.
          Praesent ut sodales orci. Sed gravida enim a sem semper, ut ullamcorper purus venenatis.
          Integer ac tortor consequat, imperdiet est vitae, semper sapien.
        </p>
      </div>
      <div class="categorias">
        <!-- quadrados -->
      </div>
      <div class="carrossel">
        <!-- imagens -->
      </div>
    </main>
  </div>
</template>
<style scoped>
h1,
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
}
ul {
  display: flex;
  margin: 0 1vw 0 18vw;
}
ul li {
  list-style: none;
  margin: 0 10px;
  font-size: 1rem;
  color: white;
}

li.icons {
  font-size: 1.5rem;
}

ul li a {
  text-decoration: none;
  color: white;
}
ul li.sobre a {
  margin: 5px 0 0 0;
}
.logo h1 {
  text-align: left;
  color: white;
  font-size: 1.5rem;
}
.pesquisa {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 18vw 0 18vw;
}
.pesquisa span {
  position: absolute;
  left: 15vw;
  color: #888;
  font-size: 1rem;
  background: #f1f1f1;
}
input {
  width: 300px;
  height: 25px;
  border-radius: 30px;
  font-size: 1rem;
  border: 0;
  background-color: #f1f1f1;
  padding: 5px;
  outline: none;
}
div.introducao {
  margin: 13vw 0 0 5vw;
}
div.introducao h1,
p {
  color: #f1f1f1;
}
div.introducao h1,
p.seja {
  font-family: 'Playfair Display', serif;
}
div.introducao h1 {
  margin: 0 2vw 0 0;
  font-size: 4rem;
}
div.introducao p {
  margin: 0 65vw 0 0;
  font-weight: bold;
  font-size: 0.95rem;
}
div.introducao p.seja {
  font-size: 2rem;
}
div.introducao p.texto {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}
hr {
  border: none;
  height: 1.5px;
  background-color: #f1f1f1;
  width: 28.5%;
  margin: 10px 0;
}
</style>
