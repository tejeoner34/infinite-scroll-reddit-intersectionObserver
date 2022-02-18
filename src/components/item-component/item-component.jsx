import React from "react"


export const Item = React.forwardRef((props, ref) =>{

    const thumbNailContainerStyle = {
        backgroundImage: `url("${props.data.data.thumbnail}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '140px',
        width: '140px',
        borderRadius: '50%'
    }

    
    return (
        <div ref={ref} className="items-page__item">
            <h3><a href={`https://www.reddit.com/${props.data.data.permalink}`} target="_blank" rel="noreferrer">{props.data.data.title}</a></h3>
            <div style={thumbNailContainerStyle}></div>
        </div>
    )
})