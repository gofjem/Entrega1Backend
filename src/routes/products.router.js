import { Router } from "express";
import ProductManager from "../services/ProductManager.js";


const router=Router();

const productManager = new ProductManager();

// APIs

//GET
router.get('/',async (req,res)=>{
    try {
        const limit= req.query.limit ? parseInt(req.query.limit): undefined;
        const products = await productManager.getAllProducts(limit)

        res.json(products)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid',async (req,res)=>{
    try {
        const productId = parseInt(req.query.pid)
        const product = await productManager.getProductById(productId);

        if(product){
            res.json(product)
        }else{
            res.status(404).json({error:'Producto no encontrado'});
        }

        res.json(product)

    } catch (error) {
        console.log(error)
    }
})

//POST
router.post('/',async (req,res)=>{
    try {

        const {title , description , code , price , stock , category , thumbnails} = req.body;

        if (!title || !description || !code || !price || !stock || !category || !thumbnails){
            return res.status(400).json({error: 'Todos los campos del productos son obligatorios, a execpción de Thumbnails'});
        }
        const newProduct = await productManager.addProduct({title , description , code , price , stock , category , thumbnails});

        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log(error)
    }
})

//PUT
router.put('/:pid',async (req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const updateProduct = await productManager.updateProduct(productId, req.body);

        if (updateProduct){
            res.json(updateProduct)
        }else{
            res.status(404).json({error : 'Producto no pudo ser actualizado'})
        }

    } catch (error) {
        console.log(error)
    }
})

//DELETE
router.delete('/:pid',async (req,res)=>{
    try {
        const productId = parseInt(req.params.pid)
        const deleteProduct = await productManager.deleteProduct(productId)

        if(deleteProduct){
            res.json(deleteProduct)
        }else{
            res.status(404).json({ error : 'Producto no encontrado'})
        }
        
    } catch (error) {
        console.log(error)
    }
})



export default router;


