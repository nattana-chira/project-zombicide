import classNames from "classnames"
import { mapMasterDeck } from "../classes/Card"
import ItemCard from "./ItemCard"


export default function EndgameModal({ endGame, players }) {
  const renderPlayerLogs = (player) => player.logs.map(log => {
    if (log.type === "item") {
      const card = mapMasterDeck(log.id)
      return <ItemCard card={card} classes="item-card-sm" />
    }
    if (log.type === "zombie") {
      return (
        <img 
          className={classNames("item-card item-card-sm")}
          src={`img/${log.id}.png`}
        />
      )
    }
    return null
  })

  return (
    <div class="modal" id="endgameModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-body">
            <div class={classNames("endgame-title", { red: endGame === "lose", green: endGame === "win" })}>
              {endGame === "win" ? "Mission Completed" : "Mission Failed"}
            </div><hr />
            <div>
              {players.map(player => (
                <div className="player player-endgame">
                  <div className={`player-wrapper`}>
                    <div class="player-avatar">
                      <img class="img" className="img" src="img/player_avatar.png" />
                      <div class={"player-name"}>{player.name}</div>
                      <div>LEVEL: {player.level}</div>
                    </div>
                  </div>
                  <div>
                    {renderPlayerLogs(player)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}