import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"

const mission_XXX = {
  id: "XXX",
  playerSpawnPosition: { x: 20, y: 400 },
  blocks: ["block_1", "block_2", "block_3", "block_4", "block_5", "block_6", "block_7", "block_8", "block_9"],
  zombies: [
    buildWalker({ position: { x: 560, y: 200 } }),
    buildWalker({ position: { x: 560, y: 430 } }),
    buildRunner({ position: { x: 460, y: -40 } }),
    buildBrute({ position: { x: 600, y: -80 } })
  ],
  block_1: {
    tile: "1v",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_2: {
    tile: "7r",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_3: {
    tile: "3r",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_4: {
    tile: "5r",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_5: {
    tile: "9r",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_6: {
    tile: "6r",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_7: {
    tile: "8v",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_8: {
    tile: "2v",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
  block_9: {
    tile: "4v",
    rotate: "0deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    doors: []
  },
}

export default mission_XXX