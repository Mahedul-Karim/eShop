export const generateUniqeId = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};

export const setHighlighText = (text, highlight) => {
  const textArray = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {textArray.map((txt, i) =>
        txt.toLowerCase() === highlight.toLowerCase() ? (
          <span className="text-primary" key={i}>
            {txt}
          </span>
        ) : (
          <span key={i}>{txt}</span>
        )
      )}
    </>
  );
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
