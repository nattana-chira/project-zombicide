export default class Card {
  id = null
  name = null
  type = null
  subtype = null

  constructor(name, type = null, subtype = null) {
    this.id = cardId()
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
    const weapons = ["ma_shotgun", "sawed_off", "sawed_off", "double_barrel", "mac_10", "jack_and_jill", "handcannon"]
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
  new Card("fire_axe", "weapon", "melee"),
  new Card("fire_axe", "weapon", "melee"),
  new Card("crowbar", "weapon", "melee"),
  new Card("crowbar", "weapon", "melee"),
  new Card("baseball_bat", "weapon", "melee"),
  new Card("water", "item"),
  new Card("water", "item"),
  new Card("rice_bag", "item"),
  new Card("rice_bag", "item"),
  new Card("canned_food", "item"),
  new Card("canned_food", "item"),
  new Card("energy_drink", "item"),
  new Card("energy_drink", "item"),
  new Card("cookies", "item"),
  new Card("chainsaw", "weapon", "melee"),
  new Card("machete", "weapon", "melee"),
  new Card("machete", "weapon", "melee"),
  new Card("evil_twins", "weapon", "range"),
  new Card("flashlight", "item"),
  new Card("flashlight", "item"),
  new Card("katana", "weapon", "melee"),
  new Card("katana", "weapon", "melee"),
  new Card("molotov", "weapon", "range"),
  new Card("molotov", "weapon", "range"),
  new Card("pan", "weapon", "melee"),
  new Card("pan", "weapon", "melee"),
  new Card("pistol", "weapon", "range"),
  new Card("pistol", "weapon", "range"),
  new Card("pistol", "weapon", "range"),
  new Card("plenty_of_ammo_45", "item"),
  new Card("plenty_of_ammo_45", "item"),
  new Card("plenty_of_ammo_shell", "item"),
  new Card("plenty_of_ammo_shell", "item"),
  new Card("rifle", "weapon", "range"),
  new Card("rifle", "weapon", "range"),
  new Card("sawed_off", "weapon", "range"),
  new Card("sawed_off", "weapon", "range"),
  new Card("scope", "item"),
  new Card("shotgun", "weapon", "range"),
  new Card("sub_mg", "weapon", "range"),
  new Card("sub_mg", "weapon", "range"),
  new Card("44_magnum", "weapon", "range"),
  new Card("44_magnum", "weapon", "range"),
  new Card("assault_rifle", "weapon", "range"),
  new Card("spare_change", "item"),
  new Card("claw_hammer", "weapon", "melee"),
  new Card("claw_hammer", "weapon", "melee"),
  new Card("gunblade", "weapon", "range"),
  new Card("gunblade", "weapon", "range"),
  new Card("hatchet", "weapon", "melee"),
  new Card("hatchet", "weapon", "melee"),
  new Card("kukri", "weapon", "melee"),
  new Card("kukri", "weapon", "melee"),
  new Card("meat_cleaver", "weapon", "melee"),
  new Card("wakizachi", "weapon", "melee"),
  new Card("wakizachi", "weapon", "melee"),
  new Card("ak47", "weapon", "range"),
  new Card("bow", "weapon", "range"),
  new Card("bow", "weapon", "range"),
  new Card("mp5", "weapon", "range"),
  new Card("scope", "item"),
  new Card("winchester", "weapon", "melee"),
  new Card("desert_eagle", "weapon", "range"),
  new Card("crossbow", "weapon", "range"),
  new Card("double_barrel", "weapon", "range"),
  new Card("knife", "weapon", "melee"),
  new Card("knife", "weapon", "melee"),
  new Card("saber", "weapon", "melee"),
  new Card("sword", "weapon", "melee"),
  new Card("ma_shotgun", "weapon", "range"),
  new Card("mac_10", "weapon", "range"),
  new Card("mac_10", "weapon", "range"),
  new Card("handcannon", "weapon", "range"),
  new Card("knuckles", "weapon", "melee"),
  new Card("knuckles", "weapon", "melee"),
  new Card("gasoline", "item"),
  new Card("gasoline", "item"),
  new Card("glass_bottle", "item"),
  new Card("glass_bottle", "item"),

  new Card("ah", "item"),
  new Card("ah", "item"),
  new Card("ah2", "item"),
]

export const masterEpicDeck = [
  new Card("ah", "item"),
  new Card("ah2", "item"),

  new Card("911_special", "weapon", "range"),
  new Card("automatic_shotgun", "weapon", "range"),
  new Card("jack_and_jill", "weapon", "range"),
  new Card("la_guillotine", "weapon", "melee"),
  new Card("nailbat", "weapon", "melee"),
  new Card("zantetsuken", "weapon", "melee"),
  new Card("daisho", "weapon", "melee"),
  new Card("golden_ak47", "weapon", "range"),
  new Card("thompson", "weapon", "range"),
  new Card("pink_m4", "weapon", "range"),
  new Card("nico_special", "weapon", "range"),
]

export const mapMasterDeck = (cardId) => 
  masterDeck.find(card => card.id === cardId) || masterEpicDeck.find(card => card.id === cardId)

export const shuffleDeck = (deck) => {
  const _deck = [...deck].sort(() => Math.random() - 0.5)
  return _deck
}

export const initDeck = masterDeck.map((card) => card.id)

export const initEpicDeck = masterEpicDeck.map((card) => card.id)
