var express = require('express');
var router = express.Router();
var getByToken = require('../features/urlshortener/getByToken');
var generateToken = require('../features/urlshortener/generateToken');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Attempts to fetch a target url based on the supplied token.
 */
router.get('/:token', getByToken);


/**
 * Generates (and persists) a token based on the target url.
 */
router.post('/', generateToken);


module.exports = router;
