import React from "react";
import { Link } from "react-router-dom";
import { BookAuthor } from "../../requests/book";
import { BOOKS } from "../../utils/urls";

interface Props {
  author: Array<any>;
  className: string;
}

export const AuthorList = ({ author, className }: Props) => (
  <div>
    {author.map((author: BookAuthor) => (
      <Link
        onClick={(event: any) => event.stopPropagation()}
        key={author.id + 1}
        className={className}
        to={{ pathname: BOOKS.urlTemplate, search: `?author=${author.id}` }}
      >
        {author.name}
      </Link>
    ))}
  </div>
);
