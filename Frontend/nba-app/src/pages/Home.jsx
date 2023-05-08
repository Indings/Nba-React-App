import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {PlayerTable} from '../components/PlayerTable'
import {PlayerBanner} from '../components/PlayerBanner'
import {Navbar} from '../components/NavBar'

import '../App.css'

function Home() {
    const displayComponents = useRef(0)
    const firstRender = useRef(0)
    const firstRenderUE2 = useRef(0)
    const [playerTable, setPlayerTable] = useState("")
    const emptyPlayer = [{
        id:0, first_name:"", last_name:"", position:"", height_feet: "", height_inches: "", weight_pounds: "",
        team:{  id:0,  abbreviation:"",  city:"",  conference:"",  division:"",  full_name:"",  name:"" }
    }]
    const [playerInfo, setPlayerInfo] = useState({ imageSrc:"", jersey:"", dateofbirth:"", collegename:"", country:"" })
    const [teamLogo,setTeamLogo] = useState("")
    const [tdClass,setTdClass] = useState("")
    const [search, setSearch] = useState("")
    const [year, setYear] = useState("2022");
    const [player, setPlayer] = useState(emptyPlayer)
    const [gameHistory, setGameHistory] = useState([])
    const [stats, setStats] = useState({
      ast: 0, blk: 0, fgp: 0, fg3p: 0, pts: 0, ftp: 0, fti: 0, reb: 0, stl: 0, mins: 0,
    })
  
  //on search (buttonclick or enter) here player data will chabge
    function searchPlayer(){
      axios
        .get(`https://www.balldontlie.io/api/v1/players?search=${search}`)
        .then((res) => {
          if(res.data.data.length > 0){
            setPlayer(res.data.data)
            
          } else{
            alert("Enter a valid player")
          }
        }).catch(e => {
          console.log(e)
        })
        displayComponents.current++
      // axios
      //   .get("../nba_teams.json")
      //   .then((res) => {
      //     for(let i = 0; i < res.data.length; i++){
      //       let team = res.data[i]
      //       console.log(team)
      //       axios
      //         .post("http://localhost:5227/Teams/Create", team)
      //     }
         
      //   })
  
    }
    
    function setColors(maincolor,offcolor){
      let banner = document.querySelector('.playerBannerWithComponents')
      let stats = document.querySelector('.tableContainer')
      banner.style.backgroundColor = maincolor
      stats.style.backgroundColor = offcolor
    }
    
    const validateURL = (url) => { 
      if (url == "https://cdn.nba.com/headshots/nba/latest/1040x760/undefined.png") {
        url = "https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png"
      }
      return(url)
    }
  
  // once searched, once player data changes, update game history
    useEffect(()=>{
      if(firstRender.current < 2)
      {
        firstRender.current++
      }
      else
      {
        //set gamehistory from api
        if(player.length >0){
          axios
          .get(`https://www.balldontlie.io/api/v1/stats?seasons[]=${year}&per_page=100&player_ids[]=${player[0].id}`)
          .then((res) => {
              setGameHistory(res.data.data)
          }).catch( e => {
            console.log(e)
          })
          console.log(player)
          //pull official info from DB
          axios
            .get(`http://localhost:5227/Players/GetByName/${player[0].first_name}/${player[0].last_name}`)
            .then((res) => {
              let playerinfo = {
                imageSrc: validateURL("https://cdn.nba.com/headshots/nba/latest/1040x760/"+res.data.personid+".png"),
                jersey: res.data.jersey,
                dateofbirth: res.data.dateofbirth,
                collegename: res.data.collegename,
                country: res.data.country,
              }
              
              setPlayerInfo(playerinfo)
            })
  
          axios 
            .get(`http://localhost:5227/Teams/GetByName/${player[0].team.full_name}`)
            .then((res) =>{
              setTdClass(res.data.coloraccent)
              setColors(res.data.colormain,res.data.coloroff)
              setTeamLogo("https://cdn.nba.com/logos/nba/"+res.data.teamid+"/primary/L/logo.svg")
              
            })
            
            
        }
     }  
    },[player])
  
  //once player history changes, calculate stats
    useEffect(()=>{
      if(firstRenderUE2.current < 2)
      {
        firstRenderUE2.current++
      }
      else
      {
        if (gameHistory.length>0){
          var [ast,blk,fga,fgm,fg3a,fg3m,pts,fta,ftm,reb,stl,mins,gamesPlayed] = [0,0,0,0,0,0,0,0,0,0,0,0,0]
          let arraylen = gameHistory.length
          for(var i = 0; i < arraylen; i++){
            if(gameHistory[i].min !== "00"){
              gamesPlayed++
              ast += gameHistory[i].ast  
              blk += gameHistory[i].blk
              fga += gameHistory[i].fga
              fgm += gameHistory[i].fgm
              fg3a += gameHistory[i].fg3a
              fg3m += gameHistory[i].fg3m
              pts += gameHistory[i].pts
              fta += gameHistory[i].fta
              ftm += gameHistory[i].ftm
              reb += gameHistory[i].reb
              stl += gameHistory[i].stl
              mins += Number(gameHistory[i].min)
            }
          }
          setStats({ast: (ast/gamesPlayed).toFixed(1), blk: (blk/gamesPlayed).toFixed(1), fgp: (fgm/fga).toFixed(2), fg3p: (fg3m/fg3a).toFixed(2), pts: (pts/gamesPlayed).toFixed(1), ftp: (ftm/fta).toFixed(2), fti: (ftm/pts).toFixed(2), reb: (reb/gamesPlayed).toFixed(1), stl: (stl/gamesPlayed).toFixed(1), mins: (mins/gamesPlayed).toFixed(1)
          })
        }
        
      }
    },[gameHistory])
  
    return (
      <div>
  
       
        <PlayerBanner displayComponents={displayComponents}teamLogoUrl ={teamLogo}playerInfo = {playerInfo} player ={player} search={search} setSearch={setSearch} searchPlayer ={searchPlayer} setYear = {setYear}/>
       
        {(displayComponents.current !== 0 && 
        <PlayerTable ast = {stats.ast} blk={stats.blk} fgp={stats.fgp} fg3p={stats.fg3p} pts={stats.pts} ftp={stats.ftp} fti={stats.fti} 
                     reb={stats.reb} stl={stats.stl} mins={stats.mins} height={player[0].height_feet + "'" + player[0].height_inches + "\""} 
                     weight ={player[0].weight_pounds} tdClass={tdClass}/>
        )} 
        {playerTable}
      </div>
    )
  }
  export default Home