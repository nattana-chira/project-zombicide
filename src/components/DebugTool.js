import { createArray, delay, randomIdOnlyNumber, randomNumber, sortRandom } from "../classes/Utils"
import { updateData, resetInit, addInit, EMOJI_DOC } from "../classes/ApiService"
import Player from '../classes/Player'
import PlayAudio from "../classes/PlayAudio"
import { Fragment } from "react"
import { mapMasterDeck, specialDeck } from "../classes/Card"
import { abominations, getZombieTrans } from "../classes/Zombie"

const DebugTool = (props) => {
  console.log("specialDeck ", specialDeck)

  const { setRule, setPlayers, setDeck, mainState, restartClicked, spawnZombieClicked, drawSpawnCardClicked,
    showSpawner, setShowSpawner, addLog, spawnerPosition, setMission, me } = props
  const players = mainState.players

  const queryParams = new URLSearchParams(window.location.search)
  const sessionId = queryParams.get("sessionId")
  const roomId = queryParams.get("roomId")

  const setTurn = (player) => {
    const state = { rule: mainState.rule }
    state.rule.turnSessionId = player.sessionId

    setRule({ ...state.rule })
    delay(() => updateData({ rule: state.rule }, { docId: roomId }))
  }

  const controlPlayer = (player) => {
    if (!player)
      queryParams.delete("sessionId")
    else 
      queryParams.set("sessionId", player.sessionId)
    
    const newUrl = "?" + queryParams.toString()
    window.history.replaceState({ path: newUrl }, '', newUrl)
    setRule({ ...mainState.rule })
  }
  
  const kickPlayer = (player) => {
    const state = { log: mainState.log, players: mainState.players }
    state.players = state.players.filter(_player => _player.sessionId !== player.sessionId)
    setPlayers(state.players)

    addLog(state, "เตะผู้เล่น " + Player.showFullname(player))
    delay(() => updateData(state, { docId: roomId }))
  }

  const toggleRaining = () => {
    const state = { log: mainState.log, rule: mainState.rule }

    if (!state.rule.isRaining) {
      state.rule.isRaining = true
      setRule(state.rule)
      addLog(state, "สภาพอากาศเปลี่ยน... <span class='purple'>ฝนตก</span>")
    } 
    else {
      state.rule.isRaining = false
      setRule(state.rule)
      addLog(state, "สภาพอากาศเปลี่ยน... <span class='purple'>ฝนหยุดตก</span>")
    }

    delay(() => updateData(state, { docId: roomId }))
  }

  const endGameClicked = (endGameTxt) => {
    const state = { rule: mainState.rule, log: mainState.log } 
    state.rule.endGame = endGameTxt

    if (endGameTxt === "win") {
      addLog(state, "<span class'green'>Mission Completed</span> !!!")
    }
    else {
      addLog(state, "<span class'green'>Mission Failed</span> !!!")
    }

    delay(() => updateData(state, { docId: roomId }))
    
  }

  const spawnThingClicked = (name, deg = 0) => {
    const state = { mission: mainState.mission, log: mainState.log }

    const x = spawnerPosition.x + 200
    const y = spawnerPosition.y + 200
    
    let newThing =  { 
      id: randomIdOnlyNumber(),
      name,
      visible: true,
      isOpen: false,
      rotate: deg + "deg",
      position: { left: x, top: y }
    }

    state.mission.things = [...state.mission.things, newThing]
    setMission(state.mission)
    PlayAudio.click()

    addLog(state, "สร้าง " + name)
    delay(() => updateData(state, { docId: roomId }))
  }

  const doRestartMatch = () => {
    // const state = { rule: mainState.rule }
    // state.rule = { ...state.rule, restartMatch: true }
    // updateData(state, { docId: roomId })
    delay(() => resetInit({ docId: roomId, sessionId }))
  }

  const getItemClicked = (card) => {
    const state = { players: mainState.players, log: mainState.log, deck: mainState.deck }

    state.players = state.players.map(_player => {
      if (_player.sessionId === sessionId) {
        _player.equipItemIds = [..._player.equipItemIds, card.id]
      }
      return _player
    })
    setPlayers(state.players)

    state.deck = sortRandom(state.deck.filter(cardId => cardId !== card.id))
    setDeck(state.deck)

    addLog(state, "take card" + card.name)
    delay(() => updateData(state, { docId: roomId }))
  }

  const clearSpawnCardClicked = () => {
    const state = { players: mainState.players, log: mainState.log, rule: mainState.rule }

    state.rule = { ...state.rule, displaySpawnDeck: []}
    setRule(state.rule)
    PlayAudio.click()

    addLog(state, "clear spawn card")

    if (state.rule.zombieTurn) {
      state.rule = { ...state.rule, zombieTurn: false }
      state.players.push(state.players.shift())
      state.rule.turnSessionId = state.players[0].sessionId
      setRule(state.rule)
      setPlayers(state.players)

      if (!state.rule.isRaining) {
        const number = randomNumber(1, 9)
        if (number === 1) {
          state.rule.isRaining = true
          setRule(state.rule)
          addLog(state, "สภาพอากาศเปลี่ยน... <span class='purple'>ฝนตก</span>")
        }
      } 
      else {
        const number = randomNumber(1, 2)
        if (number === 1) {
          state.rule.isRaining = false
          setRule(state.rule)
          addLog(state, "สภาพอากาศเปลี่ยน... <span class='purple'>ฝนหยุดตก</span>")
        }
      }
    }

    delay(() => updateData(state, { docId: roomId }))
  }

  const toggleZombieTurn = () => {
    const state = { rule: mainState.rule, players: mainState.players }
    state.rule = { 
        ...state.rule, turnSessionId: "", 
      zombieTurn: !state.rule.zombieTurn 
    }

    if (!state.rule.zombieTurn) {
      state.players.push(state.players.shift())
      state.rule.turnSessionId = state.players[0].sessionId
      setPlayers(state.players)
    }

    setRule(state.rule)
    updateData(state, { docId: roomId })
  }

  const renderZombieOption = (zombieName, number) => {
    return createArray(number).map(_number => 
      <li><div class="dropdown-item" onClick={() => spawnZombieClicked(zombieName, _number+1)}>{_number+1}</div></li>
    )
  }

  const randomAbominationClicked = () => {
    const random = sortRandom(abominations)
    const zombieName = random[0]
    spawnZombieClicked(zombieName)
  }

  return (
    <div className="dev-tool-wrapper d-grid gap-1">
      <button type="button" class="btn btn-primary btn-sm" onClick={() => setShowSpawner(!showSpawner)}>[Q] SPAWNER</button>

      {showSpawner && (
        <Fragment>
          <button type="button" class="btn btn-primary btn-sm" onClick={() => drawSpawnCardClicked(1)}>
            DRAW SPAWN
          </button>
          <button type="button" class="btn btn-danger btn-sm" onClick={() => clearSpawnCardClicked()}>
            CLEAR SPAWN
          </button>
          <hr />

          <div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Walker
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("walker", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Runner
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("runner", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Brute
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("brute", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 DogZ
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("dogz", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-green btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Walker
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("toxic_walker", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-green btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Runner
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("toxic_runner", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-green btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Brute
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("toxic_brute", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Crowz
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("crowz", 4)}
              </ul>
            </div>

             <div class="btn-group" role="group">
              <button type="button" class="btn btn-brown btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Walker
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("berserker_walker", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-brown btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Runner
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("berserker_runner", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-brown btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Brute
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("berserker_brute", 4)}
              </ul>
            </div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Abomi
              </button>
              <ul class="dropdown-menu">
              <li><div class="dropdown-item" onClick={() => randomAbominationClicked()}>Random</div></li>
                {abominations.map(_abo => (
                  <li><div class="dropdown-item" onClick={() => spawnZombieClicked(_abo)}>{getZombieTrans(_abo).name}</div></li>
                ))}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-yellow btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Walker
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("skinner_walker", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-yellow btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Runner
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("skinner_runner", 4)}
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-yellow btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                 Brute
              </button>
              <ul class="dropdown-menu">
                {renderZombieOption("skinner_brute", 4)}
              </ul>
            </div>


            <div class="btn-group" role="group">
              <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Zombie
              </button>
              <ul class="dropdown-menu">
                <li><div class="dropdown-item" onClick={() => spawnZombieClicked("crawler")}>crawler</div></li>
              </ul>
            </div>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Thing
              </button>
              <ul class="dropdown-menu">
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("door")}>Door 0</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("door", 90)}>Door 90</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("door", 180)}>Door 180</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("door", 270)}>Door 270</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("openedDoor")}>Opened Door 0</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("openedDoor", 90)}>Opened Door 90</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("openedDoor", 180)}>Opened Door 180</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("openedDoor", 270)}>Opened Door 270</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("spawnPoint")}>Spawn Point 0</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("spawnPoint", 90)}>Spawn Point 90</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("spawnPoint", 180)}>Spawn Point 180</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("spawnPoint", 270)}>Spawn Point 270</div></li>
                <li><div class="dropdown-item" onClick={() => spawnThingClicked("exit")}>Exit</div></li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}

      {!showSpawner && (
        <Fragment>
          <div class="btn-group" role="group">
            <button id="btnDev4" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ADMIN
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnDev4">
              <li><div class="dropdown-item green" onClick={() => endGameClicked("win")}>END GAME - WIN</div></li>
              <li><div class="dropdown-item green" onClick={() => endGameClicked("lose")}>END GAME - LOSE</div></li>
              <li><div class="dropdown-item green" onClick={() => restartClicked()}>START MATCH</div></li>
              <li><div class="dropdown-item" onClick={doRestartMatch}>RESET DATA {roomId}</div></li>
              <li><div class="dropdown-item" onClick={addInit}>ADD NEW DATA</div></li>
            </ul>
          </div>

          <div class="btn-group" role="group">
            <button id="btnDev2" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              PLAYERS
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnDev2">
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => setTurn(player)}><span class="green">TURN</span> - {Player.showFullname(player)}</div></li>
              ))}
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => controlPlayer(player)}><span class="blue">CONTROL</span> - {Player.showFullname(player)}</div></li>
              ))}
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => kickPlayer(player)}><span class="red">KICK</span> - {Player.showFullname(player)}</div></li>
              ))}

              <li><div class="dropdown-item" onClick={() => controlPlayer(null)}>FREE CONTROL</div></li>
              <li><div class="dropdown-item" onClick={toggleZombieTurn}>ZOMBIE</div></li>
            </ul>
          </div>

          <div class="btn-group" role="group">
            <button id="btnDev2" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ITEM
            </button>
            <ul class="dropdown-menu long-dropdown-menu" aria-labelledby="btnDev2">
              {specialDeck.map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>*** {card.name}</div></li>
              )}
              {mainState.deck.map(mapMasterDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
            </ul>
          </div>
   
          <button type="button" class="btn btn-primary btn-sm" onClick={() => toggleRaining()}>Rain</button>
        </Fragment>
      )}

      {!showSpawner && (
        <Fragment>
          <hr />
          item deck: {mainState.deck.length} <br />
          zombie deck: {mainState.spawnDeck.length} <br />
          epic deck: {mainState.rule.epicDeck.length} <br />
          turn: {mainState.rule.turnSessionId}
        </Fragment>
      )}
    </div>
  )
}

export default DebugTool