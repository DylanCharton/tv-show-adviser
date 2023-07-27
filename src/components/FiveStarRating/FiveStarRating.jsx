import s from "./style.module.css";
import { StarFill, Star, StarHalf } from "react-bootstrap-icons"



export function FiveStarRating({rating}){
    // Declare an array of star
    const starList = [];
    // Use the round part of the rating to get the number of full stars
    const starFillCount = Math.floor(rating)
    // If the float part is superior or equal to 0.5 I want to display a half star
    const hasStarHalf = rating - starFillCount >= 0.5 ;
    // The number total of stars minus the full stars minus 1 or 0 (there can't be more than 1 half star)
    const emptyStars = 5 - starFillCount - (hasStarHalf ? 1 : 0);

    // Now I push the components of the library in the table initialized previously. Putting a key is important (has to be unique)
    for(let i = 1 ; i <= starFillCount ; i++){
        starList.push(<StarFill key={"star-fill" + i}/>)
    }

    if(hasStarHalf){
        starList.push(<StarHalf key={"star-half"}/>)
    }

    for(let i = 1 ; i <= emptyStars ; i++){
        starList.push(<Star key={"star-empty" + i}/>)
    }


    return <>
        <div>
            {starList}
        </div>
    </>
}