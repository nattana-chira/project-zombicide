import { Fragment } from "react";
import ItemCard from "./ItemCard";
import classNames from "classnames";
import { mapMasterDeck } from "../classes/Card";

export default function PlayerList({ rule, players, cardClicked }) {
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