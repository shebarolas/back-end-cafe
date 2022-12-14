const {request, response} = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const path = require('path');
const fs = require('fs');
const {subirArchivos} = require('../helpers/subir-archivos');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const upload = async(req = request, res = response) => {

    const pathCompleto = await subirArchivos(req.files, 'img');

    res.status(200).json({
        mesage: 'Upload complete',
        pathCompleto
    })

}

const actualizarImage = async (req, res) => {
    const {id, coleccion} = req.params;

    let modelo;

    console.log(id);
    console.log(coleccion);

    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);

            
            if (!modelo) {
                return res.status(400).json({
                    message: 'No existe usuario con ese id'
                })
            }else{
                let pathImagen;
                if(modelo.img){
                     pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
                    if(fs.existsSync(pathImagen)){
                        fs.unlinkSync(pathImagen);
                    }
                }

                const pathCompleto = await subirArchivos(req.files, coleccion);
                modelo.img = pathCompleto;
                await modelo.save();
                res.status(200).json({
                    modelo
                });
                
            }
        break;

        case 'producto':
        modelo = await Producto.findById(id);

        if (!modelo) {
            res.status(404).json({
                message: 'No existe producto con ese id'
            })
        }else{
            let pathImagen;
            if(modelo.img){
                pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
                if(fs.existsSync(pathImagen)){
                    fs.unlinkSync(pathImagen);
                }
            }
            const pathCompleto = await subirArchivos(req.files,coleccion);
            modelo.img = pathCompleto;
            await modelo.save();
            res.status(200).json({
                modelo
            });
        }
        break;

        default: 
    }

   

    // const pathCompleto = await subirArchivos(req.files, 'img');
    // modelo.img = pathCompleto
    // await modelo.save();

}

const actualizarImageCloud = async (req, res) => {
    const {id, coleccion} = req.params;

    let modelo;

    console.log(id);
    console.log(coleccion);

    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);

            
            if (!modelo) {
                return res.status(400).json({
                    message: 'No existe usuario con ese id'
                })
            }else{
               
                if(modelo.image){
                    const nombreArr  = modelo.img.split('/');
                    const nombre = nombreArr[nombreArr.length - 1];
                    const [id] = nombre.split('.');
                    await cloudinary.uploader.destroy(id);
                }

                const {tempFilePath} = req.files.archivo;
                const {secret_url} = await cloudinary.uploader.upload(tempFilePath);
                modelo.image = secret_url;
                await modelo.save();
                res.status(200).json({
                    modelo
                });
                
            }
        break;

        case 'producto':
        modelo = await Producto.findById(id);

        if (!modelo) {
            res.status(404).json({
                message: 'No existe producto con ese id'
            })
        }else{
            
            if(modelo.img){
                    const nombreArr  = modelo.img.split('/');
                    const nombre = nombreArr[nombreArr.length - 1];
                    const [id] = nombre.split('.');
                    await cloudinary.uploader.destroy(id);
            }
            const {tempFilePath} = req.files.archivo;
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
         
            modelo.img = secure_url;
            await modelo.save();
            res.status(200).json({
                modelo
            });
        }
        break;

        default: 
    }

   

    // const pathCompleto = await subirArchivos(req.files, 'img');
    // modelo.img = pathCompleto
    // await modelo.save();

}

const mostrarImagen = async (req, res) => {
    const {id, coleccion} = req.params;

    let modelo;

    console.log(id);
    console.log(coleccion);

    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);

            
            if (!modelo) {
                return res.status(400).json({
                    message: 'No existe usuario con ese id'
                })
            }else{
                let pathImagen;
                if(modelo.img){
                     pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
                    if(fs.existsSync(pathImagen)){
                        fs.unlinkSync(pathImagen);
                    }

                    const pathCompleto = await subirArchivos(req.files, coleccion);
                    modelo.img = pathCompleto;
                    await modelo.save();
                    res.status(200).json({
                        modelo
                    });
                }else{
                    pathImagen = path.join(__dirname, '../assets/Costo de base de datos MySql.PNG');
                    return res.sendFile(pathImagen);
                }

                
            }
        break;

        case 'producto':
        modelo = await Producto.findById(id);

        if (!modelo) {
            res.status(404).json({
                message: 'No existe producto con ese id'
            })
        }else{
            let pathImagen;
            if(modelo.img){
                pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
                if(fs.existsSync(pathImagen)){
                    fs.unlinkSync(pathImagen);
                }
                const pathCompleto = await subirArchivos(req.files,coleccion);
                modelo.img = pathCompleto;
                await modelo.save();
    
            }else{
                
                pathImagen = path.join(__dirname, '../assets/Costo de base de datos MySql.PNG');
                return res.sendFile(pathImagen);
            }

        }
        break;

        default: 
    }
}


module.exports = {
    upload,
    actualizarImageCloud,
    mostrarImagen
}


