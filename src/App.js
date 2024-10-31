import { Fragment, useRef, useState } from 'react';
import { useEffect } from 'react';
import { initState, randomHeroPool } from './classes/DataInit';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import DebugTool from './components/DebugTool';
import PlayAudio from './classes/PlayAudio';
import MapZombieSpawnPoint from './components/MapZombieSpawnPoint';
import MapObjective from './components/MapObjective';
import MapEpicWeapon from './components/MapEpicWeapon';
import MapDoor from './components/MapDoor';
import { JSONreset, createArray, delay, randomIdOnlyNumber, randomNumber, sortRandom, stringContains } from './classes/Utils';
import MapPlayer from './components/MapPlayer';
import { mapMasterDeck, shuffleDeck, starterWeapons } from './classes/Card';
import Player from './classes/Player';
import ItemCard from './components/ItemCard';
import { fetchInitData, subscribeData, updateData } from './classes/ApiService';
import PlayerBoard from './components/PlayerBoard';
import { buildZombie, getZombieTrans } from './classes/Zombie';
import { DEV_MODE } from './classes/_InitSetting';
import missions from './classes/Mission';
import Hero, { initHeroes, randomHero } from './classes/Hero';
import $ from "jquery"
import Rain from './components/Rain';
import EndgameModal from './components/EndgameModal';
import ActionModal from './components/ActionModal';
import PlayerList from './components/PlayerList';
import NewPlayerBoard from './components/NewPlayerBoard';
import MapThing from './components/MapThing';

