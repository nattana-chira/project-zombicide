import { randomIdOnlyNumber } from "./Utils"

export const buildZombie = (name, { position = { x: 0, y: 0 } } ) => {
  switch(name) {
    case "walker": return buildWalker({ position })
    case "runner": return buildRunner({ position })
    case "brute": return buildBrute({ position })
    case "dogz": return buildDogZ({ position })
    case "crowz": return buildCrowz({ position })
    case "crawler": return buildCrawler({ position })

    case "abominacop": return buildAbominacop({ position })
    case "abominawild": return buildAbominawild({ position })
    case "hobomination": return buildHobomination({ position })
    case "patient_zero": return buildPatientZero({ position })
    case "chupacabra": return buildChupacabra({ position })
    case "abominarat": return buildAbominarat({ position })

    case "toxic_walker": return buildToxicWalker({ position })
    case "toxic_runner": return buildToxicRunner({ position })
    case "toxic_brute": return buildToxicBrute({ position })

    case "berserker_walker": return buildBerserkerWalker({ position })
    case "berserker_runner": return buildBerserkerRunner({ position })
    case "berserker_brute": return buildBerserkerBrute({ position })

    case "skinner_walker": return buildSkinnerWalker({ position })
    case "skinner_runner": return buildSkinnerRunner({ position })
    case "skinner_brute": return buildSkinnerBrute({ position })
    default: return null
  }
}

export const abominations = [
  "abominacop",
  "abominawild",
  "hobomination",
  "patient_zero",
  "chupacabra",
  "abominarat"
]

export const getZombieTrans = (zombieName) => {
  const trans = masterTrans[zombieName]
  if (trans) return trans

  return { name: zombieName, desc: "" }
}

const masterTrans = {
  abominacop: { name: "Abominacop", desc: "ไม่สามารถโจมตีเป้าหมายที่อยู่โซนถัดไปจาก Abominacop ได้" },
  abominawild: { name: "Abominawild", desc: "หากฆ่า Abominawild ด้วย Molotov หรือ Flamethrower ซอมบี้ตัวอื่นในพื้นที่จะไม่ถูกฆ่าไปด้วย" },
  hobomination: { name: "Hobomination", desc: "Survivor ที่อยู่ในระยะ 1 หน่วยจาก Hobomination ไม่สามารถต่อสู้ได้" },
  patient_zero: { name: "Patient Zero", desc: "Patient Zero สามารถเคลื่อนที่ไปหา Survivor ที่อยู่ในระยะมองเห็นได้โดยไม่จำกัดระยะทาง" },
  chupacabra: { name: "Chupacabra", desc: "Chupacabra ไม่สามารถถูกสังหารในที่มืดได้ เมื่อ Chupacabra ปรากฏมีโอกาศที่ฝนจะตก" },
  abominarat: { name: "Abominarat", desc: "Abominarat จะปรากฏข้างๆพื่นที่ที่เสียงดังที่สุด Abominarat สามารถเคลื่อนที่ได้ 2 ช่อง" },
}

export const buildCrawler = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "crawler",
    type: "walker",
    hp: 1,
    maxAction: 1,
    action: 1,
    exp: 1,
    visible: true,
    position
  }
}

export const buildWalker = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "walker",
    type: "walker",
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

export const buildSkinnerWalker = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "skinner_walker",
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
    type: "runner",
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

export const buildSkinnerRunner = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "skinner_runner",
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
    type: "brute",
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

export const buildSkinnerBrute = ({ position = { x: 0, y: 0 } }) => {
  return {
    id: randomIdOnlyNumber(),
    name: "skinner_brute",
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

const buildAbomination = (name, position = { x: 0, y: 0 } ) => {
  return {
    id: randomIdOnlyNumber(),
    name: name,
    type: "abomination",
    hp: 3,
    maxAction: 1,
    action: 1,
    exp: 5,
    visible: true,
    position
  }
}

export const buildAbominacop = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("abominacop", position)
}

export const buildAbominawild = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("abominawild", position)
}

export const buildHobomination = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("hobomination", position)
}

export const buildPatientZero = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("patient_zero", position)
}

export const buildChupacabra = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("chupacabra", position)
}

export const buildAbominarat = ({ position = { x: 0, y: 0 } }) => {
  return buildAbomination("abominarat", position)
}