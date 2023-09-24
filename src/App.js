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
import { JSONreset, delay, randomIdOnlyNumber, randomNumber, sortRandom } from './classes/Utils';
import MapPlayer from './components/MapPlayer';
import { mapMasterDeck, shuffleDeck, starterWeapons } from './classes/Card';
import Player from './classes/Player';
import ItemCard from './components/ItemCard';
import { fetchInitData, subscribeData, updateData } from './classes/ApiService';
import PlayerBoard from './components/PlayerBoard';
import { buildZombie } from './classes/Zombie';
import { DEV_MODE } from './classes/_InitSetting';
import missions from './classes/Mission';
import Hero, { initHeroes, randomHero } from './classes/Hero';

function App() {
  const [rule, setRule] = useState(null)
  const [mission, setMission] = useState(null)
  const [players, setPlayers] = useState([])
  const [log, setLog] = useState([])
  const [deck, setDeck] = useState([])
  const [spawnDeck, setSpawnDeck] = useState([])

  const [selectedCard, selectCard] = useState(null)
  const [diceResult, setDiceResult] = useState([])

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
  const isCardOwner = (card) => {
    return me.equipItemIds.includes(card.id) || me.backpackItemIds.includes(card.id)
  }

  const [spawnerPosition, setSpawnerPosition] = useState ({ x: 0, y: 0 })
  const [showDice, toggleShowDice] = useState(0)
  const [yourName, setYourname] = useState("")
  const [showSpawner, setShowSpawner] = useState(false)

  const modalTrigger = useRef()
  const modalClose = useRef()

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

  // useEffect(() => {
  //   players
  //   mission.spawnPosition
  // }, [players.length])

  const resetSelector = () => {
    selectCard(null)
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

  // =============================================================

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
    PlayAudio.click()

    if (posChanged) {
      addLog(state, `${zombieName} moving`)
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
    PlayAudio.click()

    if (posChanged) {
      addLog(state, `${playerName} moving`)
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

  const spawnZombieClicked = (zombieName) => {
    const state = { log, mission }
    const x = spawnerPosition.x + randomNumber(-50, 50)
    const y = spawnerPosition.y + randomNumber(-50, 50)

    state.mission.zombies = [...state.mission.zombies, buildZombie(zombieName, { position: { x, y } })]
    setMission({ ...state.mission })
    PlayAudio.randomZombieSpawn()

    addLog(state, `spawn ${zombieName}`)
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
    setRule({ ...state.rule, turnSessionId: state.players[0].sessionId })
    setShowSpawner(true)

    delay(() => updateData(state, { docId: roomId }))
  }

  const searchItemClicked = (number = 1) => {
    const state = { deck, players, log }
    
    if (state.deck.length < number) return false;

    const drawnCardIds = state.deck.slice(0, number);
    state.deck = state.deck.slice(number)
    setDeck(state.deck)

    addCardToPlayer(state, drawnCardIds, me)
    decreaseAction(state)

    const cards = drawnCardIds.map(mapMasterDeck)
    PlayAudio.drawCard()
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
    PlayAudio.click()

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
    PlayAudio.click()

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
    PlayAudio.click()

    addLog(state, "ทอยลูกเต๋า " + result.join(", "))
    delay(() => updateData(state, { docId: roomId }))
  }

  const killZombieClicked = (zombie) => {
    const state = { log, mission, players }

    delay(() => {
      state.mission.zombies = state.mission.zombies.filter(_zombie => _zombie.id !== zombie.id)
      setMission(state.mission)
      
      gainExp(state, zombie.exp)
      PlayAudio.randomZombieDead()

      addLog(state,`ฆ่า ${zombie.name} ได้รับ exp+${zombie.exp}`)
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
      state.mission[blockName].objectives = state.mission[blockName].objectives.filter(_obj => _obj.id !== objective.id)
    })
    setMission(state.mission)
    decreaseAction(state)

    gainExp(state, 5)
    PlayAudio.click()

    addLog(state, "เก็บกล่องทรัพยากรสีแดง ได้รับ exp+5 ")
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
    PlayAudio.click()

    const card = drawnCardIds.map(mapMasterDeck)[0]

    addLog(state, `เก็บกล่องอาวุธ ได้รับ ${card.showName()}`)
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
    PlayAudio.click()

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

    addLog(state, "spawn card " + drawnCardIds.join(", "))
    delay(() => updateData(state, { docId: roomId }))
  }

  const clearSpawnCardClicked = () => {
    const state = { log, rule }

    state.rule = { ...state.rule, displaySpawnDeck: []}
    setRule(state.rule)
    PlayAudio.click()

    addLog(state, "clear spawn card")
    delay(() => updateData(state, { docId: roomId }))
  }

  const heroMarkerToggled = (marker) => {
    const state = { log, players }
    let stateChange = null

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        if (marker.includes("skill2") && _player.level < 7) 
          return _player
        else 
          _player.maxAction = 4

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
      [rotateKey]: true,
      [`map${block.tile}`]: true
     }
  }

  const mapZombies = () => {
    return mission.zombies.map(zombie => (
      <Draggable
        position={zombie.position} 
        onStop={(e, pos) => onZombieControlled(e, pos, zombie.id)}
      >
        <div className={classNames(`zombie-wrapper hoverable zombie-index-${zombie.name} zombie-index-${zombie.type}`)}>
         {(isMyTurn || isAdmin) ? (
            <div>
              <div id={`zombie-${zombie.id}`} className={`zombie ${zombie.name} breathing`} data-bs-toggle="dropdown" aria-expanded="false"></div>
              <ul class="dropdown-menu" aria-labelledby={`zombie-${zombie.id}`}>
                <li><div class="dropdown-item" onClick={() => killZombieClicked(zombie)}>ฆ่า [{zombie.name}]</div></li>
                <li><div class="dropdown-item red" onClick={() => trashZombieClicked(zombie)}>ทิ้ง [{zombie.name}]</div></li>
              </ul>
          </div>
         ) : <div className={`zombie ${zombie.name} breathing`}></div>}
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

  const renderPlayers = () => {
    return (
      <div className="player-avatar-container">
        {rule?.zombieTurn 
          ? (
            <div className="player-avatar zombie-avatar breathing">
              <img className="zombie-img" src="img/zombie_avatar.png" />
            </div>
          )
          : players.map(player => (
          <div className="player-avatar hoverable tooltip1">
            <img className="img" src="img/player_avatar.png" />
            <div className={classNames({ "green-text": rule.turnSessionId === player.sessionId })}>{player.name}</div>
            
            <span class="tooltiptext">
              <div className='view-player'>
                <div className='inner-wrapper'>
                  <div className='player-detail'>
                    {player.hero && (
                      <div class="hero-card-sm" style={{ background: `url("img/hero_${player.hero.name}.png")`, backgroundSize: "cover" }}>
                        <div class={classNames("marker marker-skill1", { "marker-visible": player.skill1 })}></div>
                        <div class={classNames("marker marker-skill2", { "marker-visible": player.skill2 })}></div>
                        <div class={classNames("marker marker-skill31", { "marker-visible": player.skill31 })}></div>
                        <div class={classNames("marker marker-skill32", { "marker-visible": player.skill32 })}></div>
                        <div class={classNames("marker marker-skill41", { "marker-visible": player.skill41 })}></div>
                        <div class={classNames("marker marker-skill42", { "marker-visible": player.skill42 })}></div>
                        <div class={classNames("marker marker-skill43", { "marker-visible": player.skill43 })}></div>
                        <div class={classNames("marker marker-hp3", { "marker-hp-visible": player.hp3 })}></div>
                        <div class={classNames("marker marker-hp2", { "marker-hp-visible": player.hp2 })}></div>
                        <div class={classNames("marker marker-hp1", { "marker-hp-visible": player.hp1 })}></div>
                        <div class={classNames("marker marker-hp0", { "marker-hp-visible": player.hp0 })}></div>
                      </div>
                    )}
                  </div>
                  <div class="inventory">
                    <div className={classNames("bold", { "red": player.hp1, "purple": player.hp0 })}>
                      {player.name} <br />({player.sessionId})
                    </div>
                    <div className={classNames({ "blink_me alert-text": player.action < 1 })}>
                      AC: {player.action}/{player.maxAction}
                    </div>
                    <div class="level">
                    LEVEL: {player.level}
                    </div>
                    <div class="equip">
                      {player.equipItemIds.map(mapMasterDeck).map(card => (
                        <ItemCard card={card} classes="blink_me_sec item-card-sm" onClick={() => cardClicked(card)} />
                      ))}
                    </div>
        
                    <div class="backpack">
                      {player.backpackItemIds.map(mapMasterDeck).map(card => (
                        <ItemCard card={card} classes="blink_me_sec item-card-sm" onClick={() => cardClicked(card)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    )
  }

  const renderLog = (_log) => {
    if (!_log) return null

    let actor = players.find(_player => _player.sessionId === _log.sessionId)
    actor = actor ? `<span class="bold">${Player.showFullname(actor)}</span>:` : ""
    const message = `${actor} ${_log.msg}`

    return <div dangerouslySetInnerHTML={{ __html: `<div>- ${message}</div>` }}></div>
  }

  console.log("mainState: ", mainState)

  if (!mission) return "loading"

  return (
    <div className="App">
      <button ref={modalTrigger} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#confirmModal" ></button>

     {/* ACTION MODAL */}
     <div class="modal" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <button ref={modalClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body">
              {selectedCard && <ItemCard card={selectedCard} classes="item-card-lg" />}
            </div>
            <div class="modal-footer">
              <div>
                <h5 class="footer-text" id="exampleModalLabel">
                  <div><strong>{selectedCard?.showName()}</strong> </div>
                  <div dangerouslySetInnerHTML={{ __html: selectedCard?.showDesc() }}></div>
                  {selectedCard?.hasSniperSkill() && (
                    <div class="green-text">Sniper</div>
                  )}
                  {selectedCard?.hasReloadSkill() && (
                    <div class="alert-text">Reload</div>
                  )}
                </h5>
                <hr />
                <div class="d-grid gap-2 footer-button">
                  {selectedCard && isCardOwner(selectedCard) && (
                    <Fragment>
                      <button type="button" class="btn btn-primary" onClick={() => swapCardClicked(selectedCard)}>
                        สลับช่อง
                      </button>

                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          มอบให้ผู้เล่นอื่น
                        </button>
                        <ul class="dropdown-menu">
                          {players.filter(_player => _player.sessionId !== me.sessionId).map(player => (
                            <li><div class="dropdown-item" onClick={() => giveCardClicked(selectedCard, player)}>{player.name}</div></li>
                          ))}
                        </ul>
                      </div>
                      
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          ทิ้งการ์ด
                        </button>
                        <ul class="dropdown-menu">
                          <li><div class="dropdown-item" onClick={() => addCardToTrashClicked(selectedCard)}>ยืนยัน</div></li>
                        </ul>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderPlayers()}

      {isAdmin && (
        <Draggable>
          <div className='admin-board'>
            <DebugTool mainState={mainState} setRule={setRule} setPlayers={setPlayers} restartClicked={restartClicked} spawnZombieClicked={spawnZombieClicked} 
              drawSpawnCardClicked={drawSpawnCardClicked} clearSpawnCardClicked={clearSpawnCardClicked} setShowSpawner={setShowSpawner} />
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
        <Draggable>
          <div className='player-board new-player-board'>
            <div className='inner-wrapper'>
              {notLoggedIn && 
                <Fragment>
                  <input type="text" class="form-control your-name-input blink_me_few_sec" placeholder='YOUR NAME...'
                    value={yourName}
                    onChange={onYourNameInputChange}
                  />
                  <button type="button" class="btn btn-primary btn-md btn-block" onClick={joinGameClicked}>
                    เข้าร่วมเกมส์
                  </button>
                </Fragment>
              }
              {heroForPick.heroes?.map(hero => (
                <div>
                  <div className="warlord-pick-inner-wrapper">
                    <div class="hero-img">
                      <img class="img" src={`img/hero_${hero.name}.png`} />
                    </div>
                    <div class="pick-hero-btn-wrapper">
                      <button onClick={() => pickHeroClicked(hero)} type="button" class="btn btn-primary btn-lg btn-block pick-hero-btn">
                        เลือก
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Draggable>
      )}

      {me && me.hero && (
        <PlayerBoard rollDiceClicked={rollDiceClicked} playerStatChanged={playerStatChanged} players={players} searchItemClicked={searchItemClicked} 
          showDiceClicked={showDiceClicked} cardClicked={cardClicked} endTurnClicked={endTurnClicked} me={me} rule={rule} showDice={showDice} 
          heroMarkerToggled={heroMarkerToggled}
        />
      )}

      <div class="log-wrapper">
        {log.slice(Math.max(log.length - 11, 0)).map(renderLog)}
      </div>

      <div className='main'>
        <MapPlayer players={players} onPlayerControlled={onPlayerControlled} />
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
          <div class={classNames("block block-1", mapCss("block_1"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_1"} />
            <MapObjective mission={mission} blockName={"block_1"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_1"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_1"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-2", mapCss("block_2"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_2"} />
            <MapObjective mission={mission} blockName={"block_2"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_2"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_2"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-3", mapCss("block_3"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_3"} />
            <MapObjective mission={mission} blockName={"block_3"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_3"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_3"} onClick={toggleDoorClicked} />
          </div>
        </div>
        <div class="map-row">
          <div class={classNames("block block-4", mapCss("block_4"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_4"} />
            <MapObjective mission={mission} blockName={"block_4"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_4"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_4"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-5", mapCss("block_5"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_5"} />
            <MapObjective mission={mission} blockName={"block_5"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_5"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_5"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-6", mapCss("block_6"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_6"} />
            <MapObjective mission={mission} blockName={"block_6"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_6"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_6"} onClick={toggleDoorClicked} />
          </div>
        </div>
        <div class="map-row">
          <div class={classNames("block block-7", mapCss("block_7"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_7"} />
            <MapObjective mission={mission} blockName={"block_7"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_7"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_7"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-8", mapCss("block_8"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_8"} />
            <MapObjective mission={mission} blockName={"block_8"} onClick={takeObjectiveClicked} />
            <MapEpicWeapon mission={mission} blockName={"block_8"} onClick={takeEpicWeaponClicked} />
            <MapDoor mission={mission} blockName={"block_8"} onClick={toggleDoorClicked} />
          </div>
          <div class={classNames("block block-9", mapCss("block_9"))}>
            <MapZombieSpawnPoint mission={mission} blockName={"block_9"} />
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
