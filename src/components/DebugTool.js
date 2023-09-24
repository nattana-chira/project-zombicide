import { delay } from "../classes/Utils"
import { updateData, resetInit, addInit, EMOJI_DOC } from "../classes/ApiService"
import Player from '../classes/Player'

const DebugTool = (props) => {
  const { setRule, setPlayers, mainState, restartClicked, spawnZombieClicked, drawSpawnCardClicked,
    clearSpawnCardClicked, setShowSpawner } = props
  const players = mainState.players

  const queryParams = new URLSearchParams(window.location.search)
  const sessionId = queryParams.get("sessionId")
  const roomId = queryParams.get("roomId")

  const setTurn = (player) => {
    const state = { rule: mainState.rule }
    state.rule.turnSessionId = player.sessionId

    setRule({ ...state.rule })
    delay(() => updateData({ rule: state.rule }, { roomId }))
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

  const doRestartMatch = () => {
    // const state = { rule: mainState.rule }
    // state.rule = { ...state.rule, restartMatch: true }
    // updateData(state, { docId: roomId })
    delay(() => resetInit({ docId: roomId, sessionId }))
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

  return (
    <div className="dev-tool-wrapper">
      <button type="button" class="btn btn-danger btn-sm" onClick={() => restartClicked()}>RESTART</button>

      <button type="button" class="btn btn-secondary btn-sm" onClick={() => setShowSpawner(true)}>SPAWNER</button>

      <div class="btn-group" role="group">
        <button id="btnDev4" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          ADMIN
        </button>
        <ul class="dropdown-menu" aria-labelledby="btnDev4">
          <li><div class="dropdown-item" onClick={doRestartMatch}>RESET DATA {roomId}</div></li>
          <li><div class="dropdown-item" onClick={addInit}>ADD DATA</div></li>
        </ul>
      </div>

      <div class="btn-group" role="group">
        <button id="btnDev2" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          SET TURN
        </button>
        <ul class="dropdown-menu" aria-labelledby="btnDev2">
          {players.map(player => (
            <li><div class="dropdown-item" onClick={() => setTurn(player)}>{Player.showFullname(player)}</div></li>
          ))}
          <li><div class="dropdown-item" onClick={toggleZombieTurn}>ZOMBIE</div></li>
        </ul>
      </div>

      <div class="btn-group" role="group">
        <button id="btnDev3" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          CONTROL PLAYER
        </button>
        <ul class="dropdown-menu" aria-labelledby="btnDev3">
          {players.map(player => (
            <li><div class="dropdown-item" onClick={() => controlPlayer(player)}>{Player.showFullname(player)}</div></li>
          ))}
           <li><div class="dropdown-item" onClick={() => controlPlayer(null)}>FREE CONTROL</div></li>
        </ul>
      </div>

      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          SPAWN ZOMBIE
        </button>
        <ul class="dropdown-menu">
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("walker")}>Walker</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("runner")}>Runner</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("brute")}>Brute</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("dogz")}>Dogz</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("crowz")}>Crowz</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("abominacop")}>Abominacop</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("toxic_walker")}>Toxic Walker</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("toxic_runner")}>Toxic Runner</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("toxic_brute")}>Toxic Brute</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("berserker_walker")}>Berserker Walker</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("berserker_runner")}>Berserker Runner</div></li>
          <li><div class="dropdown-item" onClick={() => spawnZombieClicked("berserker_brute")}>Berserker Brute</div></li>
        </ul>
      </div>

      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          DRAW SPAWN
        </button>
        <ul class="dropdown-menu">
          <li><div class="dropdown-item" onClick={() => drawSpawnCardClicked(1)}>DRAW 1</div></li>
          <li><div class="dropdown-item" onClick={() => clearSpawnCardClicked()}>CLEAR</div></li>
        </ul>
      </div>

      <hr />

      card in item deck: {mainState.deck.length} <br />
      card in zombie deck: {mainState.spawnDeck.length} <br />
      card in epic deck: {mainState.rule.epicDeck.length} <br />
      turn session: {mainState.rule.turnSessionId}
    </div>
  )
}

export default DebugTool