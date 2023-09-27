import { initDeck, initEpicDeck, shuffleDeck } from './Card';
import { initHeroes, randomHero } from './Hero';
import { initPlayers } from './Player'
import { initSpawnDeck } from './SpawnCard';
import { randomIdOnlyNumber, sortRandom } from './Utils';
import { buildBrute, buildRunner, buildWalker } from "./Zombie";
import { AUTO_RANDOM_HERO } from './_InitSetting';

// const randomDeck = shuffleDeck(initDeck)
// const emojis = randomPlayers.map(_player => ({
//   sessionId: _player.sessionId,
//   name: _player.name,
//   emoji: null
// }))

let randomPlayers = sortRandom(initPlayers)
const randomDeck = shuffleDeck(initDeck)
const randomEpicDeck = shuffleDeck(initEpicDeck)
const randomSpawnDeck = shuffleDeck(initSpawnDeck)

const randomHeroes = randomHero(initHeroes)
let ramdomToPickHeroes = []

export const randomHeroPool = 3

// random heroes to pick
randomPlayers.map((player, i) => {
  const size = randomHeroPool
  const heroes = randomHeroes.slice(i * size, (i+1) *size)
  
  const heroForPick = {
    sessionId: player.sessionId,
    heroes
  }
  ramdomToPickHeroes = ramdomToPickHeroes.concat(heroForPick)

  return player
})

// auto pick warlord
if (AUTO_RANDOM_HERO) {
  randomPlayers = randomPlayers.map((player, i) => {
    player.hero = randomHeroes[i]
    // player.hero = initHeroes[78]
    player.hp3 = true
    player.skill1 = true

    return player
  })
}

export const initState = {
  deck: randomDeck,
  spawnDeck: randomSpawnDeck,
  players: randomPlayers,
  log: [],
  rule: {
    turnSessionId: "",
    trashDeck: [],
    displaySpawnDeck: [],
    epicDeck: randomEpicDeck,
    zombieTurn: false,
    endGame: "",
    isRaining: false,
    ramdomToPickHeroes: ramdomToPickHeroes
  },
  mission: null
  // emojis: emojis
}