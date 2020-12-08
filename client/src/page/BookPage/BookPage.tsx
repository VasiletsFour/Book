import React from "react";
import { MainLayout } from "../../layout";
import { Book } from "../../components/book/Book";

export const BookPage = () => {
  return (
    <MainLayout>
      <Book />
    </MainLayout>
  );
};
