/**
 * Kintogold-web p2p
 */

/**
 * Module dependencies
 */

const signalhub = require('signalhub');
const webrtcswarm = require('webrtc-swarm');

/**
 * connect to signalhub
 */

const hub = signalhub('kinto-magic', ['https://dht.brrrr.app']);

/**
 * Expose
 * Connect to swarm
 */

exports = module.exports = webrtcswarm(hub);
