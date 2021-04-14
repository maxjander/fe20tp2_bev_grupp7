import  {useEffect, useState} from 'react';


const CardPresentation = ({card}) => {

    const [apiCard, setApiCard] = useState(null)
    const [loading, setLoading] = useState(true)

useEffect(()=> {
setLoading(true)
fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${card.cardId}`)
.then(res => res.json())
.then(res => setApiCard(res.data[0]))
.then(setLoading(false))
}, []
)
    console.log(apiCard)

    
    return (<>
    <h1>{card.cardId}</h1> 
    {apiCard && 
    <>
    <h1>{apiCard.name}</h1>
    
    <img src={apiCard.card_images[0].image_url_small} />
    </>
    }
    </>
    )
}

export default CardPresentation;