import { randomIdOnlyNumber } from "../Utils"
import { buildBrute, buildRunner, buildWalker } from "../Zombie"
import { map1r, map2r, map3v, map4r, map6v, map7r } from "./MissionObjectPlacer"

const mission_m18 = {
  id: "m18",
  star: 3,
  playerSpawnPosition: { x: 550, y: -50 },
  exits: [],
  blocks: ["block_1", "block_2", "block_4", "block_5", "block_7", "block_8"],
  things: [],
  zombies: [],
  block_1: {
    tile: "4r",
    rotate: "0deg",
    spawnPoints: [],
    ...map4r()
  },
  block_2: {
    tile: "7r",
    rotate: "270deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "-25px" }
      },
    ],
    ...map7r(90),
    doors: map7r(90).doors
      .filter((door, i) => i !== 1),
    
    epicWeapons: [...map7r(90).epicWeapons, {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `90deg`,
      position: { left: "0px", top: "-25px" }
    }]
  },
  block_4: {
    tile: "1r",
    rotate: "270deg",
    spawnPoints: [],
    ...map1r(90)
  },
  block_5: {
    tile: "2r",
    rotate: "0deg",
    spawnPoints: [],
    ...map2r(),
    epicWeapons: [...map2r().epicWeapons, {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `0deg`,
      position: { left: "0px", top: "510px" }
    }]
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
        position: { left: "523px", top: "525px" }
      },
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "625px" }
      },
    ],
    ...map6v(180)
  },
  block_8: {
    tile: "3v",
    rotate: "0deg",
    spawnPoints: [
      { 
        id: randomIdOnlyNumber(),
        color: "green",
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "-75px" }
      },
      { 
        id: randomIdOnlyNumber(),
        visible: true,
        rotate: "90deg",
        position: { left: "523px", top: "25px" }
      },
    ],
    ...map3v(),
    doors: map3v().doors
    .map((door, i) => {
      if (i === 0) {
        door.rotate = "0deg"
        door.position.top = "77px"
      }
      return door
    }),
  },
}

export default mission_m18