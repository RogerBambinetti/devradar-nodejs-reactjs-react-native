const axios = require('axios');

const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        const devExists = await Dev.findOne({ github_username: github_username.toLowerCase() });

        if (devExists) {
            return res.json(devExists);
        } else {

            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, bio, avatar_url } = response.data;
            const techsArray = parseStringAsArray(techs.toLowerCase());
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            const dev = await Dev.create({
                name,
                github_username: github_username.toLowerCase(),
                bio,
                avatar_url,
                techs: techsArray,
                location
            });

            return res.json(dev);
        }
    },
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    }
};