function App() {
  const [rule, setRule] = useState(null)
  const [mission, setMission] = useState(null)
  const [players, setPlayers] = useState([])
  const [log, setLog] = useState([])
  const [deck, setDeck] = useState([])
  const [spawnDeck, setSpawnDeck] = useState([])

  const [selectedCard, selectCard] = useState(null)
  const [selectedWeapon, selectWeapon] = useState(null)
  const [diceResult, setDiceResult] = useState([])
  const [diceBonus, setDiceBonus] = useState(0)

  const queryParams = new URLSearchParams(window.location.search)
  const sessionId = queryParams.get("sessionId")
  const roomId = queryParams.get("roomId")
  const isAdmin = queryParams.get("user") === "admin"
  const missionId = queryParams.get("missionId")
  const me = players.find(player => player.sessionId === sessionId)
  const mainState = { rule, players, mission, log, deck, spawnDeck }
  const isMyTurn = me && me.sessionId === rule?.turnSessionId
  const notLoggedIn = !sessionId || !me
  const heroForPick = rule?.ramdomToPickHeroes.find(heroForPick => heroForPick.sessionId === me?.sessionId) || []

  const [spawnerPosition, setSpawnerPosition] = useState ({ x: 0, y: 0 })
  const [showDice, toggleShowDice] = useState(0)
  const [yourName, setYourname] = useState("")
  const [showSpawner, setShowSpawner] = useState(false)
  const [lastAudioLog, setLastAudioLog] = useState(null)

  const modalTrigger = useRef()
  const modalTrigger2 = useRef()
  const modalClose = useRef()

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    if (isMyTurn) {
      PlayAudio.gunReload()
    }
  }, [isMyTurn])


  useEffect(() => {
    if (rule?.endGame) {
      modalTrigger2.current.click()

      if (rule.endGame === "win")
        PlayAudio.victory()
      else 
        PlayAudio.defeat()
    }
  }, [rule?.endGame])

  useEffect(() => {
    let lastLog = log[log.length - 1]
    if (!lastLog) return () => { }
    setLastAudioLog(lastLog)

    const notMyLog = lastLog.sessionId !== me?.sessionId

    if (lastLog.msg.includes("ใช้") && notMyLog)
      playSoundByAction(lastLog.msg)
    
    if (lastLog.msg.includes("ค้นหาสิ่งของ") && notMyLog)
      PlayAudio.search()

    if (lastLog.msg.includes("ได้ฆ่า") && notMyLog && lastLog.msg !== lastAudioLog?.msg)
      PlayAudio.randomZombieDead()

    if (stringContains(["ทิ้งการ์ด", "มอบการ์ด", "สลับการ์ด"], lastLog.msg) && notMyLog)
      PlayAudio.drawCard()

    if (stringContains(["เก็บกล่องทรัพยากรสีแดง", "เก็บกล่องอาวุธ"], lastLog.msg) && notMyLog)
      PlayAudio.openBox()

    if (lastLog.msg.includes("ค้นหาสิ่งของ") && notMyLog)
      PlayAudio.search()

    if (stringContains(["พังประตู", "ปิดประตู"], lastLog.msg) && notMyLog)
      PlayAudio.open()

    if (stringContains(["ซอมบี้ปรากฏ", "ซอมบี้เคลื่อนที่"], lastLog.msg) && notMyLog && lastLog.msg !== lastAudioLog?.msg)
      PlayAudio.randomZombieSpawn()

    if (lastLog.msg.includes("เคลื่อนที่") && notMyLog && lastLog.msg !== lastAudioLog?.msg)
      PlayAudio.move()

    if (lastLog.msg.includes("เทิร์นซอมบี้"))
      PlayAudio.heartbeat()
      
  }, [log])


  useEffect(() => {
    if (DEV_MODE) {
      const _mission = missions.find(_mission => _mission.id === missionId)
      setMission(JSONreset(_mission))
      setPlayers(JSONreset(initState.players))
      setLog(JSONreset(initState.log))
      setDeck(JSONreset(initState.deck))
      setSpawnDeck(JSONreset(initState.spawnDeck))
      setRule(JSONreset(initState.rule))
    } else {
      // BASE DATA
      subscribeData((data) => {
        setMission(data.mission)
        setPlayers(data.players)
        setLog(data.log)
        setDeck(data.deck)
        setSpawnDeck(data.spawnDeck)
        setRule(data.rule)
      }, { docId: roomId })

      fetchInitData({ docId: roomId }).then((data) => {
        setMission(data.mission)
        setPlayers(data.players)
        setLog(data.log)
        setDeck(data.deck)
        setSpawnDeck(data.spawnDeck)
        setRule(data.rule)

        const _mission = missions.find(_mission => _mission.id === missionId)
        if (isAdmin && _mission && _mission.id !== data.mission?.id) {
          delay(() => updateData({ mission: _mission }, { docId: roomId }))
        }
      })
    }
  }, [])

  const resetSelector = () => {
    selectCard(null)
    selectWeapon(null)
    setDiceBonus(0)
    toggleShowDice(0)
    modalClose.current.click()
    return false
  }

  const decreaseAction = (state) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        if (_player.action > 0)
        _player.action--
      }
      return _player
    })
    setPlayers(state.players)
  }

  const removeCardFromPlayers = (card, state) => {
    state.players = state.players.map(_player => {
      const filterCardOut = (cardId) => cardId !== card.id
      _player.equipItemIds = _player.equipItemIds.filter(filterCardOut)
      _player.backpackItemIds = _player.backpackItemIds.filter(filterCardOut)

      return _player
    })
    setPlayers(state.players)
  }

  const addCardToTrash = (card, state) => {
    state.rule = { ...state.rule, trashDeck: [...state.rule.trashDeck, card.id] }
    setRule(state.rule)
  }

  const addCardToPlayer = (state, cardIds, player) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === player.sessionId) {
        if (player.equipItemIds.length < 3) {
          player.equipItemIds = [...player.equipItemIds, ...cardIds]
        } 
        else {
          player.backpackItemIds = [...player.backpackItemIds, ...cardIds]
        } 
      }
      return _player
    })
    setPlayers(state.players)
  }

  const addLog = (state, msg) => {
    const myName = me?.name || ""
    const mySessionId = me?.sessionId || ""

    state.log = [...state.log, { name: myName, sessionId: mySessionId, msg }]
    setLog(state.log)
    return state.log
  }

  const gainExp = (state, exp) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.level += exp
      }
      return _player
    })
    setPlayers(state.players)
    return state.players
  }

  const addPlayerLog = (state, type, id) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.logs = [..._player.logs, { type, id }]
      }
      return _player
    })
    setPlayers(state.players)
    return state.players
  }

  const playSoundByAction = (action) => {
    if (action.includes("fire_axe")) PlayAudio.bash()
    else if (action.includes("crowbar")) PlayAudio.bash()
    else if (action.includes("baseball_bat")) PlayAudio.bash()
    else if (action.includes("machete")) PlayAudio.bash()
    else if (action.includes("katana")) PlayAudio.bash()
    else if (action.includes("pan")) PlayAudio.bash()
    else if (action.includes("claw_hammer")) PlayAudio.bash()
    else if (action.includes("hatchet")) PlayAudio.bash()
    else if (action.includes("kukri")) PlayAudio.bash()
    else if (action.includes("meat_cleaver")) PlayAudio.bash()
    else if (action.includes("wakizachi")) PlayAudio.bash()
    else if (action.includes("knife")) PlayAudio.bash()
    else if (action.includes("saber")) PlayAudio.bash()
    else if (action.includes("sword")) PlayAudio.bash()
    else if (action.includes("knuckles")) PlayAudio.bash()
    else if (action.includes("la_guillotine")) PlayAudio.bash()
    else if (action.includes("nailbat")) PlayAudio.bash()
    else if (action.includes("zantetsuken")) PlayAudio.bash()
    else if (action.includes("daisho")) PlayAudio.bash()
    else if (action.includes("chainsaw")) PlayAudio.chainsaw()

    // else if (action.includes("flamethrower")) PlayAudio.bow()
    // else if (action.includes("rpg")) PlayAudio.bow()
    else if (action.includes("evil_twins")) PlayAudio.gunPistol()
    else if (action.includes("assault_rifle")) PlayAudio.gunM42()
    else if (action.includes("m16a4_rifle")) PlayAudio.gunM42()
    else if (action.includes("pink_m4")) PlayAudio.gunM42()
    else if (action.includes("sniper_rifle")) PlayAudio.gun3()
    else if (action.includes("rifle")) PlayAudio.gun3()
    else if (action.includes("winchester")) PlayAudio.gun3()
    else if (action.includes("sub_mg")) PlayAudio.gunSmg()
    else if (action.includes("44_magnum")) PlayAudio.gunDesertEagle()
    else if (action.includes("gunblade")) PlayAudio.gunGunblade()
    else if (action.includes("mp5")) PlayAudio.gun2()
    else if (action.includes("mac_10")) PlayAudio.gunSmg2()
    else if (action.includes("bow")) PlayAudio.bow()
    else if (action.includes("crossbow")) PlayAudio.bow()
    else if (action.includes("golden_ak47")) PlayAudio.gunAk47()
    else if (action.includes("ak47")) PlayAudio.gunAk47()
    else if (action.includes("pistol")) PlayAudio.gunPistol()
    else if (action.includes("glock")) PlayAudio.gunPistol()
    else if (action.includes("desert_eagle")) PlayAudio.gunDesertEagle()
    else if (action.includes("automatic_shotgun")) PlayAudio.gunAutoShotGun()
    else if (action.includes("jack_and_jill")) PlayAudio.gunAutoShotGun()
    else if (action.includes("ma_shotgun")) PlayAudio.gunShotgun()
    else if (action.includes("double_barrel")) PlayAudio.gunShotgun()
    else if (action.includes("shotgun")) PlayAudio.gunShotgun()
    else if (action.includes("sawed_off")) PlayAudio.gunSawoff()
    else if (action.includes("handcannon")) PlayAudio.gunSawoff()
    else if (action.includes("911_special")) PlayAudio.gunP90()
    else if (action.includes("thompson")) PlayAudio.gunM4()
    else if (action.includes("nico_special")) PlayAudio.gunGaygun()
  }

  // =============================================================

  const handleKeyDown = (e) => {
    if (isAdmin) {
      if (e.key === "q") {
        setSpawnerPosition(mousePos)
      }
    }

    const scrollValue = 200

    if (e.key === "w") 
      window.scrollBy(0, -scrollValue)

    if (e.key === "a") 
      window.scrollBy(-scrollValue, 0)

    if (e.key === "s") 
      window.scrollBy(0, scrollValue)

    if (e.key === "d") 
      window.scrollBy(scrollValue, 0)
  }

  const handleMouseMove = (event) => {
    if (isAdmin && showSpawner) setMousePos({ x: event.pageX - 200, y: event.pageY - 200 });
  }

  const onYourNameInputChange = (e) => {
    setYourname(e.target.value)
  }

  const joinGameClicked = (e) => {
    const state = { rule, log, players }

    let newPlayer = new Player(yourName, randomIdOnlyNumber(6))
    newPlayer = JSON.parse(JSON.stringify(newPlayer))
    state.players = [...state.players, newPlayer]
    state.players = sortRandom(state.players)
    setPlayers(state.players)

    queryParams.set("sessionId", newPlayer.sessionId)
    const newUrl = "?" + queryParams.toString()
    window.history.replaceState({ path: newUrl }, '', newUrl)

    const randomHeroes = randomHero(initHeroes)
    const pickedHeroes = rule.ramdomToPickHeroes.flatMap(_ramdomToPickHero => _ramdomToPickHero.heroes)
    const notPickedHeroes = randomHeroes.filter(_initHero => !pickedHeroes.map(_pickedHero => _pickedHero.name).includes(_initHero.name))

    state.players.map((player, i) => {
      if (player.sessionId === newPlayer.sessionId) {
        const heroes = notPickedHeroes.slice(0, randomHeroPool)

        const _heroForPick = {
          sessionId: newPlayer.sessionId,
          heroes
        }
        state.rule.ramdomToPickHeroes = state.rule.ramdomToPickHeroes.concat(_heroForPick)
      }
    })
    setRule(state.rule)
    PlayAudio.open()

    addLog(state, `${Player.showFullname(newPlayer)} ผู้เล่นเข้าร่วมเกมส์`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const pickHeroClicked = (hero) => {
    const state = { log, players }

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.hero = hero
        _player.skill1 = true

        if (hero.maxHp === 3) {
          _player.hp3 = true
        } 
        else if (hero.maxHp === 2) {
          _player.hp2 = true
        }
      }
      return _player
    })
    setPlayers(state.players)

    resetSelector()
    PlayAudio.open()

    addLog(state, `เลือกเซอไวเวอร์ ${Hero.showName(hero)}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const onZombieControlled = (e, pos, id) => {
    if (!isMyTurn && !isAdmin)
      return null

    const state = { mission, log }
    const { x, y } = pos;
    let posChanged = false

    let zombieName;
    state.mission.zombies = state.mission.zombies.map(zombie => {
      if (zombie.id === id) {
        if (zombie.position.x !== x || zombie.position.y !== y) 
          posChanged = true
        
        zombie.position = { x, y }
        zombieName = zombie.name
      }
      return zombie
    })
    setMission({ ...state.mission })
    PlayAudio.move()

    if (posChanged) {
      addLog(state, `${zombieName} ซอมบี้เคลื่อนที่`)
      delay(() => updateData(state, { docId: roomId }))
    }
  }

  const onPlayerControlled = (e, pos, _sessionId) => {
    const state = { players, log }
    const { x, y } = pos;
    let posChanged = false

    let playerName;
    state.players = state.players.map(_player => {
      if (_player.sessionId === _sessionId) {
        if (_sessionId === me.sessionId) 
          _player.action--

        if (_player.position.x !== x || _player.position.y !== y) 
          posChanged = true
      
        _player.position = { x, y }
        playerName = _player.name
      }
      return _player
    })
    setPlayers([ ...state.players ])
    PlayAudio.move()

    if (posChanged) {
      addLog(state, `${playerName} เคลื่อนที่`)
      delay(() => updateData(state, { docId: roomId }))
    }
  }

  const playerStatChanged = (player, key, operation) => {
    const state = { log, players }

    state.players = state.players.map(_player => {
      if (_player.sessionId === player.sessionId) {
        if (operation === "+")
          _player[key]++
        else if (operation === "-")
          _player[key]--
      }
      return _player
    })
    setPlayers(state.players)
    PlayAudio.click()

    addLog(state, `${operation} ${key}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const spawnZombieClicked = (zombieName, number = 1) => {
    const state = { rule, log, mission }

    createArray(number).map(() => {
      const x = spawnerPosition.x + randomNumber(-50, 50)
      const y = spawnerPosition.y + randomNumber(-50, 50)
      state.mission.zombies = [...state.mission.zombies, buildZombie(zombieName, { position: { x, y } })]
    })
    setMission({ ...state.mission })
    PlayAudio.randomZombieSpawn()

    if (zombieName === "chupacabra") {
      state.rule.isRaining = true
      setRule(state.rule)
      addLog(state, "chupacabra ทำให้สภาพอากาศเปลี่ยน... <span class='purple'>ฝนตก</span>")
    }

    addLog(state, `ซอมบี้ปรากฏ ${zombieName}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const restartClicked = () => {
    const state = { players, deck, rule }
    const _mission = missions.find(_mission => _mission.id === mission.id)

    let cardsInDeck = state.deck.map(mapMasterDeck)
    let starterCards = starterWeapons.map(name => cardsInDeck.find(card => card.name === name))
    starterCards = sortRandom(starterCards)

    const fireAxeCard = starterCards.find(card => card.name === "fire_axe")
    starterCards = starterCards.filter(card => card.name !== "fire_axe")
    starterCards.unshift(fireAxeCard)

    const starterCardIds = starterCards.map(card => card.id)
    state.deck = state.deck.filter(cardId => !starterCardIds.includes(cardId))
    setDeck(state.deck)

    state.players = state.players.map((player, i) => {
      const x = _mission.playerSpawnPosition.x + randomNumber(-50, 50)
      const y = _mission.playerSpawnPosition.y + randomNumber(-50, 50)

      player.position = { x, y }
      player.equipItemIds = [starterCardIds[i]]
      return player
    })
    setPlayers(state.players)

    state.rule = { ...state.rule, turnSessionId: state.players[0].sessionId }
    setRule(state.rule)
    console.log("state.players[0].sessionId  ", state.players[0].sessionId)
    // setShowSpawner(true)

    delay(() => updateData(state, { docId: roomId }))
  }

  const searchItemClicked = (number = 1) => {
    const state = { deck, players, log }
    
    if (state.deck.length < number) return false;

    const drawnCardIds = state.deck.slice(0, number);
    state.deck = state.deck.slice(number)
    setDeck(state.deck)

    const card = drawnCardIds.map(mapMasterDeck)[0]
    addPlayerLog(state, "item", card.id)
    addCardToPlayer(state, drawnCardIds, me)
    decreaseAction(state)

    const cards = drawnCardIds.map(mapMasterDeck)
    PlayAudio.search()

    addLog(state, `ค้นหาสิ่งของ ${cards[0].showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const endTurnClicked = () => {
    const state = { rule, players, log }
    let nextPlayer;
    let endSurvivorTurn = false

    delay(() => {
      state.players = state.players.map((player, i) => {
        player.action = player.maxAction
  
        if (player.sessionId === me.sessionId) {
          if (state.players.length === i+1) {
            endSurvivorTurn = true;
            state.rule = { ...state.rule, turnSessionId: "", zombieTurn: true }
            setRule(state.rule)
          } 
          else {
            nextPlayer = state.players[i + 1] || state.players[0]
            const nextSessionId = nextPlayer?.sessionId
            state.rule = { ...state.rule, turnSessionId: nextSessionId }
            setRule(state.rule)
          }
        }
        return player
      })
  
      setPlayers(state.players)
      PlayAudio.click()
      resetSelector()
  
      addLog(state, `จบเทิร์น`)

      if (endSurvivorTurn) 
        addLog(state, `<span class="red">เทิร์นซอมบี้...</span>`)

      delay(() => updateData(state, { docId: roomId }))
    })
  }

  const cardClicked = (card) => {
    modalTrigger.current.click()
    selectCard(card)
  }

  const addCardToTrashClicked = (card) => {
    const state = { log, rule, players }

    removeCardFromPlayers(card, state)
    addCardToTrash(card, state)

    resetSelector()
    PlayAudio.drawCard()

    addLog(state, "ทิ้งการ์ด " + card.showName())
    delay(() => updateData(state, { docId: roomId }))
  }

  const swapCardClicked = (card) => {
    const state = { log, players }

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        if (_player.equipItemIds.includes(card.id)) {
          _player.backpackItemIds = [..._player.backpackItemIds, card.id]
          _player.equipItemIds = _player.equipItemIds.filter(cardId => cardId !== card.id)
        } 
        else if (_player.backpackItemIds.includes(card.id)) {
          _player.equipItemIds = [..._player.equipItemIds, card.id]
          _player.backpackItemIds = _player.backpackItemIds.filter(cardId => cardId !== card.id)
        }
      }
      return _player
    })
    setPlayers(state.players)

    resetSelector()
    PlayAudio.drawCard()

    addLog(state, "สลับการ์ด " + card.showName())
    delay(() => updateData(state, { docId: roomId }))
  }

  const giveCardClicked = (card, player) => {
    const state = { log, players }

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.equipItemIds = _player.equipItemIds.filter(cardId => cardId !== card.id)
        _player.backpackItemIds = _player.backpackItemIds.filter(cardId => cardId !== card.id)
      }
      if (_player.sessionId === player.sessionId) {
        _player.equipItemIds = [..._player.equipItemIds, card.id]
      }
      return _player
    })
    setPlayers(state.players)
    resetSelector()
    PlayAudio.drawCard()

    if (isMyTurn) 
      decreaseAction(state)
    

    addLog(state, `มอบการ์ด ${card.showName()} ให้ ${player.name}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const showDiceClicked = (diceNumber) => {
    setDiceResult([])

    if (showDice > 0) {
      toggleShowDice(0)
    } else {
      toggleShowDice(diceNumber)
    }
  }

  const rollDiceClicked = (result) => {
    const state = { log, players }

    if (!result.length) return false

    decreaseAction(state)
    setDiceResult(result)

    if (selectedWeapon) {
      playSoundByAction(selectedWeapon.name)
    } else {
      PlayAudio.click()
    }

    let reloadTxt = selectedWeapon?.hasReloadSkill()
      ? "<span class='red'> Reload</span>"
      : ""

    addLog(state, `ใช้ ${selectedWeapon.name} ` + result.join(", ") + reloadTxt)
    delay(() => updateData(state, { docId: roomId }))
  }

  const killZombieClicked = (zombie) => {
    const state = { log, mission, players }

    delay(() => {
      if (zombie.name.includes("skinner")) 
        state.mission.zombies = [...state.mission.zombies, buildZombie("crawler", { position: zombie.position })]
      
      state.mission.zombies = state.mission.zombies.filter(_zombie => _zombie.id !== zombie.id)
      setMission(state.mission)
      
      gainExp(state, zombie.exp)
      addPlayerLog(state, "zombie", zombie.name)
      PlayAudio.randomZombieDead()

      addLog(state,`ได้ฆ่า ${zombie.name} ได้รับ exp+${zombie.exp}`)
      delay(() => updateData(state, { docId: roomId }))
    })
  }

  const trashZombieClicked = (zombie) => {
    const state = { log, mission }

    delay(() => {
      state.mission.zombies = state.mission.zombies.filter(_zombie => _zombie.id !== zombie.id)
      setMission(state.mission)
      PlayAudio.click()

      addLog(state, "ทิ้ง " + zombie.name)
      delay(() => updateData(state, { docId: roomId }))
    })
  }

  const takeObjectiveClicked = (objective) => {
    const state = { log, mission, players }
    
    state.mission.blocks.map(blockName => {
      state.mission[blockName].objectives = state.mission[blockName].objectives
        .filter(_obj => _obj.id !== objective.id)
    })
    setMission(state.mission)
    decreaseAction(state)

    gainExp(state, 5)
    PlayAudio.openBox()

    addLog(state, "เก็บกล่องทรัพยากรสีแดง ได้รับ exp+5 ")
    delay(() => updateData(state, { docId: roomId }))
  }

  const toggleZombieSpawn = (spawn) => {
    const state = { log, mission, players }
    
    state.mission.blocks.map(blockName => {
      state.mission[blockName].spawnPoints = state.mission[blockName].spawnPoints
        .filter(_spawn => _spawn.id !== spawn.id)
    })
    setMission(state.mission)
    decreaseAction(state)
    PlayAudio.openBox()

    addLog(state, "ทำลายจุดเกิดซอมบี้ ")
    delay(() => updateData(state, { docId: roomId }))
  }

  const takeEpicWeaponClicked = (epicWeapon) => {
    const state = { log, mission, players, rule }

    const drawnCardIds = state.rule.epicDeck.slice(0, 1);
    state.rule.epicDeck = state.rule.epicDeck.slice(1)
    setRule({ ...state.rule, epicDeck: state.rule.epicDeck })
    addCardToPlayer(state, drawnCardIds, me)
    
    state.mission.blocks.map(blockName => {
      state.mission[blockName].epicWeapons = state.mission[blockName].epicWeapons
        .filter(_epicWeapon => _epicWeapon.id !== epicWeapon.id)
    })
    setMission(state.mission)

    decreaseAction(state)
    PlayAudio.openBox()

    const card = drawnCardIds.map(mapMasterDeck)[0]

    addLog(state, `เก็บกล่องอาวุธ ได้รับ ${card.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const onClickThings = (thing) => {
    const state = { log, mission, players }

    state.mission.things = state.mission.things.filter(_thing => { 
      return _thing.id !== thing.id
    })

    // if (thing.name === "door") {
    //   state.mission.things.map(_thing => { 
    //     if (_thing.id === thing.id) {
    //       _thing.isOpen = !_thing.isOpen
    //     }
    //     return _thing
    //   })
    // } 
    // else {
    //   state.mission.things = state.mission.things.filter(_thing => { 
    //     return _thing.id !== thing.id
    //   })
    // }
    setMission(state.mission)
    
    addLog(state, `จัดการ ${thing.name}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const toggleDoorClicked = (door) => {
    const state = { log, mission, players }

    state.mission.blocks.map(blockName => {
      state.mission[blockName].doors = state.mission[blockName].doors.map(_door => {
        if (_door.id === door.id) {
          _door.isOpen = !_door.isOpen
        }
        return _door
      })
    })
    setMission(state.mission)
    decreaseAction(state)

    const doorActionTxt = door.isOpen ? "พังประตู" : "ปิดประตู"
    PlayAudio.open()

    addLog(state, doorActionTxt)
    delay(() => updateData(state, { docId: roomId }))
  }

  const drawSpawnCardClicked = (number = 1) => {
    const state = { log, spawnDeck, rule }
    const drawnCardIds = state.spawnDeck.slice(0, number);
    state.spawnDeck = state.spawnDeck.slice(number)
    setSpawnDeck(state.spawnDeck)

    state.rule.displaySpawnDeck = [ ...state.rule.displaySpawnDeck, ...drawnCardIds ]
    setRule(state.rule)
    PlayAudio.click()

    addLog(state, "ซอมบี้ปรากฏ " + drawnCardIds.join(", "))
    delay(() => updateData(state, { docId: roomId }))
  }

  const heroMarkerToggled = (marker) => {
    const state = { log, players }
    let stateChange = null

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        if (marker.includes("skill2") && _player.level >= 7) 
          _player.maxAction = 4

        if (marker.includes("skill2") && _player.level < 7) {
          return _player
        }

        if (marker.includes("skill3") && _player.level < 19) 
          return _player

        if (marker.includes("skill4") && _player.level < 43) 
          return _player

        if (marker.includes("hp")) {
          _player.hp3 = false
          _player.hp2 = false
          _player.hp1 = false
          _player.hp0 = false
        }
        if (marker.includes("skill3")) {
          _player.skill31 = false
          _player.skill32 = false
        }
        if (marker.includes("skill4")) {
          _player.skill41 = false
          _player.skill42 = false
          _player.skill43 = false
        }

        _player[marker] = !_player[marker]
        stateChange = _player[marker]
      }
      return _player
    })
    setPlayers(state.players)
    PlayAudio.click()

    stateChange = stateChange ? "+" : "-"
    addLog(state, `${stateChange} marker ${marker}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  // =============================================================

  const mapCss = (blockName) => {
    const block = mission[blockName]
    if (!block) return null
    const rotateKey = `rotate-${block.rotate}`
    return { 
      [rotateKey]: true
     }
  }

  const mapStyle = (blockName) => {
    const block = mission[blockName]
    if (!block) return null
    return { backgroundImage: `url('img/map_${block.tile}.png')` }
  }

  const mapZombies = () => {
    const backgroundStyle = (zombie) => ({ backgroundImage: `url('img/${zombie.name}.png')` })
    const zombieDesc = (zombie) => (
      <li>
        <div class="dropdown-item skin-dropdown-menu">
          <div className='bold'>
            {getZombieTrans(zombie.name).name}
          </div>
          {getZombieTrans(zombie.name).desc}
        </div>
      </li>
    )

    return mission.zombies.map(zombie => (
      <Draggable
        position={zombie.position} 
        onStop={(e, pos) => onZombieControlled(e, pos, zombie.id)}
      >
        <div className={classNames(`zombie-wrapper hoverable blink_me_sec zombie-index-${zombie.name} zombie-index-${zombie.type}`)}>
         {(isMyTurn || isAdmin) ? (
            <div>
              <div id={`zombie-${zombie.id}`} className={`zombie breathing ${zombie.name}`} style={backgroundStyle(zombie)} data-bs-toggle="dropdown" aria-expanded="false"></div>
              <ul class="dropdown-menu skin-dropdown-menu" aria-labelledby={`zombie-${zombie.id}`}>
                <li><div class="dropdown-item" onClick={() => killZombieClicked(zombie)}>ฆ่า [{zombie.name}]</div></li>
                <li><div class="dropdown-item red" onClick={() => trashZombieClicked(zombie)}>ทิ้ง [{zombie.name}]</div></li>
                {zombieDesc(zombie)}
              </ul>
          </div>
         ) : 
          <div>
            <div className={`zombie breathing blink_me_sec ${zombie.name}`} style={backgroundStyle(zombie)} data-bs-toggle="dropdown" aria-expanded="false"></div>
            <ul class="dropdown-menu skin-dropdown-menu" aria-labelledby={`zombie-${zombie.id}`}>
              {zombieDesc(zombie)}
            </ul>
          </div>
         }
        </div>
      </Draggable>
    ))
  }

  const mapExit = () => {
    return mission.exits.map(exit => 
      <img src="img/exit.png" 
        className={classNames("spawn-point hoverable", { ["rotate-" + exit.rotate]: true })} 
        style={exit.position} 
        alt='spawn-point' 
      />
    )
  }

  const renderLog = (_log) => {
    if (!_log) return null

    let actor = players.find(_player => _player.sessionId === _log.sessionId)
    actor = actor ? `<span class="bold">${actor?.name}</span>:` : ""
    const message = `${actor} ${_log.msg}`

    return <div dangerouslySetInnerHTML={{ __html: `<div>- ${message}</div>` }}></div>
  }

  console.log("mainState: ", mainState)

  if (!mission) return "loading"

  return (
    <div className="App" onMouseMove={handleMouseMove} onKeyDown={handleKeyDown} tabIndex="0">
      <button ref={modalTrigger} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#confirmModal" ></button>
      <button ref={modalTrigger2} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#endgameModal" ></button>

      {rule.isRaining && <Rain />}

      <ActionModal modalClose={modalClose} me={me} players={players} selectedCard={selectedCard} swapCardClicked={swapCardClicked} 
        giveCardClicked={giveCardClicked} addCardToTrashClicked={addCardToTrashClicked} />
      <EndgameModal endGame={rule.endGame} players={players} />
      <PlayerList rule={rule} players={players} cardClicked={cardClicked} />

      {isAdmin && (
        <Draggable>
          <div className='admin-board'>
            <DebugTool mainState={mainState} setRule={setRule} setPlayers={setPlayers} setDeck={setDeck} restartClicked={restartClicked} 
              spawnZombieClicked={spawnZombieClicked} drawSpawnCardClicked={drawSpawnCardClicked} setShowSpawner={setShowSpawner} showSpawner={showSpawner} 
              addLog={addLog} spawnerPosition={spawnerPosition} setMission={setMission} me={me} />
            {/* <button type='button' className='btn btn-primary' onClick={() => toggleIsLoading(!isLoading)}>toggle loading</button> */}
          </div>
        </Draggable>
      )}

      {rule.displaySpawnDeck.length > 0 && (
        <div className='spawn-card-display'>
          {rule.displaySpawnDeck.map(cardId => 
            <img 
              className={classNames("item-card item-card-md blink_me_sec")}
              src={`img/zombie_card_${cardId}.png`} alt={`zombie_card_${cardId}`} 
            />
          )}
        </div>
      )}

      {(notLoggedIn || !me.hero) && (
        <NewPlayerBoard notLoggedIn={notLoggedIn} heroForPick={heroForPick} yourName={yourName} onYourNameInputChange={onYourNameInputChange} 
          joinGameClicked={joinGameClicked} pickHeroClicked={pickHeroClicked} />
      )}

      {me && me.hero && (
        <PlayerBoard rollDiceClicked={rollDiceClicked} playerStatChanged={playerStatChanged} players={players} searchItemClicked={searchItemClicked} 
          showDiceClicked={showDiceClicked} cardClicked={cardClicked} endTurnClicked={endTurnClicked} me={me} rule={rule} showDice={showDice} 
          heroMarkerToggled={heroMarkerToggled} selectWeapon={selectWeapon} diceBonus={diceBonus} setDiceBonus={setDiceBonus} endGame={rule.endGame}
          scoreBoardClicked={() => modalTrigger2.current.click()}
        />
      )}

      <Draggable>
        <div className="log-wrapper">
          {log.slice(Math.max(log.length - 15, 0)).map(renderLog)}
        </div>
      </Draggable>

      <div className={classNames("main", { raining: rule.isRaining })}>
        <MapPlayer players={players} onPlayerControlled={onPlayerControlled} />

        <MapThing mission={mission} onClickThings={onClickThings} />

        {mapZombies()}
        {mapExit()}

        {isAdmin && showSpawner && (
          <Draggable
            position={spawnerPosition} 
            onStop={(e, pos) => setSpawnerPosition(pos)}
          >
          <div className='spawner hoverable'>
            SPAWNER <br /> SPAWNER <br /> SPAWNER <br /> SPAWNER
          </div>
          </Draggable>
        )}

        <div class="map-row">
          <div class={classNames("block block-1 map", mapCss("block_1"))} style={mapStyle("block_1")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_1"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_1"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_1"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_1"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-2 map", mapCss("block_2"))} style={mapStyle("block_2")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_2"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_2"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_2"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_2"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-3 map", mapCss("block_3"))} style={mapStyle("block_3")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_3"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_3"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_3"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_3"} onClick={toggleDoorClicked} />
          </div>
        </div>
        <div class="map-row">
          <div class={classNames("block block-4 map", mapCss("block_4"))} style={mapStyle("block_4")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_4"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_4"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_4"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_4"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-5 map", mapCss("block_5"))} style={mapStyle("block_5")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_5"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_5"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_5"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_5"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-6 map", mapCss("block_6"))} style={mapStyle("block_6")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_6"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_6"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_6"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_6"} onClick={toggleDoorClicked} />
          </div>
        </div>
        <div class="map-row">
          <div class={classNames("block block-7 map", mapCss("block_7"))} style={mapStyle("block_7")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_7"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_7"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_7"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_7"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-8 map", mapCss("block_8"))} style={mapStyle("block_8")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_8"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_8"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_8"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_8"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-9 map", mapCss("block_9"))} style={mapStyle("block_9")}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_9"} onClick={toggleZombieSpawn} />
            <MapObjective mission={mission} blockName={"block_9"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_9"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_9"} onClick={toggleDoorClicked} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
