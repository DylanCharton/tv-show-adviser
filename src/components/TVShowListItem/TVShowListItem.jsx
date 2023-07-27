import { SMALL_IMG_COVER_BASE_URL } from "../../config";
import s from "./style.module.css";

export function TVShowListItem({tvShow}){
    return <div className={s.container}>
        <img alt={tvShow.name} class={s.img} src={SMALL_IMG_COVER_BASE_URL+tvShow.backdrop_path} alt="" />
        <div className={s.title}>
            {tvShow.name}
        </div>
    </div>
}