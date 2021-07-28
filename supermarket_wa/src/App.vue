<template>
  <div id="app">
    <div class="header">

      <h1>Supermarket</h1>
      <nav>
        <button v-on:click="init" v-if="is_auth==false">Inicio</button>
        <button v-on:click="categories" v-if="is_auth">Categorías</button>
        <button v-on:click="products" v-if="is_auth">Productos</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar Sesión</button>
      </nav>
    </div>
    <div class="main-component">
      <router-view></router-view>
    </div>
    <div class="footer">
      <h2>Arquitectura de Aplicaciones Web</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

    components: {},

    data: function(){
      return {
        is_auth: localStorage.getItem('isAuth') || false
      }
    },

    methods: {

      init: function(){
        if(this.$route.name != "user"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "user", params:{ username: username }})
          this.is_auth=false
        }
      },

      categories: function(){
        if(this.$route.name != "categories"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "categories", params:{ username: username }})
        }
      },

      products: function(){
        if(this.$route.name != "products"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "products", params:{ username: username }})
        }
      },
      logout: function(){
        localStorage.setItem('current_username', 'invitado')
      localStorage.setItem('isAuth', false)
      //this.is_auth=false
        if(this.$route.name != "user"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "user", params:{ username: username }})
        }
      },

    },

    beforeCreate: function(){
      localStorage.setItem('current_username', 'invitado')
      localStorage.setItem('isAuth', false)
      this.$router.push({name: "user", params:{ username: 'invitado'}})
    }
  }
</script>

<style>
  body{
    margin: 0 0 0 0;
  }
  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;

    background-color: #283747 ;
    color:#E5E7E9  ;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1{
    width: 20%;
    text-align: center;
  }
  .header nav {
    height: 100%;
    width: 45%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }
  .header nav button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }
  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background: #FDFEFE ;
  }
  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #283747;
    color: #E5E7E9;
  }
  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>