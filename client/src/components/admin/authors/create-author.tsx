import React, { useState } from "react"

function CreateAuthor() {
    const [author, setNmae] = useState("")
    const token: any = localStorage.getItem("authToken")

    function handleChange(event: any) {
        setNmae(event.target.value)
    }

    function createAuthor(event: any) {
        event.preventDefault()
       
        if (author.trim() != "") {
            const data: any = {
                "name": author
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
                <input type="text" value={author} onChange={handleChange} placeholder="Author Name" />
                <button onClick={createAuthor}>Create</button>
            </form>
        </div>
    )
}

export default CreateAuthor