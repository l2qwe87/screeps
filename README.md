# Screeps AI / Скрипты для Screeps

## Описание проекта / Project Description

Это проект искусственного интеллекта для игры [Screeps](https://screeps.com/) - MMO-игры, где игроки пишут JavaScript код для управления своими крипами (юнитами) в постоянном мире.

This is an AI project for the game [Screeps](https://screeps.com/) - a programming MMO where players write JavaScript code to control their creeps (units) in a persistent world.

## Архитектура / Architecture

### Основные компоненты / Core Components

- **`main.js`** - Главный файл, запускающий логику игры / Main file that runs the game logic
- **`dispatcher.analize.js`** - Анализатор состояния комнаты и диспетчер задач / Room state analyzer and task dispatcher
- **`role.*.js`** - Модули для различных ролей крипов / Modules for different creep roles
- **`task.*.js`** - Модули для выполнения задач / Task execution modules

### Роли крипов / Creep Roles

- **`harvester.js`** - Сборщики ресурсов / Resource harvesters
- **`builder.js`** - Строители / Builders  
- **`upgrader.js`** - Улучшатели контроллера комнаты / Room controller upgraders

### Система приоритизации / Priority System

Проект использует интеллектуальную систему приоритизации задач:

The project uses an intelligent task prioritization system:

1. **Энергия / Energy**: Структуры сортируются по свободной емкости (больше = выше приоритет)
   - Structures sorted by free capacity (more = higher priority)

2. **Ремонт / Repair**: Структуры помечаются для ремонта при здоровье < 30% и снимаются с ремонта при > 90%
   - Structures marked for repair at health < 30% and removed at > 90%

3. **Строительство / Building**: Строительные площадки сортируются по оставшейся работе (меньше = выше приоритет)
   - Construction sites sorted by remaining work (less = higher priority)

## Особенности реализации / Implementation Features

### Интеллектуальный ремонт / Intelligent Repair

Система использует постоянное отслеживание в памяти `Memory.structures` для предотвращения избыточных переключений задач ремонта:

The system uses persistent tracking in `Memory.structures` to prevent redundant repair task switching:

```javascript
// Структура добавляется в список ремонта при здоровье < 30%
// Structure added to repair list at health < 30%
if(e.order < 30){
    Memory.structures[e.structure.id].needRepear = true;
}

// Структура удаляется из списка ремонта при здоровье > 90%
// Structure removed from repair list at health > 90%
if(e.order > 90){
    Memory.structures[e.structure.id].needRepear = false;
}
```

### Оптимизация производительности / Performance Optimization

- Использование кэширования в памяти для уменьшения вычислений / Memory caching to reduce computations
- Сортировка задач по приоритету для эффективного распределения крипов / Task prioritization for efficient creep allocation
- Минимизация избыточных операций ремонта / Minimization of redundant repair operations

## Установка и использование / Installation and Usage

1. Склонируйте репозиторий / Clone the repository:
```bash
git clone https://github.com/l2qwe87/screeps.git
cd screeps
```

2. Загрузите код в игру Screeps через клиент или CLI / Upload code to Screeps game via client or CLI

3. Наблюдайте за работой вашего AI в игре / Watch your AI work in the game

## Структура файлов / File Structure

```
src/
├── _constants.js          # Константы игры / Game constants
├── dispatcher.analize.js   # Анализатор и диспетчер / Analyzer and dispatcher
├── main.js                 # Главный файл / Main file
├── role.builder.js         # Роль строителя / Builder role
├── role.harvester.js       # Роль сборщика / Harvester role
├── role.upgrader.js        # Роль улучшателя / Upgrader role
└── task.respawn.js         # Задача респауна / Respawn task
```

## Требования / Requirements

- Аккаунт Screeps / Screeps account
- Базовые знания JavaScript / Basic JavaScript knowledge

## Лицензия / License

[MIT License](LICENSE)

## Вклад / Contributing

Pull requests приветствуются! Пожалуйста, убедитесь, что ваш код соответствует существующему стилю.

Pull requests are welcome! Please ensure your code follows the existing style.

## Контакты / Contact

- GitHub: [@l2qwe87](https://github.com/l2qwe87)
- Screeps: l2qwe87

---

**Примечание / Note**: Этот проект постоянно развивается. Следите за обновлениями!

This project is continuously evolving. Stay tuned for updates!