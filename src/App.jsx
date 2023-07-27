import "./global.css";
import { useEffect } from "react";
import { useState } from "react";
import s from "./style.module.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowAPI } from "./api/tv-show";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";

export function App (){

    const [currentTVShow, setCurrentTVShow] = useState();

    async function fetchPopulars(){
        const populars = await TVShowAPI.fetchPopulars();

        if (populars.length > 0 ){
            setCurrentTVShow(populars[0]);
        }
    }

    useEffect(()=>{
        fetchPopulars()
    }, [])

    console.log(currentTVShow);
    return (
        <div className={s.main_container} style={{  background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : `black` }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo image={logo} title={"Cyriz"} subtitle={"My personal series advisor"}/>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input className={s.search_bar} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommendations}>{currentTVShow && <TVShowListItem tvShow={currentTVShow} />}</div>
        </div>
    )
}