import { Fragment } from "react";
import Draggable from "react-draggable";

export default function NewPlayerBoard({ notLoggedIn, heroForPick, yourName, onYourNameInputChange, joinGameClicked, pickHeroClicked }) {
  return (
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
  )
}