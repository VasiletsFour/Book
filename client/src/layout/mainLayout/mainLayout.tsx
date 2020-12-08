import React from "react";
import { Footer, Header } from "../../components";
import "./style.css";

interface Props {
  children: JSX.Element;
}

export const MainLayout = ({ children }: Props) => (
  <div className="mainLayout">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
