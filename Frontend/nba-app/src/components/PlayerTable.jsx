import React, { useEffect, useState } from 'react'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from '@mui/material'



export const PlayerTable = ({ast,blk,fgp,fg3p,pts,ftp,fti,reb,stl,mins,height,weight,tdClass}) =>{

    const [colorClass,setColorClass] = useState({
        tdClass: "tddark",
        tableClass: "tabledark",
        mainStatClass: "mainstatdark"
    })

    useEffect (()=>{
        if(tdClass == "#242424"){
            let colorclass = {
                tdClass: "tddark",
                tableClass: "tabledark",
                mainStatClass: "mainstatdark"
            }
           setColorClass(colorclass)
        }else{
            let colorclass = {
                tdClass: "tdlight",
                tableClass: "tablelight",
                mainStatClass: "mainstatlight"
            }
            setColorClass(colorclass)
        }

    },[tdClass])


    return (
        <div className="tableContainer">
            <table className={colorClass.tdClass.tableClass}>
                <tr>
                    <td className={colorClass.tdClass} rowSpan="2"></td>
                    <td className={colorClass.mainStatClass} rowSpan="2">PPG<br/>{pts}</td>
                    <td className={colorClass.mainStatClass} rowSpan="2">APG<br/>{ast}</td>
                    <td className={colorClass.mainStatClass} rowSpan="2">REB<br/>{reb}</td>
                    <td className={colorClass.mainStatClass} rowSpan="2">BLK<br/>{blk}</td>
                    <td className={colorClass.tdClass}> HEIGHT<br/>{height}</td>
                    <td className={colorClass.tdClass}> WEIGHT<br/>{weight} lbs</td>
                    <td className={colorClass.tdClass}> FG%<br/>{fgp}</td>
                    <td className={colorClass.tdClass}> 3PT FG%<br/>{fg3p}</td>
                    <td className={colorClass.tdClass} rowSpan="2"></td>
                </tr>
                <tr>
                    <td className={colorClass.tdClass}>STL<br/>{stl}</td>
                    <td className={colorClass.tdClass}>MINS<br/>{mins}</td>
                    <td className={colorClass.tdClass}>FT%<br/>{ftp}</td>
                    <td className={colorClass.tdClass}>FTI<br/>{fti}</td>
                </tr>
            </table> 
        </div>

    )
}