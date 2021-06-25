/** @jsxImportSource theme-ui */
import { format, parseISO } from "date-fns";
import { Flex, Link } from "theme-ui";

export default function RecentFilms({ films }) {
  const items = films.slice(0, 5).map((film) => ({
    date: film.date.watched,
    title: film.film.title,
    year: film.film.year,
    rating: film.rating.text,
    url: film.uri,
  }));

  return (
    <ul
      sx={{
        listStyleType: "none",
        fontSize: 1,
        fontWeight: 200,
        color: "altText",
        px: 0,
        py: 4,
      }}
    >
      <h3
        sx={{
          fontSize: 2,
          fontWeight: "heading",
          color: "secondaryText",
          mb: 6,
        }}
      >
        recent log 📽️
      </h3>
      {items.map((item, i) => (
        <li key={i}>
          <Flex sx={{ flexDirection: "column", mb: 7 }}>
            <Flex>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: [1, 2],
                  fontWeight: 200,
                  mb: 3,
                  textDecoration: "none",
                  color: "text",
                }}
              >
                {item.title}
              </Link>
              <p sx={{ fontSize: 0, m: 0, ml: "auto" }}>{item.rating}</p>
            </Flex>
            <Flex>
              <p sx={{ fontSize: 1, fontWeight: 300, m: 0, color: "altText" }}>
                {item.year}
              </p>
              <p sx={{ fontSize: 0, m: 0, ml: "auto" }}>
                {format(parseISO(item.date), "MMM dd")}
              </p>
            </Flex>
          </Flex>
        </li>
      ))}
    </ul>
  );
}
