import { randomIdOnlyNumber } from "./Utils"

export const buildZombie = (name, { position = { x: 0, y: 0 } } ) => {
  switch(name) {
    case "walker": return buildWalker({ position })
    case "runner": return buildRunner({ position })
    case "brute": return buildBrute({ position })
    case "dogz": return buildDogZ({ position })
    case "crowz": return buildCrowz({ position })
    case "abominacop": return buildAbominacop({ position })

    case "toxic_walker": return buildToxicWalker({ position })
    case "toxic_runner": return buildToxicRunner({ position })
    case "toxic_brute": return buildToxicBrute({ position })

    case "berserker_walker": return buildBerserkerWalker({ position })
    case "berserker_runner": return buildBerserkerRunner({ position })
    case "berserker_brute": return buildBerserkerBrute({ position })
    default: return null
  }
}

export const buildWalker = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "walker",
    hp: 1,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildToxicWalker = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "toxic_walker",
    type: "walker",
    hp: 1,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildBerserkerWalker = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "berserker_walker",
    type: "walker",
    hp: 1,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildRunner = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "runner",
    hp: 1,
    maxAction: 2,
    action: 2,
    exp: 1,
    visible: true,
    position
  }
}

export const buildToxicRunner = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "toxic_runner",
    type: "runner",
    hp: 1,
    maxAction: 2,
    action: 2,
    exp: 1,
    visible: true,
    position
  }
}

export const buildBerserkerRunner = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "berserker_runner",
    type: "runner",
    hp: 1,
    maxAction: 2,
    action: 2,
    exp: 1,
    visible: true,
    position
  }
}


export const buildBrute = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "brute",
    hp: 2,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildToxicBrute = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "toxic_brute",
    type: "brute",
    hp: 2,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildBerserkerBrute = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "berserker_brute",
    type: "brute",
    hp: 2,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildDogZ = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "dogz",
    hp: 1,
    maxAction: 3,
    action: 3,
    exp: 1,
    visible: true,
    position
  }
}

export const buildCrowz = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "crowz",
    hp: 1,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildAbominacop = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "abominacop",
    type: "abomination",
    hp: 3,
    maxAction: 1,
    action: 1,
    exp: 5,
    visible: true,
    position
  }
}