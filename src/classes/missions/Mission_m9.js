import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map2v, map3v, map4v, map9r } from "./MissionObjectPlacer"

const mission_m9 = {
  id: "m9",
  star: 2,
  playerSpawnPosition: { x: 20, y: 500 },
  blocks: ["block_1", "block_2", "block_4", "block_5"],
  things: [],
  zombies: [],
  exits: [],
  block_1: {
    tile: "4v",
    rotate: "0deg",
    spawnPoints: [],
    ...map4v()
  },
  block_2: {
    tile: "2v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "0deg",
        position: { left: "-50px", top: "0px" }
      },
    ],
    ...map2v()
  },
  block_4: {
    tile: "9r",
    rotate: "180deg",
    spawnPoints: [],
    ...map9r(180)
  },
  block_5: {
    tile: "3v",
    rotate: "270deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "-25px" }
      },
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "180deg",
        position: { left: "550px", top: "550px" }
      },
    ],
    ...map3v(90)
  }
}

export default mission_m9