import React from "react";
import { Link } from "react-router-dom";
import { BookAuthor } from "../../requests/book";

interface Props {
  author: Array<any>;
}

export const AuthorList = ({ author }: Props) => (
  <div>
    {author.map((author: BookAuthor) => (
      <Link key={author.id} to={`/${author.id}`}>
        {author.name}
      </Link>
    ))}
  </div>
);
