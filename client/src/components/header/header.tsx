import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../utils/storage";
import { Shoping } from "../Shoping/Shoping";
import { BOOKS } from "../../utils/urls";
import { Auth } from "../";
import { getBookStorage, removeToken } from "../../utils/storage";
import "./style.css";

export const Header = () => {
  const history = useHistory();
  const [openLogin, setOpenLogin] = useState(false);
  const [openShoping, setOpenShoping] = useState(false);

  return (
    <header className="header">
      {openLogin && <Auth closePopup={() => setOpenLogin(false)} />}
      {openShoping && <Shoping clousePopup={() => setOpenShoping(false)} />}
      <div className="logotype" onClick={() => history.push(BOOKS.urlTemplate)}>
        <img src="/img/logo.png" alt="logo" />
      </div>
      <div className="for-user">
        {!getToken() ? (
          <button onClick={() => setOpenLogin(true)}>
            <p>Login</p>
          </button>
        ) : (
          <button onClick={() => removeToken()}>
            <img src="/img/user.png" alt="user" />
          </button>
        )}
        <div className="shoppingConteiner" onClick={() => setOpenShoping(true)}>
          <div className="count">{getBookStorage().length}</div>
          <img src="/img/shoppingCart.png" alt="shooping" />
        </div>
      </div>
    </header>
  );
};

// class Header extends Component<any, { showPopup: any, url: any, countBook: any, dispatch: any }> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             showPopup: false,
//             url: 'http://localhost:8800/books/sort',
//             countBook: localStorage.getItem('book'),
//             dispatch: this.props.dispatch
//         };
//         this.handleClick = this.handleClick.bind(this)
//     }

//     objLenght(obj: any) {
//         let i = 0
//         for (let key in obj) {
//             i++
//         }
//         return i
//     }

//     togglePopup() {
//         this.setState({
//             showPopup: !this.state.showPopup
//         });
//     }

//     handleLogout = (event: any) => {
//         event.preventDefault()

//         localStorage.clear();
//     }

//     handleClick = (event: any) => {
//         this.props.updateData(event.target.innerHTML)
//     }

//     render() {
//         let bookStorage: any = localStorage.getItem('book')
//         let bookJson = JSON.parse(bookStorage)

//         return (
//             <div>
//                 {this.state.showPopup ?
//                     <Signin closePopup={this.togglePopup.bind(this)} /> : null}
//                 <div className="header">
//                     <div className="logotype">
//                         <img src={logo} alt="logo" />
//                     </div>
//                     {this.props.role == "admin" ?
//                         <div className="admin-root"  >
//                             <nav>
//                                 <ul>
//                                     <li><Link to="/adminBook" >Book</Link></li>
//                                     <li><Link to="/adminAuthor">Author</Link></li>
//                                     <li><Link to="/adminUser">Users</Link></li>
//                                     <li><Link to="/adminOrder">Orders</Link></li>
//                                 </ul>
//                             </nav>
//                         </div> : null}
//                     <div className="for-user">
//                         <button onClick={this.togglePopup.bind(this)} >
//                             <a >Login</a>
//                         </button>
//                         <button onClick={this.handleLogout}>
//                             <img src={user} alt="user" />
//                         </button>
//                         <Link to="/shoping" >
//                             {bookJson === null ?
//                             <div className="count">0</div>:
//                             <div className="count">{bookJson?.length}</div>
//                             }
//                             <img src={shopping} alt="shooping" />
//                         </Link>
//                     </div>
//                 </div>
//             </div >
//         )
//     }
// }

// const mapStateToProps = (state: any) => ({
//     count: state.count,
//     role: state.role,
//     shopping: state.shoping
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     dispatch
// });

export default Header;
