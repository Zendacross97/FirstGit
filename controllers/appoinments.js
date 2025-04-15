const Appoinments = require("../models/appoinment");

exports.addAppoinment = async (req, res) => {
    try {
        const { name, email, number } = req.body;
        if (!name || !email || !number) {
            return res.status(400).json({ error: `Please fill the ${!name ? 'name' : !email ? 'email' : 'number'} field` });
        }
        const appoinments = await Appoinments.create({
            name: name,
            email: email,
            number: number
        });
        res.status(201).json({ appoinmentDetails: appoinments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppoinment = async (req,res)=>{ 
    try{
        const appoinments = await Appoinments.findAll();
        if (!appoinments || appoinments.length===0) {
            res.status(404).json({message: 'No appoinment info found'});
        }
        res.status(200).json({appoinmentDetails: appoinments});
    } catch (error) {
        res.status(500).json({error:err.message});
    }
};

exports.deleteAppoinment = async (req, res) => {
    try {
        const {id} = req.params;
        const appoinment = await Appoinments.destroy( {where: { id: id } } );
        if (!appoinment) {
            res.status(404).json({ message: 'appoinment not found'});
        }
        res.status(200).json({message: 'Appoinment deleted'});
    } catch (error) {
        res.status(500).json({error:err.message});
    }
};