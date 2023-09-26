import { randomIdOnlyNumber } from "../Utils"
import { map1v, map7r, map3r, map5r, map9r, map6r, map8v, map2v, map4v } from "./MissionObjectPlacer"

const mission_m1 = {
  id: "m1",
  star: 2,
  playerSpawnPosition: { x: 840, y: 790 },
  blocks: ["block_1", "block_2", "block_3", "block_4", "block_5", "block_6", "block_7", "block_8", "block_9"],
  things: [],
  zombies: [],
  exits: [
    {
      rotate: "0deg",
      position: { left: "700px", top: "150px" }
    }
  ],
  block_1: {
    tile: "1v",
    rotate: "270deg",
    spawnPoints: [],
    ...map1v(90)
  },
  block_2: {
    tile: "7r",
    rotate: "180deg",
    spawnPoints: [],
    ...map7r(180),
    doors: map7r(180).doors
      .filter((door, i) => i !== 1)
  },
  block_3: {
    tile: "3r",
    rotate: "270deg",
    spawnPoints: [],
    ...map3r(90)
  },
  block_4: {
    tile: "5r",
    rotate: "0deg",
    spawnPoints: [],
    ...map5r()
  },
  block_5: {
    tile: "9r",
    rotate: "90deg",
    spawnPoints: [],
    ...map9r(270)
  },
  block_6: {
    tile: "6r",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "520px", top: "-25px" }
      },
    ],
    ...map6r()
  },
  block_7: {
    tile: "8v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "-25px" }
      },
    ],
    ...map8v()
  },
  block_8: {
    tile: "2v",
    rotate: "180deg",
    spawnPoints: [],
    ...map2v(180)
  },
  block_9: {
    tile: "4v",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "0deg",
        position: { left: "550px", top: "0px" }
      },
    ],
    ...map4v(180)
  },
}

export default mission_m1