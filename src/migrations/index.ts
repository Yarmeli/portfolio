import * as migration_20241207_033223 from './20241207_033223';
import * as migration_20241207_233245 from './20241207_233245';

export const migrations = [
  {
    up: migration_20241207_033223.up,
    down: migration_20241207_033223.down,
    name: '20241207_033223',
  },
  {
    up: migration_20241207_233245.up,
    down: migration_20241207_233245.down,
    name: '20241207_233245'
  },
];
