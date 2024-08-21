import fs from 'fs/promises'
import path from 'path'



const productsFilePath= path.resolve('data','productos.json')

export default class ProductManager {
    constructor(){
        this.productos=[]
        this.init()
    }
    async init(){
        try {
            const data = await fs.readFile(productsFilePath,'utf-8')
            this.productos=JSON.parse(data)
        } catch (error) {
            this.productos=[]
        }
    }

    // Methods

    saveToFile(){
        fs.writeFile(productsFilePath,JSON.stringify(this.productos,null,2));
    }

    getAllProducts(limit){
        if(limit){
            return this.productos.slice(0,limit)
        }else{
            this.productos
        }
    }

    getProductById(id){
        return this.productos.find(product => product.id === id)
    }

    addProduct(product){
        const newProduct = {
             id: this.productos.length ? this.productos[this.productos.length-1].id + 1 :1,
            ...product,
            status: true
        }
        this.productos.push(newProduct)
        this.saveToFile()

        return newProduct;
    }

    updateProduct(id,updatedFiles){
        const productIndex = this.productos.findIndex(product => product.id === id)
        if(productIndex === -1) return null;

        const updatedProduct = {
            ...this.productos[productIndex],
            ...updatedFiles,
            id : this.productos[productIndex].id
        }
        this.productos[productIndex]=updatedProduct
        this.saveToFile()

        return updatedProduct;
    }

    deleteProduct(id){
        const productIndex = this.productos.findIndex(product => product.id === id)
        if(productIndex === -1) return null;

        const deleteProduct = this.productos.splice(productIndex,1);
        this.saveToFile()

        return deleteProduct[0];
    }
}