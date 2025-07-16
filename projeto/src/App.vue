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
            <li><a href="#">Sobre</a></li>
            <li class="icons"><span class="fa-solid fa-user"></span></li>
            <li class="icons"><span class="fa-solid fa-list"></span></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <div class="introducao">
        <p>Seja</p>
        <h1>Bem-Vindo!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non rutrum mauris.
          Praesent ut sodales orci. Sed gravida enim a sem semper, ut ullamcorper purus venenatis.
          Integer ac tortor consequat, imperdiet est vitae, semper sapien.
        </p>
      </div>
      <div class="categorias">
        <!-- quadrados -->
      </div>
    </main>
  </div>
</template>
<style scoped>
header,
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #2d7e99;
}
   ul {
    display: flex;
    margin: 0 0 0 18vw;
  }
   ul li {
    list-style: none;
    margin: 0 10px;
    font-size: 1rem;
    color: white;
  }

  li.icons {
    font-size: 1.2rem;
  }

  ul li a {
    text-decoration: none;
    color: white;
  }
   .logo h1 {
    text-align: left;
    color: white;
    font-size: 1.2rem;
  }
  .pesquisa {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 18vw 0 18vw;
  }
   .pesquisa span {
    position: absolute;
    left: 18vw;
    color: #888;
    font-size: 1rem;
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

</style>
