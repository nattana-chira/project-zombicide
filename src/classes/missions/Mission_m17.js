import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map2r, map1r, map3r, map4v, map5v, map6r, map7v, map8r, map9r } from "./MissionObjectPlacer"

const mission_17 = {
  id: "m17",
  star: 3,
  playerSpawnPosition: { x: 580, y: 1400 },
  exits: [],
  blocks: ["block_1", "block_2", "block_3", "block_4", "block_5", "block_6", "block_7", "block_8", "block_9"],
  things: [
 
  ],
  zombies: [],
  block_1: {
    tile: "7v",
    rotate: "270deg",
    spawnPoints: [],
    ...map7v(90)
  },
  block_2: {
    tile: "5v",
    rotate: "0deg",
    spawnPoints: [],
    ...map5v()
  },
  block_3: {
    tile: "4v",
    rotate: "0deg",
    spawnPoints: [],
    ...map4v()
  },
  block_4: {
    tile: "2r",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "575px" }
      },
    ],
    ...map2r(180)
  },
  block_5: {
    tile: "9r",
    rotate: "0deg",
    spawnPoints: [],
    ...map9r()
  },
  block_6: {
    tile: "6r",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "-25px" }
      },
    ],
    ...map6r()
  },
  block_7: {
    tile: "8r",
    rotate: "90deg",
    spawnPoints: [],
    objectives: [],
    epicWeapons: [],
    ...map8r(270)
  },
  block_8: {
    tile: "1r",
    rotate: "90deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "575px" }
      }
    ],
    ...map1r(270)
  },
  block_9: {
    tile: "3r",
    rotate: "90deg",
    spawnPoints: [],
    ...map3r(270)
  },
}

export default mission_17