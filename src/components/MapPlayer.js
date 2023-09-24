import classNames from 'classnames';
import Draggable from 'react-draggable';

export default function MapPlayer({ players, onPlayerControlled }) {  
  return (
    players.map(player => (
      <Draggable
        position={player.position} 
        onStop={(e, pos) => onPlayerControlled(e, pos, player.sessionId)}
      >
        <div className='player-wrapper'>
          <div class={classNames("player-name", { "red": player.hp1, "purple": player.hp0 })}>{player.name}</div>
          <div className={`player breathing`}>
          </div>
        </div>
      </Draggable>
    ))
  )
}