var utilsBaseWork = require('utils.baseWork');


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        utilsBaseWork.checkAndChangeStatus(creep);
	    if(creep.memory.harvesting) {
	        utilsBaseWork.harvest(creep);
        }
        else {
            utilsBaseWork.upgrade(creep);
        }
	}
};

module.exports = roleUpgrader;