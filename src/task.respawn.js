var _constants = require('_constants');

var taskRespawn = {

    checkAndSpawn : function(){
        //harvester1
        if(Game.spawns['Spawn1'].spawning){
            console.log('sceep - spawning');
            return;
        }
        
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        let ordered = false;
        let creepsCount = 0;
        for(var name in Game.creeps) {
            creepsCount++;
            var creep = Game.creeps[name];
            if(!ordered && creep.memory.toRenew){
                let result = Game.spawns['Spawn1'].renewCreep(creep);
                if(result == OK){
                    ordered = true;
                }
            }
        }
        
        if(!creepsCount){
            let role = _constants.creeps.oops.role;
            let body = _constants.creeps.oops.body;
            let newName = role + Game.time;
            let result = Game.spawns['Spawn1'].spawnCreep(body, newName,{ memory: { role: role, version : 0 }});
            ordered = true;
            console.log(result, 'OOOPS', body);
        }
        
        Object.keys(_constants.creeps.limits).forEach( role =>{
            var currentCount =  _.filter(Game.creeps, (creep) => creep.memory.role == role);
            console.log('Creeps role - ' + role + ' count - ' + currentCount);
            console.log(currentCount.length, _constants.creeps.limits[role],ordered);
            if(currentCount.length < _constants.creeps.limits[role] && !ordered) {
                let newName = role + Game.time;
                console.log('Spawning new '+role+': ' + newName);
                let result = Game.spawns['Spawn1'].spawnCreep(_constants.creeps.build.body, newName, 
                    {
                        memory: {
                            role: role,
                            version: _constants.creeps.build.version
                        },
                        energyStructures:[
                            Game.getObjectById('691ab2f2d1ec71895cd4245b'),
                            Game.getObjectById('691ad175c464b9c446ce15ca'),
                            Game.getObjectById('691b47b3162b12045887fd02'),
                            Game.getObjectById('691a9667ea5feb37be24c1bc'), 
                            Game.spawns['Spawn1'] 
                        ]
                    });
                if(result != OK){
                    console.log(result, _constants.creeps.build.body);
                    //result = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', version: 0}});
                }
                if(result == OK){
                    ordered = true;
                }
            }
        });
    

 
        
    },
    
    animation: function(){
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = taskRespawn;