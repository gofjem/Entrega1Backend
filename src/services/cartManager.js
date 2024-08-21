import fs from 'fs/promises'
import path from 'path'
import ProductManager from './ProductManager.js'
import {v1,v3,v4,v5} from 'uuid'


const cartsFilePath = path.resolve('data','carrito.json')

export default class CartManager{
    constructor(){
        this.carritos=[]
        this.products=[]
        this.init
    }
    async init(){
        try {
            const data=await fs.readFile(cartsFilePath,'utf-8')
            this.carritos=JSON.parse(data)
        } catch (error) {
            this.carritos=[]
        }
    }

    // Methods

    generateId = () => crypto.randomUUID() //Generar IDs


    saveToFile(){
        fs.writeFile(cartsFilePath,JSON.stringify(this.carritos,null,2));
    }

    cartCreating(cart){
        const newCart ={
            id: this.generateIds(),
            ...cart,
            products:[]
        }
        this.carritos.push(newCart)
        this.saveToFile()

        return newCart;
    }  
    
    getCartById(id){
        return this.carritos.find(cart => cart.id === id)
    }

    addProductToCart(cartId,productId){
        
        const carrito= this.carritos.find(carrito => carrito.id === cartId);
        // if(!carrito){
        //     this.carritos.push({
        //         id:this.generateId(),
        //         product:[]
        //     })
        // }
        const existingProduct= carrito.products.find(producto => producto.products === productId)

        if (existingProduct){

        }
    }


}