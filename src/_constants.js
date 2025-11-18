_constants = {
    creeps:{
        limits:{
            harvester: 5,
            builder: 4,
            upgrader: 2
        },
        build:{
            version:8,
            body: [WORK, WORK, WORK, CARRY, MOVE, MOVE]
            
        },
        oops:{
            role: 'harvester', 
            body: [WORK, CARRY, MOVE]
        }
    }
}

module.exports = _constants;