export default class Card {
  id = null
  dice = 0
  name = null
  type = null
  subtype = null

  constructor(dice, name, type = null, subtype = null) {
    this.id = cardId()
    this.dice = dice
    this.name = name
    this.type = type
    this.subtype = subtype
  }

  showName() {
    return masterTrans[this.name]?.name || this.name
  }

  showDesc() {
    return masterTrans[this.name]?.desc || this.desc
  }

  hasSniperSkill() {
    const weapons = ["nico_special"]
    return weapons.includes(this.name)
  }

  hasReloadSkill() {
    const weapons = ["ma_shotgun", "sawed_off", "double_barrel", "mac_10", "jack_and_jill", "handcannon"]
    return weapons.includes(this.name)
  }
}

export const replaceTrans = (msg, reverse = false) => {
  Object.keys(masterTrans).forEach(function(key) {
    if (reverse)
      msg = msg.replace(key, masterTrans[key].name)
    else 
      msg = msg.replace(masterTrans[key].name, key)
  })

  return msg
}

const masterTrans = {
  fire_axe: { name: "Fire Axe", desc: null },
  crowbar: { name: "Crowbar", desc: null },
  baseball_bat: { name: "Baseball Bat", desc: null },
  water: { name: "Water", desc: null },
  rice_bag: { name: "Rice Bag", desc: null },
  chainsaw: { name: "Chainsaw", desc: null },
  machete: { name: "Machete", desc: null },
}

let _cardId = 0
const cardId = () => {
  _cardId++
  return _cardId
}

export const starterWeapons = [
  "fire_axe",
  "crowbar",
  "pan",
  "pistol",
  "bow",
  "rifle",
]

