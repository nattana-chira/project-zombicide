import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map1v, map3v } from "./MissionObjectPlacer"

const mission_m0 = {
  id: "m0",
  star: 1,
  playerSpawnPosition: { x: 20, y: 400 },
  blocks: ["block_1", "block_2"],
  things: [],
  zombies: [
    buildWalker({ position: { x: 560, y: 200 } }),
    buildWalker({ position: { x: 560, y: 430 } }),
    buildRunner({ position: { x: 460, y: -40 } }),
    buildBrute({ position: { x: 600, y: -80 } })
  ],
  exits: [
    {
      rotate: "270deg",
      position: { left: "128px", top: "650px" }
    }
  ],
  block_1: {
    tile: "1v",
    rotate: "270deg",
    spawnPoints: [],
    ...map1v(90)
  },
  block_2: {
    tile: "3v",
    rotate: "270deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "520px", top: "-25px" }
      },
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "180deg",
        position: { right: "0px", bottom: "0px" }
      }
    ],
    ...map3v(90)
  }
}

export default mission_m0