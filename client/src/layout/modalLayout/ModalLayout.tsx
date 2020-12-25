import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";

const root: any = document.getElementById("root");
const modalRoot: any = document.getElementById("modal-root");

interface Props {}

export class ModalLayout extends React.Component {
  el: HTMLDivElement;
  opacity: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement("div");
    this.el.classList.add("modal", "modal_default");
    this.opacity = document.createElement("div");
    this.opacity.classList.add("modalOpacity");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    root.classList.add("preventScroll");
    this.el.appendChild(this.opacity);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    root.classList.remove("preventScroll");
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
