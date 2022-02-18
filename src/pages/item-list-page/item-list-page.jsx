import { useRef } from "react"
import { useState, useEffect } from "react"
import { Item } from "../../components/item-component/item-component"
import './style.css'


export default function ItemListPage() {

    const [after, updateAfter] = useState('')
    const [itemsList, setItemsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const lastItemRef = useRef()

    useEffect(() => {

        setIsLoading(true)

        fetch(`https://www.reddit.com/r/aww.json?after=${after}`)
            .then(r => r.json())
            .then(d => {
                updateAfter(d.data.after)
                setItemsList(oldvalue => oldvalue.concat(d.data.children))
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (lastItemRef.current !== undefined) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading) {

                    setIsLoading(true)

                    fetch(`https://www.reddit.com/r/aww.json?after=${after}`)
                        .then(r => r.json())
                        .then(d => {
                            updateAfter(d.data.after)
                            setItemsList(oldvalue => oldvalue.concat(d.data.children))
                            setIsLoading(false)
                        })
                }
            }, {
                rootMargin: '100px'
            })
            observer.observe(lastItemRef.current)
            return () => observer.disconnect()
        }
    })



    return (
        <div className="items-page">
            <div className="items-container">
                {
                    itemsList.map((e, index) => {
                        if (index === itemsList.length - 1) {
                            return <Item ref={lastItemRef} key={index} data={e}></Item>
                        } else {
                            return <Item key={index} data={e}></Item>
                        }
                    })
                }
            </div>
            {
                isLoading ?
                    <h3 className="loading-message">Loading content...</h3>
                    :
                    null
            }
        </div>
    )
}