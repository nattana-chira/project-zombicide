import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map1r, map3v, map5v, map6v, map7r, map8r } from "./MissionObjectPlacer"

const mission_m20 = {
  id: "m20",
  star: 3,
  playerSpawnPosition: { x: 20, y: 400 },
  exits: [],
  blocks: ["block_1", "block_2", "block_4", "block_5", "block_7", "block_8"],
  things: [],
  zombies: [],
  block_1: {
    tile: "3v",
    rotate: "90deg",
    spawnPoints: [],
    ...map3v(270),

    doors: map3v(270).doors
    .map((door, i) => {
      if (i === 1) {
        door.rotate = "270deg"
        door.position.left = "325px"
      }
      return door
    }),
  },
  block_2: {
    tile: "1r",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "0deg",
        position: { left: "-50px", top: "0px" }
      },
    ],
    ...map1r(),
  },
  block_4: {
    tile: "8r",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "-25px" }
      },
    ],
    ...map8r(),
  },
  block_5: {
    tile: "7r",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "575px" }
      },
    ],
    ...map7r(180),
  },
  block_7: {
    tile: "6v",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        color: "green",
        visible: true,
        rotate: "90deg",
        position: { left: "525px", top: "575px" }
      },
    ],
    ...map6v(180),
  },
  block_8: {
    tile: "5v",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        color: "green",
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "575px" }
      },
    ],
    ...map5v(180),
  }
}

export default mission_m20