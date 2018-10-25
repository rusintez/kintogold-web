/**
 * Kintogold-web frontend
 */

/**
 * Module dependencies
 */

const aframe = require('aframe');
require('aframe-environment-component');
const swarm = require('./swarm');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

aframe.registerComponent('share-position', {
  tick () {
    emitter.emit('position', this.el.object3D);
  }
});

swarm.on('peer', (peer, id) => {
  console.log(peer, id);
  const scene = document.querySelector('a-scene');
  const peerEl = document.createElement('a-box');
  peerEl.setAttribute('position', '0 1.6 0');
  scene.appendChild(peerEl);

  emitter.on('position', ({ position, rotation }) => {
    console.log({ position, rotation });
    peer.send(JSON.stringify({
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z }
    }));
  });

  peer.on('data', (data) => {
    const { position, rotation } = JSON.parse(data);
    peerEl.object3D.position.set(position.x, position.y, position.z);
    peerEl.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
  });

  peer.on('close', () => {
    peerEl.parent.removeChild(peerEl);
  });
});
