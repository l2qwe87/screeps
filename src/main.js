var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var taskRespawn = require('task.respawn');

let dispatcherAnaliztor = require('./dispatcher.analize')

module.exports.loop = function () {
    taskRespawn.checkAndSpawn();

    Object.keys(Game.rooms).forEach( roomKey => {
        let room = Game.rooms[roomKey];
        dispatcherAnaliztor.scaner.scanEnergyNeeding(room);
        dispatcherAnaliztor.scaner.scanBuilding(room);
    })

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}