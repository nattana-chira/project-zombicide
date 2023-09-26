import { DEV_MODE } from "./_InitSetting"

export default class Player {
  name = null
  sessionId = null
  action = 3
  maxAction = 3
  level = 0
  equipItemIds = []
  backpackItemIds = []
  position = { x: 0, y: 0 }
  hero = null

  skill1 = false
  skill2 = false
  skill31 = false
  skill32 = false
  skill41 = false
  skill42 = false
  skill43 = false
  hp3 = false
  hp2 = false
  hp1 = false
  hp0 = false

  constructor(name, sessionId) {
    this.name = name
    this.sessionId = sessionId
  }

  static showFullname(player) {
    return `${player?.name} (${player?.sessionId})`
  }
}

const _initPlayers = [
  new Player("Drink", "254686"),
  // new Player("Somchai", "874957"),
  // new Player("C0", "632001")
]

export const initPlayers = DEV_MODE ? _initPlayers : []