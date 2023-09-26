import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map1v, map2v, map3r, map4v, map5v, map8v, map6r, map7r, map9v } from "./MissionObjectPlacer"

const mission_m3 = {
  id: "m3",
  star: 2,
  playerSpawnPosition: { x: 20, y: 800 },
  blocks: ["block_1", "block_2", "block_3", "block_4", "block_5", "block_6", "block_7", "block_8", "block_9"],
  things: [],
  exits: [],
  zombies: [],
  block_1: {
    tile: "2v",
    rotate: "0deg",
    spawnPoints: [],
    ...map2v()
  },
  block_2: {
    tile: "8v",
    rotate: "180deg",
    spawnPoints: [],
    ...map8v(180)
  },
  block_3: {
    tile: "9v",
    rotate: "270deg",
    spawnPoints: [],
    ...map9v(90)
  },
  block_4: {
    tile: "7r",
    rotate: "180deg",
    spawnPoints: [],
    ...map7r(180),
  doors: map7r(180).doors
    .filter((door, i) => i !== 1),

  epicWeapons: [...map7r(180).epicWeapons, {
    id: randomIdOnlyNumber(),
    visible: true,
    rotate: `180deg`,
    position: { left: "490px", top: "580px" }
  }]
  },
  block_5: {
    tile: "3r",
    rotate: "90deg",
    spawnPoints: [],
    ...map3r(270),
  },
  block_6: {
    tile: "6r",
    rotate: "180deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "270deg",
        position: { left: "-25px", top: "575px" }
      },
    ],
    ...map6r(180),
  },
  block_7: {
    tile: "1v",
    rotate: "90deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "180deg",
        position: { left: "-50px", top: "548px" }
      },
    ],
    ...map1v(270),
  },
  block_8: {
    tile: "5v",
    rotate: "180deg",
    spawnPoints: [],
    ...map5v(180)
  },
  block_9: {
    tile: "4v",
    rotate: "270deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "180deg",
        position: { left: "550px", top: "548px" }
      },
    ],
    ...map4v(90)
  },
}

export default mission_m3