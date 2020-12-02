import React, { useState } from "react"
import {DebounceInput} from 'react-debounce-input';
import "./style.css"

function Baner (props:any) {
    const [name, setNmae] = useState("")
    
    function search(event:any){
        setNmae(event.target.value)

        const token:any = localStorage.getItem("authToken")    
        let data: object = {
            "word": event.target.value,
            "type": "name",
            "int": 1
        }

        fetch(props.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(data),
        })
            .then((response:any) => response.json())
            .then((data:any) => {
                props.dataFoo(data)
            })
            .catch((error:any) => {
                console.log(error)
            });
    }

        return (
            <div className="conteiner">
                <p>Home/ {props.page}</p>
                <form>
                    <DebounceInput debounceTimeout={3000} type="text" placeholder="search" value={name} onChange={search}  />
                </form>
                
            </div>
        )
    
}


export default Baner