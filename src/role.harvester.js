var utilsBaseWork = require('utils.baseWork');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        utilsBaseWork.checkAndChangeStatus(creep);
	    if(creep.memory.harvesting) {
	        utilsBaseWork.harvest(creep);
        }
        else {
            
            creep.memory.tergetSource = null;
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                creep.say('⛽   ')  ;
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffaa'}});
                }
            } else {
                utilsBaseWork.upgrade(creep);
            }
        }
	}
};

module.exports = roleHarvester;