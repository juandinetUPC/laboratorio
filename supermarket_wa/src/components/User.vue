<template>
    <div id="User">
        <!-- <h2>Hola, <span>{{username}}</span>. ¡Bienvenido!</h2> -->
        <form>
        <label for="user_name">Nombre de usuario :</label>
        <input type="text" v-model="user_name"> <br>
        <label for="user_password">Contraseña :</label>
        <input type="password" v-model="user_email"><br>
        <!-- <label for="user_email">Email :</label>
        <input type="email" v-model="user_email"><br>
        <label for="user_real_name">Nombre Completo :</label>
        <input type="text" v-model="user_real_name"><br> -->
        
        <button v-on:click="createProduct">Login</button>

    </form>  
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "User",
        data:function(){
            return {
                user_id:"",
                user_name: "",
                user_password:"",
                user_email:"",
                user_real_name:""
            }
        },
        created: function() {
           // this.username = this.$route.params.username
           this.username = this.user_name
                   
        },
        methods: {

            getUser: function() {

                this.username = this.user_name
                let self = this

                axios.get("http://localhost:4001/users/" + this.user_id)
                    .then((result) => {
                        self.category_id = result.data.id,
                        self.name = result.data.name,
                        self.description = result.data.description
                    })
                    .catch((error) => {
                        alert("No existe esa categoría");
                    });
            }
        }
    }
</script>

<style>
    #User{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    #User h2{
        font-size: 50px;
        color: #283747;
    }
    #User span{
        color: crimson;
        font-weight: bold;
    }
</style>