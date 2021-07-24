<template>
    <div id="Categories">
        <h2>Usuario autenticado: <span>{{username}}</span></h2>
        <input type="number" v-model="category_in">
        <button v-on:click="getCategory">Obtener categoría</button>
        <h2>La categoría con id = <span>{{category_id}}</span>, tiene el nombre <span>{{name}}</span> y su descripción es «<span>{{description}}</span>».</h2>
    </div>
</template>

<script>

    import axios from 'axios';

    export default {

        name: 'Categories',

        data: function (){
            return {
                category_id: "",
                name: "",
                description: "",
                category_in:""
            }
        },

        created: function() {

            this.username = this.$route.params.username
            let self = this

        },

        methods: {

            getCategory: function() {

                this.username = this.$route.params.username
                let self = this

                axios.get("http://localhost:4000/categories/" + this.category_in)
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
    #Categories{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #Categories h2{
        font-size: 25 px;
        color: #283747;
    }
    #Categories span{
        color: crimson;
        font-weight: bold;
    }
</style>