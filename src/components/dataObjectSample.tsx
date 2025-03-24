import { Checkbox, Link } from "@gravity-ui/uikit";
//компонент-макет для использования в таблице

export const Sample = (id, nm, desc, dateTime, rating, picLink, place, cords, status) => {
    return {
        id: id,
        name: nm,
        desc: desc,
        dateTime: dateTime,
        rating: rating,
        picture: <div style={{width:'100%', height:0, paddingBottom:'100%'}}><img style={{width:'100%'}} src={picLink}></img></div>,
        placeText: place,
        coordinates: cords,
        mapLink: <Link href={`https://www.google.com/maps/place/${cords}`}>Тыкни меня</Link> ,
        status: <Checkbox>{status}</Checkbox>
    };
}