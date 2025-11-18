
let scaner = {
    scanEnergyNeeding:function(room){        
        let energyNeeding = room
            .find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                }
            })
            .map(structure => { return { structure : structure, freeCapacity : structure.store.getFreeCapacity(RESOURCE_ENERGY) } })
            .filter(e => e.freeCapacity > 0)
            .sort((a,b) => b.freeCapacity - a.freeCapacity);


        console.log('=============== scanEnergyNeeding ===============')
        energyNeeding.map(e => console.log(' freeCapacity:', e.freeCapacity, ' struct:', e.structure));
        return energyNeeding;
    },
    
    scanRepear:function(room){
        let repearNeeding = room.find(FIND_STRUCTURES)
            .map(structure => {return{
                structure:structure,
                ticksToDecay:structure.ticksToDecay,
                hits:structure.hits,
                hitsMax:structure.hitsMax,
                order: 100 * (structure.hits / structure.hitsMax) //structure.ticksToDecay
            }})
            //.filter(e => e.ticksToDecay < 300 && e.ticksToDecay > 20)
            .filter(e => e.hits < e.hitsMax && e.hits > 1 && e.order < 30)
            .sort((a,b) => a.order - b.order);

        console.log('=============== scanRepear ===============')
        repearNeeding.map(e => console.log(e.ticksToDecay, e.order,e.hits, e.hitsMax, e.structure));
        
        return repearNeeding;
    },

    scanBuilding:function(room){
        let buildNeeding = room.find(FIND_CONSTRUCTION_SITES)
            .map(structure => {return{
                structure:structure,
                progress:structure.progress,
                progressTotal:structure.progressTotal,
                less: (structure.progressTotal - structure.progress)
            }})
            .sort((a,b) => a.less - b.less);

        console.log('=============== scanBuilding ===============')
        buildNeeding.map(e => console.log(e.less, "=", e.progressTotal, "-", e.progress, e.structure));
        
        return buildNeeding;
    }
}
 
 
let dispatcherAnaliztor = {
    scaner: scaner
}

module.exports = dispatcherAnaliztor;