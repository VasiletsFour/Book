import React, { useState } from "react"

function CreateBook() {
    const [name, setNmae] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [currency, setCurrency] = useState("")
    const [author, setAuthor] = useState("")
    
    const token: any = localStorage.getItem("authToken")

    function handleChange(event: any) {
        setNmae(event.target.value)
    }

    function createBook(event: any) {
        event.preventDefault()

        if (name.trim() != "") {
            const data: any = {
                "name": name,
                "description": description,
                "type":type,
                "price":price,
                "currency": currency,
                "author": author
            }

            fetch("http://localhost:8800/admin/createAuthor", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                }, body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(
                    (data) => {

                        console.log(data)
                    },
                    (err) => {
                        console.log(err)
                    }
                )
        }
    }
    return (
        <div>
            <form>
                <input type="text" value={name} onChange={handleChange} placeholder="Author Name" />
                <input type="text" value={description} onChange={handleChange} placeholder="Author Name" />
                <input type="text" value={type} onChange={handleChange} placeholder="Author Name" />
                <button onClick={createBook}>Create</button>
            </form>
        </div>
    )
}

export default CreateBook