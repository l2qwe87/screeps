var utilsBaseWork = require('utils.baseWork');

let dispatcherAnaliztor = require('./dispatcher.analize')

var roleBuilder = {

    run: function(creep) {

        utilsBaseWork.checkAndChangeStatus(creep);
        if(creep.memory.harvesting) {
            utilsBaseWork.harvest(creep);
        } else {

            let toRepear = dispatcherAnaliztor.scaner.scanRepear(creep.room);

            var targets = toRepear.map(e => e.structure);
             if(targets.length) {
                 creep.say('🚧 R');
                 let result = creep.repair(targets[0]);
                 console.log(result);
                 if(result == ERR_NOT_IN_RANGE) {
                     result = creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                     console.log(result);
                 }
             } else {
                 this.run_old(creep);
             }
        }
     },

    /** @param {Creep} creep **/
    run_old: function(creep) {

	   utilsBaseWork.checkAndChangeStatus(creep);
	   if(creep.memory.harvesting) {
	       utilsBaseWork.harvest(creep);
	   } else {
	       var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                creep.say('🚧');
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                utilsBaseWork.upgrade(creep);
            }
	   }
	}
};

module.exports = roleBuilder;