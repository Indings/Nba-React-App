import React from 'react'
import {useEffect} from 'react'
export const SearchForm = ({search, setSearch,searchPlayer,setYear}) => {

    //allows for search after pressing enter
    function handleKeyPress(e){
        if(e.key === "Enter"){
            searchPlayer(search)
            e.preventDefault()
        }
    }
    
    useEffect (() =>{
        var month = new Date().getMonth()
        var max = new Date().getFullYear()
        //account for nba season starting in early september
        if(!(month == 8 || month == 9 || month == 10 || month == 11 || month == 12)){
            max -= 1
        }
        var min = 1946
        var select = document.getElementById('dropdownYear')

        for (var i = max; i >= min; i--) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    },[]) 

    return(
        <>
            <form>
                <input className="search"  placeholder="enter a player's name " id="searchbar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress}/>
                <select className="dropdown" id="dropdownYear" onChange={(e) => setYear(e.target.value)}/>
            </form>
            <button onClick={() => searchPlayer(search)}>Search</button>
        </>
    )
}