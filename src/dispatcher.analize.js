
/**
 * Screeps AI - Анализатор структур и диспетчер задач / Structure Analysis and Task Dispatcher
 * 
 * Этот модуль предоставляет интеллектуальное сканирование и приоритизацию структур,
 * требующих внимания в мире игры Screeps MMO.
 * 
 * Screeps - это программная MMO, где игроки пишут код на JavaScript для управления
 * крипами (юнитами) в постоянном мире. Этот диспетчер анализирует структуры
 * и создает приоритизированные списки задач для разных ролей крипов.
 * 
 * This module provides intelligent scanning and prioritization of structures
 * that need attention in the Screeps MMO game world.
 * 
 * Screeps is a programming MMO where players write JavaScript code to control
 * creeps (units) in a persistent world. This dispatcher analyzes structures
 * and creates prioritized task lists for different creep roles.
 */

let scaner = {
    /**
     * Сканирует комнату на предмет структур, нуждающихся в энергии / Scans room for structures that need energy
     * @param {Room} room - Объект комнаты для сканирования / The room object to scan
     * @returns {Array} Массив структур, отсортированных по свободной емкости (от большей к меньшей) / Array of structures sorted by free capacity (highest first)
     */
    scanEnergyNeeding:function(room){        
        // Находим структуры, которые могут хранить энергию и нуждаются в пополнении / Find structures that can store energy and need refilling
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
    
    /**
     * Сканирует комнату на предмет структур, требующих ремонта / Scans room for structures that need repair
     * @param {Room} room - Объект комнаты для сканирования / The room object to scan
     * @returns {Array} Массив структур, отсортированных по приоритету ремонта / Array of structures sorted by repair priority
     */
    scanRepear:function(room){
        // Находим все структуры и рассчитываем их состояние здоровья / Find all structures and calculate their health status
        let repearNeeding = room.find(FIND_STRUCTURES)
            .map(structure => {return{
                structure:structure,
                ticksToDecay:structure.ticksToDecay,
                hits:structure.hits,
                hitsMax:structure.hitsMax,
                order: 100 * (structure.hits / structure.hitsMax) //structure.ticksToDecay
            }})
            //.filter(e => e.ticksToDecay < 300 && e.ticksToDecay > 20)
            //.filter(e => e.hits < e.hitsMax && e.hits > 1 && e.order < 30)
            .filter(e => e.order > 1)
            

        // Инициализируем память для отслеживания состояния ремонта / Initialize memory for tracking repair state
        Memory.structures = Memory.structures || {};
        repearNeeding.forEach(e => {
            Memory.structures[e.structure.id] = Memory.structures[e.structure.id] || {};
            if(Memory.structures[e.structure.id].needRepear){
                // Если структура уже в списке ремонта и здоровье > 90%, убираем из списка / If structure is already in repair list and health > 90%, remove from list
                if(e.order > 90){
                    Memory.structures[e.structure.id].needRepear = false;
                }
            }else
            // Если структура не в списке ремонта и здоровье < 30%, добавляем в список / If structure is not in repair list and health < 30%, add to list
            if(e.order < 30){
                Memory.structures[e.structure.id].needRepear = true;
            }
        });

        // Фильтруем и сортируем структуры по приоритету ремонта / Filter and sort structures by repair priority
        repearNeeding = repearNeeding
            .filter(e => Memory.structures[e.structure.id].needRepear)
            .sort((a,b) => a.order - b.order);

        console.log('=============== scanRepear ===============')
        repearNeeding.map(e => console.log(e.ticksToDecay, e.order,e.hits, e.hitsMax, e.structure));
        
        return repearNeeding;
    },

    /**
     * Сканирует комнату на предмет строительных площадок / Scans room for construction sites
     * @param {Room} room - Объект комнаты для сканирования / The room object to scan
     * @returns {Array} Массив строительных площадок, отсортированных по оставшейся работе / Array of construction sites sorted by remaining work
     */
    scanBuilding:function(room){
        // Находим все строительные площадки и рассчитываем оставшуюся работу / Find all construction sites and calculate remaining work
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
 
 
/**
 * Главный экспортируемый объект диспетчера анализа / Main exported dispatcher analysis object
 * Предоставляет доступ к сканеру для анализа состояния комнаты / Provides access to scanner for room state analysis
 */
let dispatcherAnaliztor = {
    scaner: scaner
}

module.exports = dispatcherAnaliztor;