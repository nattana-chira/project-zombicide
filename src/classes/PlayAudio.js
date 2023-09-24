import DrawCard from '../audio/drawcard.m4a'
import Cursor1 from '../audio/Cursor1.m4a'
// import Skill3 from '../audio/Skill3.m4a'
import Open1 from '../audio/Open1.m4a'
// import Dead from '../audio/Dead.mp3'
// import Gameover from '../audio/Shock1.m4a'
// import Victory from '../audio/Victory2.m4a'
// import Coin from '../audio/Coin.m4a'
// import Move1 from '../audio/Move1.ogg'
// import Sword from '../audio/Sword.ogg'
// import MarchDrum from '../audio/MarchDrum.mp3'
// import BattleCry from '../audio/BattleCry.mp3'

import Zombie1 from '../audio/zombie1.mp3'
import Zombie2 from '../audio/zombie2.mp3'
import Zombie3 from '../audio/zombie3.mp3'
import Zombie4 from '../audio/zombie4.mp3'
import Zombie5 from '../audio/zombie5.mp3'
import Zombie6 from '../audio/zombie6.mp3'
import Zombie7 from '../audio/zombie7.mp3'
import Zombie8 from '../audio/zombie8.mp3'
import Zombie9 from '../audio/zombie9.mp3'
import { randomNumber } from './Utils'

const volume = 0.3

export default class PlayAudio {
  static buildSound = (soundFile) => {
    const sound = new Audio(soundFile);
    const _sound = sound.cloneNode(true)
    _sound.volume = volume
    return _sound
  }

  static drawCard = () => {
    PlayAudio.play(drawCard)
  }

  static click = () => {
    PlayAudio.play(click)
  }

  static open = () => {
    PlayAudio.play(open)
  }

  static zombieDead1 = () => {
    PlayAudio.play(zombieDead1)
  }

  static zombieDead2 = () => {
    PlayAudio.play(zombieDead2)
  }

  static zombieDead3 = () => {
    PlayAudio.play(zombieDead3)
  }

  static randomZombieDead = () => {
    const result = randomNumber(1, 3)
    switch(result) {
      case 1: return PlayAudio.zombieDead1()
      case 2: return PlayAudio.zombieDead2()
      case 3: return PlayAudio.zombieDead3()
      default: return false
    }
  }

  static randomZombieSpawn = () => {
    const result = randomNumber(1, 5)
    switch(result) {
      case 1: return PlayAudio.play(zombieSpawn1)
      case 2: return PlayAudio.play(zombieSpawn2)
      case 3: return PlayAudio.play(zombieSpawn3)
      case 4: return PlayAudio.play(zombieSpawn4)
      case 5: return PlayAudio.play(zombieSpawn5)
      default: return false
    }
  }

  // static dead = () => {
  //   PlayAudio.play(dead)
  // }

  // static skillSuccess = () => {
  //   PlayAudio.play(skillSuccess)
  // }

  // static gameOver = () => {
  //   PlayAudio.play(gameOver)
  // }

  // static victory = () => {
  //   PlayAudio.play(victory)
  // }

  // static coin = () => {
  //   PlayAudio.play(coin)
  // }

  // static turnStart = () => {
  //   PlayAudio.play(turnStart)
  // }

  // static sword = () => {
  //   PlayAudio.play(sword)
  // }

  // static coup = () => {
  //   PlayAudio.play(coup)
  // }

  // static protest = () => {
  //   PlayAudio.play(protest)
  // }

  static play(soundObj) {
    try {
      soundObj.play().catch(error => console.error('Error playing audio: ', error))
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  }
}

const drawCard = PlayAudio.buildSound(DrawCard)
const click = PlayAudio.buildSound(Cursor1)
const open = PlayAudio.buildSound(Open1)
const zombieDead1 = PlayAudio.buildSound(Zombie3)
const zombieDead2 = PlayAudio.buildSound(Zombie8)
const zombieDead3 = PlayAudio.buildSound(Zombie9)
const zombieSpawn1 = PlayAudio.buildSound(Zombie1)
const zombieSpawn2 = PlayAudio.buildSound(Zombie2)
const zombieSpawn3 = PlayAudio.buildSound(Zombie5)
const zombieSpawn4 = PlayAudio.buildSound(Zombie6)
const zombieSpawn5 = PlayAudio.buildSound(Zombie7)

// const dead = PlayAudio.buildSound(Dead)
// const skillSuccess = PlayAudio.buildSound(Skill3)
// const gameOver = PlayAudio.buildSound(Gameover)
// const victory = PlayAudio.buildSound(Victory)
// const coin = PlayAudio.buildSound(Coin)
// const turnStart = PlayAudio.buildSound(Move1)
// const sword = PlayAudio.buildSound(Sword)
// const coup = PlayAudio.buildSound(MarchDrum)
// const protest = PlayAudio.buildSound(BattleCry)
