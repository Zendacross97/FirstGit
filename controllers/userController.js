const addUser = async (req, res) => {  
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error ('Login credentials are incomplete');
        }
        const userDetaiils = { name, email, password };
        res.status(201).json(userDetaiils);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    addUser
};