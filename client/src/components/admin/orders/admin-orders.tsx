import React, { Component } from "react"
// import Baner from "../../search-bar/search-bar"


class AdminOrder extends Component<any, { token: any, err: any, isLoaded: any, orders: any }> {
    constructor(props: any) {
        super(props)
        this.state = {
            token: localStorage.getItem("authToken"),
            err: null,
            isLoaded: false,
            orders: [],
        }
    }

    objLenght(obj: any) {
        let i = 0
        for (let key in obj) {
            i++
        }

        return i - 1
    }

    componentDidMount() {

        fetch("http://localhost:8800/order/admin", {
            headers: {
                "auth-token": this.state.token
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result
                    })

                },
                (err) => {
                    this.setState({
                        isLoaded: true,
                        err
                    })
                }
            )
    }

    render() {
        const { error, isLoaded }: any = this.state
        const list: any = []

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        if (!error && isLoaded) {

            for (let i = 0; i <= this.objLenght(this.state.orders); i++) {

                list.push(
                    <tr className="tr" key={i} >
                        <td className="td">{i + 1}</td>
                        <td className="td">{this.state.orders[i].items["printing_editions_id"]}</td>
                        <td className="td">{this.state.orders[i].items["count"]}</td>
                        <td className="td">{this.state.orders[i].user_id}</td>
                        <td className="td">{this.state.orders[i].date}</td>
                    </tr>
                )
            }
        }
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th className="title">Number</th>
                        <th className="title">Book name</th>
                        <th className="title">Count</th>
                        <th className="title">user Id</th>
                        <th className="title">data</th>
                        {/* <th className="title">payment info</th> */}
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        )
    }
}

export default AdminOrder