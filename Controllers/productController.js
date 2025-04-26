const Product = require('../Models/Product')

//Control for creating new product in Database
exports.CreateProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//control for getting all Product in the database
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Control to get a particular(single) product from Database
exports.getOneProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//Control to update a product in the Database
exports.UpdateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message:"Product to update not found"});
        }
        const UpdatedProduct = await Product.findById(id);
        res.status(200).json(UpdatedProduct);

    } catch(error) {
        res.status(500).json({message:error.message});
    }
}

//control to delete a product in the database
exports.DeleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }
    } catch (error){
        res.status(500).json({message:error.message});
    }
}