export const masterDeck = [
  new Card(0, "water", "item"),
  new Card(0, "water", "item"),
  new Card(0, "rice_bag", "item"),
  new Card(0, "rice_bag", "item"),
  new Card(0, "canned_food", "item"),
  new Card(0, "canned_food", "item"),
  new Card(0, "energy_drink", "item"),
  new Card(0, "energy_drink", "item"),
  new Card(0, "cookies", "item"),
  new Card(0, "flashlight", "item"),
  new Card(0, "flashlight", "item"),
  new Card(0, "molotov", "weapon", "range"),
  new Card(0, "molotov", "weapon", "range"),
  new Card(0, "plenty_of_ammo_45", "item"),
  new Card(0, "plenty_of_ammo_45", "item"),
  new Card(0, "plenty_of_ammo_shell", "item"),
  new Card(0, "plenty_of_ammo_shell", "item"),
  new Card(0, "spare_change", "item"),
  new Card(0, "scope", "item"),
  new Card(0, "gasoline", "item"),
  new Card(0, "gasoline", "item"),
  new Card(0, "glass_bottle", "item"),
  new Card(0, "glass_bottle", "item"),
  new Card(0, "riot_shield", "item"),

  new Card(1, "fire_axe", "weapon", "melee"),
  new Card(1, "fire_axe", "weapon", "melee"),
  new Card(1, "crowbar", "weapon", "melee"),
  new Card(1, "crowbar", "weapon", "melee"),
  new Card(1, "baseball_bat", "weapon", "melee"),
  new Card(5, "chainsaw", "weapon", "melee"),
  new Card(5, "chainsaw", "weapon", "melee"),
  new Card(1, "machete", "weapon", "melee"),
  new Card(1, "machete", "weapon", "melee"),
  new Card(2, "katana", "weapon", "melee"),
  new Card(2, "katana", "weapon", "melee"),
  new Card(1, "pan", "weapon", "melee"),
  new Card(1, "pan", "weapon", "melee"),
  new Card(2, "claw_hammer", "weapon", "melee"),
  new Card(2, "claw_hammer", "weapon", "melee"),
  new Card(1, "hatchet", "weapon", "melee"),
  new Card(1, "hatchet", "weapon", "melee"),
  new Card(1, "kukri", "weapon", "melee"),
  new Card(1, "kukri", "weapon", "melee"),
  new Card(1, "meat_cleaver", "weapon", "melee"),
  new Card(1, "meat_cleaver", "weapon", "melee"),
  new Card(1, "wakizachi", "weapon", "melee"),
  new Card(1, "wakizachi", "weapon", "melee"),
  new Card(1, "knife", "weapon", "melee"),
  new Card(1, "knife", "weapon", "melee"),
  new Card(2, "saber", "weapon", "melee"),
  new Card(2, "sword", "weapon", "melee"),
  new Card(1, "knuckles", "weapon", "melee"),
  new Card(1, "knuckles", "weapon", "melee"),

  new Card(2, "evil_twins", "weapon", "range"),
  new Card(1, "pistol", "weapon", "range"),
  new Card(1, "pistol", "weapon", "range"),
  new Card(1, "pistol", "weapon", "range"),
  new Card(1, "rifle", "weapon", "range"),
  new Card(1, "rifle", "weapon", "range"),
  new Card(2, "sawed_off", "weapon", "range"),
  new Card(2, "sawed_off", "weapon", "range"),
  new Card(2, "shotgun", "weapon", "range"),
  new Card(2, "shotgun", "weapon", "range"),
  new Card(3, "sub_mg", "weapon", "range"),
  new Card(3, "sub_mg", "weapon", "range"),
  new Card(1, "44_magnum", "weapon", "range"),
  new Card(1, "44_magnum", "weapon", "range"),
  new Card(2, "assault_rifle", "weapon", "range"),
  new Card(2, "assault_rifle", "weapon", "range"),
  new Card(1, "gunblade", "weapon", "range"),
  new Card(1, "gunblade", "weapon", "range"),
  new Card(2, "ak47", "weapon", "range"),
  new Card(2, "ak47", "weapon", "range"),
  new Card(1, "bow", "weapon", "range"),
  new Card(1, "bow", "weapon", "range"),
  new Card(3, "mp5", "weapon", "range"),
  new Card(1, "desert_eagle", "weapon", "range"),
  new Card(1, "desert_eagle", "weapon", "range"),
  new Card(1, "crossbow", "weapon", "range"),
  new Card(1, "crossbow", "weapon", "range"),
  new Card(2, "double_barrel", "weapon", "range"),
  new Card(1, "ma_shotgun", "weapon", "range"),
  new Card(5, "mac_10", "weapon", "range"),
  new Card(5, "mac_10", "weapon", "range"),
  new Card(3, "handcannon", "weapon", "range"),
  new Card(2, "winchester", "weapon", "range"),
  new Card(0, "flamethrower", "weapon", "range"),

  new Card(0, "ah", "item"),
  new Card(0, "ah", "item"),
  new Card(0, "ah2", "item"),
]

export const masterEpicDeck = [
  new Card(5, "911_special", "weapon", "range"),
  new Card(3, "automatic_shotgun", "weapon", "range"),
  new Card(6, "jack_and_jill", "weapon", "range"),
  new Card(4, "la_guillotine", "weapon", "melee"),
  new Card(2, "nailbat", "weapon", "melee"),
  new Card(4, "zantetsuken", "weapon", "melee"),
  new Card(4, "daisho", "weapon", "melee"),
  new Card(3, "golden_ak47", "weapon", "range"),
  new Card(5, "thompson", "weapon", "range"),
  new Card(3, "pink_m4", "weapon", "range"),
  new Card(2, "nico_special", "weapon", "range"),
  new Card(0, "rpg", "weapon", "range"),

  new Card(0, "ah", "item"),
  new Card(0, "ah2", "item"),
]

export const mapMasterDeck = (cardId) => 
  masterDeck.find(card => card.id === cardId) || masterEpicDeck.find(card => card.id === cardId)

export const shuffleDeck = (deck) => {
  const _deck = [...deck].sort(() => Math.random() - 0.5)
  return _deck
}

export const initDeck = masterDeck.map((card) => card.id)

export const initEpicDeck = masterEpicDeck.map((card) => card.id)
