<script setup>
  const emit = defineEmits(['mostrarEmpreendedor'])
</script>

<template>
        <section>
            <div class="quadrado">
              <div class="detalhes">
                <div class="login">
                  <img src="/login-icon.png" alt="">
                  <h1>Como você quer se cadastrar?</h1>
                </div>
                <ul>
                  <li>
                    <span class="button" @click="emit('mostrarEmpreendedor')">EMPREENDEDOR</span>
                  </li>
                  <li>
                    <span class="button" @click="emit('mostrarCliente')">CLIENTE</span>
                  </li>
                </ul>
              </div>
            </div>
        </section>

</template>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
}
.formas {
  display: flex;
  gap: 20px;
}
.quadrado {
  margin: 5vw auto 5vw auto;
  width: 1300px;
  height: 600px;
  background-color: #04384aa6;
  border-radius: 20px;
}
.detalhes {
  text-align: center;
  color: white;
  padding: 5vw 0 0 0;
}
.detalhes h1 {
  padding: 10px 30px 10px 30px;
  border-radius: 20px;
  width: fit-content;
  margin: 20px auto;
  background-color: #04394A;
}

.detalhes ul {
  padding: 3vw 0 0 0;
  display: flex;
  list-style: none;
  justify-content: center;
}
.detalhes ul li {
  padding: 0 5vw 0 5vw;
}
.button {
  font-size: 1.5rem;
  background-color: transparent;
  border: 4px solid white;
  color: white;
  display: inline-block;
  border-radius: 40px;
  font-weight: bold;
  width: 20vw;
  padding: 4vw 0;
  transition: background-color 0.3s, color 0.3s;
}

.button:hover {
  background-color: white;
  color: #08607C;
  cursor: pointer;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  gap: 40px;
  background-color: #04394A;
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

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 1366px) {
  .quadrado {
    width: 85%;
    height: auto;
    padding: 5vw 2vw 5vw 2vw;
  }
  .detalhes {
    padding: 2vw;
  }
  .detalhes h1 {
    font-size: 1.6rem;
    padding: 10px 25px;
  }

  .button {
    width: 25vw;
    font-size: 1.3rem;
    padding: 3.5vw 0;
  }

  .detalhes ul li {
    padding: 0 3vw;
  }


  .socialmedia {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .quadrado {
    width: 90%;
    max-width: 600px;
    height: 400px;
    border-radius: 20px;
    margin-top: 20vw;
  }

  .detalhes img {
    width: 50px;
    height: 50px;
  }

  .detalhes h1 {
  font-size: 1.4rem;
  padding: 10px 30px;
  border-radius: 20px;
  width: fit-content;
  margin: 20px auto;
  background-color: #04394A;
}

  .detalhes ul {
    flex-direction: column;
    gap: 1.5rem;
    padding: 15px 0 0 0;
  }

  .detalhes ul li {
    padding: 0;
  }

  .button {
    width: 60vw;
    font-size: 1.2rem;
    border-radius: 20px;
  }

  .button:hover {
  background-color: white;
  color: #08607C;
  cursor: pointer;
}


  footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    padding: 20px;
  }

  .info,
  .aba-footer ul,
  .categoria-footer ul,
  .socialmedia {
    align-items: center;
    max-width: none;
  }

  .socialmedia {
    flex-direction: row;
    gap: 20px;
    font-size: 24px;
  }
}
</style>
