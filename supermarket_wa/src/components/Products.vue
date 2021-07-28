<template>
  <div id="Products">
    <h2>
      Usuario autenticado: <span>{{ username }}</span>
    </h2>
    <input type="number" v-model="product_id" />
    <button v-on:click="getProduct">Obtener Producto</button>
    <h2>
      El producto con id = <span>{{ product_id }}</span
      >, tiene el nombre <span>{{ name }}</span> y su descripción es «<span>{{
        description
      }}</span
      >».
    </h2>
    <form v-on:submit.prevent="createProduct">
      <label for="name_in">Nombre :</label>
      <input type="text" v-model="name" /> <br />
      <label for="description_in">Description :</label>
      <input type="text" v-model="description" /><br />
      <label for="category_in">Categoria :</label>
      <input type="number" v-model="category" /><br />
      <label for="provider_in">Proveedor :</label>
      <input type="number" v-model="provider" /><br />
      <label for="units_in">Unidades :</label>
      <input type="text" v-model="unit_measurement" /><br />
      <label for="quantity_in">Cantidad :</label>
      <input type="number" v-model="quantity" /><br />
      <button type="submit">Agregar Producto</button>
    </form>
  </div>
</template>

<script>

    import axios from 'axios';

    
     
    export default {

        name: 'Products',

        data: function (){
            return {
                product_id: "",
                name: "",
                description: "",
                category:"",
                provider:"",
                unit_measurement:"",
                quantity:"",
                producto:[]
                


            }
            
        
        },

        created: function() {

            this.username = this.$route.params.username
            let self = this

        },

        methods: {

            getProduct: function() {

                this.username = this.$route.params.username
                let self = this

                // axios.get("http://localhost:4000/products/" + self.product_id)
                //     .then((result) => {
                //         self.product_id = result.data.id,
                //         self.name = result.data.name,
                //         self.description = result.data.description
                //     })
                //     .catch((error) => {
                //         alert("No existe ese product", error);
                //     });
                axios.post('http://localhost/graphql',
                {query:`{productById(id: ${self.product_id}) {
                        id
                        name
                        description
                        unit_measurement
                        quantity
                        category {
                                    name
                                }
                        provider {
                        name
                            }
                        }
                        }`  } 
                  ).then((result) => {
                        self.producto = result.data.data.productById
                        self.product_id = self.producto.id
                        self.name = self.producto.name
                        self.description = self.producto.description
                    })
                    .catch((error) => {
                        alert("No existe ese product", error);
                    });
            },

            createProduct: function() {

                this.username = this.$route.params.username
                let self = this
                // let post = {
                //     name: self.name,
                //     description: self.description,
                //     category:self.category,
                //     provider:self.provider,
                //     unit_measurement:self.unit_measurement,
                //     quantity:self.quantity
                //     };
                // console.log(post);
                // axios.post("http://localhost:4000/products/", post)
                //     .then((result) => {
                //         self.product_id = result.data.id,
                //         self.name = result.data.name,
                //         self.description = result.data.description
                //     })
                //     .catch((error) => {
                //         alert("No Se pudo generar el producto", error);
                //     });
                const body = {query:`mutation {createProduct(
                        product:{name: "${self.name}",
                                description: "${self.description}",
                                category: ${self.category},
                                provider: ${self.provider},
                                unit_measurement:"${self.unit_measurement}",
                                quantity:${self.quantity} 
                                }) {
    name
    description
  }
}`
                                                    };
                axios({url:'http://localhost/graphql', method:'post',data:body}).then((result) => {
                        self.producto = result.data.data.createProduct
                        //self.product_id = self.producto.id
                        self.name = self.producto.name
                        self.description = self.producto.description
                    })
                    .catch((error) => {
                        console.log(error)
                        alert("No se pudo agregar producto");
                    });
            },

                   }
    }
</script>

<style>
#Products {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#Products h2 {
  font-size: 25 px;
  color: #283747;
}
#Products span {
  color: rgb(20, 123, 220);
  font-weight: bold;
}
</style>