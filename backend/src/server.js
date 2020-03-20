const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);;

const routes = require('./routes');

mongoose.connect('mongodb://rogerbambinetti:rogerbambinetti@cluster-shard-00-00-jmacf.mongodb.net:27017,cluster-shard-00-01-jmacf.mongodb.net:27017,cluster-shard-00-02-jmacf.mongodb.net:27017/devradar?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);