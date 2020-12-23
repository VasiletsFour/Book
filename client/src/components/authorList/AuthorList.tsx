import React from "react";
import { Link } from "react-router-dom";
import { BookAuthor } from "../../requests/book";

interface Props {
  author: Array<any>;
  className: string;
}

export const AuthorList = ({ author, className }: Props) => (
  <div>
    {author.map((author: BookAuthor) => (
      <Link key={author.id + 1} className={className} to={`/${author.id}`}>
        {author.name}
      </Link>
    ))}
  </div>
);
