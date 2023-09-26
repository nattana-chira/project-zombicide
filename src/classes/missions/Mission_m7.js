import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map3v, map4v, map6v, map8v } from "./MissionObjectPlacer"

const mission_m7 = {
  id: "m7",
  star: 3,
  playerSpawnPosition: { x: 550, y: 460 },
  exits: [
    {
      rotate: "270deg",
      position: { left: "125px", top: "725px" }
    },
    {
      rotate: "90deg",
      position: { left: "1275px", top: "725px" }
    }
  ],
  blocks: ["block_1", "block_2", "block_4", "block_5"],
  things: [],
  zombies: [],
  block_1: {
    tile: "6v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "0deg",
        position: { left: "100px", top: "0px" }
      },
    ],
    ...map6v()
  },
  block_2: {
    tile: "4v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "0deg",
        position: { left: "260px", top: "0px" }
      },
    ],
    ...map4v()
  },

  block_4: {
    tile: "3v",
    rotate: "270deg",
    spawnPoints: [],
    ...map3v(90)
  },
  block_5: {
    tile: "8v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "180deg",
        position: { left: "400px", top: "550px" }
      },
    ],
    ...map8v()
  },
}

export default mission_m7