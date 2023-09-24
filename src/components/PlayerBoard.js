import classNames from 'classnames';
import Draggable from 'react-draggable';
import DiceComponent from './Dice';
import { Fragment } from 'react';
import { mapMasterDeck } from '../classes/Card';
import ItemCard from './ItemCard';

export default function PlayerBoard(props) {
  const { rollDiceClicked, players, playerStatChanged, showDice, searchItemClicked, showDiceClicked, cardClicked, 
    endTurnClicked, heroMarkerToggled, me, rule } = props  

  const isMyTurn = me && me.sessionId === rule?.turnSessionId

  const renderPlayerStatChanger = (player, statKey) => {
    return (
      <Fragment>
        <span class="stat-changer-wrapper">
          <i class="fa fa-toggle-up stat-changer hoverable green" onClick={() => playerStatChanged(player, statKey, "+")}></i>
          <i class="fa fa-toggle-down stat-changer hoverable red" onClick={() => playerStatChanged(player, statKey, "-")}></i>
        </span>
      </Fragment>
    )
  }
  
  const renderDangerCode = () => {
    if (players.find(_player => _player.level >= 43))
      return <span className="red">RED</span>

    if (players.find(_player => _player.level >= 19))
      return <span className="orange">ORANGE</span>

    if (players.find(_player => _player.level >= 7))
      return <span className="yellow">YELLOW</span>

    return <span className="blue">BLUE</span>
  }

  return (
    <Draggable>
      <div className='player-board'>
        <div className='inner-wrapper'>
          <div className='dice-zone'>
            {showDice > 0 && <DiceComponent showDice={showDice} rollDiceClicked={rollDiceClicked} />}
          </div>
          <div className='player-action-buttons'>
            {/* PLAYER DETAIL */}
            <div className={classNames("bold player-name", { "red": me.hp1, "purple": me.hp0 })}>
              {me.name} <br /> ({me.sessionId})
            </div>
            <div>
              <span className={classNames({ "blink_me alert-text": me.action < 1 })}>
                AC: {me.action}/{me.maxAction}
              </span> 
              {renderPlayerStatChanger(me, "action")} 
            </div>	
            <div>
              LEVEL: {me.level} {renderPlayerStatChanger(me, "level")}
            </div>	
            <hr />

            {/* PLAYER ACTION BUTTON */}
            <button type="button" class="btn btn-success btn-sm" onClick={() => searchItemClicked()}>ค้นหา</button>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">ลูกเต๋า</button>
              <ul class="dropdown-menu">
                {showDice === 0 
                  ? (
                  <Fragment>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(1)}>1</div></li>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(2)}>2</div></li>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(3)}>3</div></li>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(4)}>4</div></li>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(5)}>5</div></li>
                    <li><div class="dropdown-item" onClick={() => showDiceClicked(6)}>6</div></li>
                  </Fragment>
                  ) 
                  : <li><div class="dropdown-item" onClick={() => showDiceClicked(0)}>รีเซตลูกเต๋า</div></li>}
              </ul>
            </div>
            <button type="button" id="roll-button" class="btn btn-primary btn-sm">ทอยลูกเต๋า</button>
            <div class="btn-group" role="group">
              {isMyTurn && (
                <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">จบเทิร์น</button>
              )}
              <ul class="dropdown-menu">          
                <li><div class="dropdown-item" onClick={() => endTurnClicked()}>ยืนยัน?</div></li>
              </ul>
            </div>
          </div>
          <div className='player-detail'>
            {me.hero && (
              <div class="hero-card" style={{ background: `url("img/hero_${me.hero.name}.png")`, backgroundSize: "cover" }}>
                <div class={classNames("marker marker-skill1", { "marker-visible": me.skill1 })}></div>
                <div onClick={() => heroMarkerToggled("skill2")} class={classNames("marker marker-skill2", { "marker-visible": me.skill2 })}></div>
                <div onClick={() => heroMarkerToggled("skill31")} class={classNames("marker marker-skill31", { "marker-visible": me.skill31 })}></div>
                <div onClick={() => heroMarkerToggled("skill32")} class={classNames("marker marker-skill32", { "marker-visible": me.skill32 })}></div>
                <div onClick={() => heroMarkerToggled("skill41")} class={classNames("marker marker-skill41", { "marker-visible": me.skill41 })}></div>
                <div onClick={() => heroMarkerToggled("skill42")} class={classNames("marker marker-skill42", { "marker-visible": me.skill42 })}></div>
                <div onClick={() => heroMarkerToggled("skill43")} class={classNames("marker marker-skill43", { "marker-visible": me.skill43 })}></div>
                <div onClick={() => heroMarkerToggled("hp3")} class={classNames("marker marker-hp3", { "marker-hp-visible": me.hp3 })}></div>
                <div onClick={() => heroMarkerToggled("hp2")} class={classNames("marker marker-hp2", { "marker-hp-visible": me.hp2 })}></div>
                <div onClick={() => heroMarkerToggled("hp1")} class={classNames("marker marker-hp1", { "marker-hp-visible": me.hp1 })}></div>
                <div onClick={() => heroMarkerToggled("hp0")} class={classNames("marker marker-hp0", { "marker-hp-visible": me.hp0 })}></div>
              </div>
            )}
          </div>
          <div className='inventory'>
            
            <span className={classNames({ "blink_me alert-text": me.equipItemIds.length > 2 })}>
              EQUIP
            </span>
            <div class="equip">
              {me.equipItemIds.map(mapMasterDeck).map(card => (
                <ItemCard card={card} classes="blink_me_sec" onClick={() => cardClicked(card)} />
              ))}
            </div>
            <span className={classNames({ "blink_me alert-text": me.backpackItemIds.length > 3 })}>
              BACKPACK
            </span>
            <div class="backpack">
              {me.backpackItemIds.map(mapMasterDeck).map(card => (
                <ItemCard card={card} classes="blink_me_sec" onClick={() => cardClicked(card)} />
              ))}
            </div>

            <br />
            <span class="danger-code">CODE {renderDangerCode()}</span> <br />
            <span class="danger-code">[<span class="yellow">7</span> <span class="orange">19</span> <span class="red">43</span>]</span>
          </div>
        </div>
      </div>
    </Draggable>
  )
}