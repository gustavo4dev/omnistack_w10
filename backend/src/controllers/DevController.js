const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringArray = require('../utils/parseStringArray')

module.exports = {
    //função para retornar a listagem dos devs cadastrados
    async index(req,res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    //função para cadastrar um novo dev
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiresponse.data;

            const techsArray = parseStringArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }

        return res.json(dev);
    },
/*
    async update(req,res){
        
    }
    */
    async destroy(req,res){
        const {username} = req.params

        const user =  await Dev.findOne({github_username:username});

        if(!user){
            return res.json({error: "Dev not found"});
        }

        await Dev.deleteOne({
            _id: user._id
        });

        return res.json({message:`Dev ${username} deleted`});
    }

}