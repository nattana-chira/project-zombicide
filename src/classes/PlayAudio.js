import DrawCard from '../audio/drawcard.m4a'
import Cursor1 from '../audio/Cursor1.m4a'
import Open1 from '../audio/Open1.m4a'
import Search from '../audio/Search.ogg'
import OpenBox from '../audio/OpenBox.ogg'
import GunReload from '../audio/GunReload.mp3'
import Move from '../audio/Move01.ogg'
import Heartbeat from '../audio/HeartBeat.mp3'

import Zombie1 from '../audio/zombie1.mp3'
import Zombie2 from '../audio/zombie2.mp3'
import Zombie3 from '../audio/zombie3.mp3'
import Zombie4 from '../audio/zombie4.mp3'
import Zombie5 from '../audio/zombie5.mp3'
import Zombie6 from '../audio/zombie6.mp3'
import Zombie7 from '../audio/zombie7.mp3'
import Zombie8 from '../audio/zombie8.mp3'
import Zombie9 from '../audio/zombie9.mp3'

import Bow from '../audio/Bow.ogg'
import Chainsaw from '../audio/Chainsaw.mp3'
import Bash from '../audio/Bash.ogg'

import Gun2 from '../audio/Gun2.ogg'
import Gun3 from '../audio/Gun1.m4a'
import GunAk47 from '../audio/Gun-ak47.mp3'
import GunAutoShotGun from '../audio/Gun-autoshotgun.mp3'
import GunDesertEagle from '../audio/Gun-deserteagle.mp3'
import GunM4 from '../audio/Gun-m4.mp3'
import GunM42 from '../audio/Gun-m4-2.mp3'
import GunP90 from '../audio/Gun-p90.mp3'
import GunPistol from '../audio/Gun-pistol.mp3'
import GunSawoff from '../audio/Gun-sawoff.mp3'
import GunShotgun from '../audio/Gun-shotgun.mp3'
import GunSmg from '../audio/Gun-smg5.mp3'
import GunSmg2 from '../audio/Gun-smg5-2.mp3'
import GunGaygun from '../audio/Gungaygun.mp3'
import GunGunblade from '../audio/Gungunblade.mp3'

import { randomNumber } from './Utils'

const volume = 0.25

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

  static gunReload = () => {
    PlayAudio.play(gunReload)
  }

  static move = () => {
    PlayAudio.play(move)
  }

  static heartbeat = () => {
    PlayAudio.play(heartbeat)
  }

  static search = () => {
    PlayAudio.play(search)
  }

  static openBox = () => {
    PlayAudio.play(openBox)
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

  static bow = () => {
    PlayAudio.play(bow)
  }

  static bash = () => {
    PlayAudio.play(bash)
  }

  static chainsaw = () => {
    PlayAudio.play(chainsaw)
  }

  static gunAk47 = () => {
    PlayAudio.play(gunAk47)
  }

  static gunPistol = () => {
    PlayAudio.play(gunPistol)
  }
  
  static gunSawoff = () => {
    PlayAudio.play(gunSawoff)
  }

  static gunShotgun = () => {
    PlayAudio.play(gunShotgun)
  }

  static gunAutoShotGun = () => {
    PlayAudio.play(gunAutoShotGun)
  }

  static gunDesertEagle = () => {
    PlayAudio.play(gunDesertEagle)
  }

  static gunP90 = () => {
    PlayAudio.play(gunP90)
  }

  static gunM4 = () => {
    PlayAudio.play(gunM4)
  }

  static gunM42 = () => {
    PlayAudio.play(gunM42)
  }

  static gunSmg = () => {
    PlayAudio.play(gunSmg)
  }

  static gunSmg2 = () => {
    PlayAudio.play(gunSmg2)
  }

  static gun2 = () => {
    PlayAudio.play(gun2)
  }

  static gun3 = () => {
    PlayAudio.play(gun3)
  }

  static gunGaygun = () => {
    PlayAudio.play(gunGaygun)
  }

  static gunGunblade = () => {
    PlayAudio.play(gunGunblade)
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
const search = PlayAudio.buildSound(Search)
const openBox = PlayAudio.buildSound(OpenBox)
const gunReload = PlayAudio.buildSound(GunReload)
const move = PlayAudio.buildSound(Move)
const heartbeat = PlayAudio.buildSound(Heartbeat)

const zombieDead1 = PlayAudio.buildSound(Zombie3)
const zombieDead2 = PlayAudio.buildSound(Zombie8)
const zombieDead3 = PlayAudio.buildSound(Zombie9)
const zombieSpawn1 = PlayAudio.buildSound(Zombie1)
const zombieSpawn2 = PlayAudio.buildSound(Zombie2)
const zombieSpawn3 = PlayAudio.buildSound(Zombie5)
const zombieSpawn4 = PlayAudio.buildSound(Zombie6)
const zombieSpawn5 = PlayAudio.buildSound(Zombie7)

const bow = PlayAudio.buildSound(Bow)
const bash = PlayAudio.buildSound(Bash)
const chainsaw = PlayAudio.buildSound(Chainsaw)

const gunAk47 = PlayAudio.buildSound(GunAk47)
const gunPistol = PlayAudio.buildSound(GunPistol)
const gunSawoff = PlayAudio.buildSound(GunSawoff)
const gunShotgun = PlayAudio.buildSound(GunShotgun)
const gunAutoShotGun = PlayAudio.buildSound(GunAutoShotGun)
const gunDesertEagle = PlayAudio.buildSound(GunDesertEagle)
const gunP90 = PlayAudio.buildSound(GunP90)
const gunM4 = PlayAudio.buildSound(GunM4)
const gunM42 = PlayAudio.buildSound(GunM42)
const gunSmg = PlayAudio.buildSound(GunSmg)
const gunSmg2 = PlayAudio.buildSound(GunSmg2)
const gun2 = PlayAudio.buildSound(Gun2)
const gun3 = PlayAudio.buildSound(Gun3)
const gunGaygun = PlayAudio.buildSound(GunGaygun)
const gunGunblade = PlayAudio.buildSound(GunGunblade)

