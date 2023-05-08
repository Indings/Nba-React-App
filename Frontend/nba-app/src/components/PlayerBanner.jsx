import React, { useEffect, useState } from 'react'

import {SearchForm} from './SearchForm'

export const PlayerBanner = ({displayComponents, teamLogoUrl,playerInfo, player,search,setSearch,searchPlayer,setYear}) =>{
const [bannerClass,setBannerClass] = useState("playerBanner")
const [gridItemClass,setGridItemClass] = useState("grid-item")
useEffect( () => {

  if(displayComponents.current !== 0){

    setBannerClass("playerBannerWithComponents")
    setGridItemClass("grid-item3")
  }
})

return(
    <div className={bannerClass}>

    {displayComponents.current !== 0 &&
      <>
      <div className="grid-item1">
        <img className="opaqueLogo" src={teamLogoUrl}/>
        <img className="logoImage" src={teamLogoUrl}/>
        <img className="playerImage"src={playerInfo.imageSrc}/>
      </div>
      <div className="grid-item2">
        <text className="playerInfo">{player[0].team.name} | #{playerInfo.jersey} | {player[0].position}</text>
        <br/>
        <text className="playerName">{player[0].first_name} {player[0].last_name}</text>
      </div>
      </>
    }

    <div className={gridItemClass}>
      
        {displayComponents.current == 0 &&
        <div className="titleContainer">
         <h1>NBA Player Search</h1>
          <div className="infoContainer">
            <button className="infoButton">?</button>
            <div className="info">
              <>Welcome to NBA Player Search! <br/><br/> To use, simply enter a NBA players name and select a season year in order to view player stats <br/><br/>
              Example <br/>"Lebron James" "2022" Or "Kyrie Irving" "2016"  
              </>
            </div>
         </div>
         </div>
        }
      
    
      <SearchForm search = {search} setSearch = {setSearch} searchPlayer={searchPlayer} setYear ={setYear}/>
    </div>
  </div>

)

}