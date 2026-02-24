import katex from "katex";

interface Part {
  type: "text" | "math";
  content: string;
}

function parse(text: string): Part[] {
  const parts: Part[] = [];
  const re = /\$([^$]+)\$/g;
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", content: text.slice(last, match.index) });
    }
    parts.push({ type: "math", content: match[1] });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push({ type: "text", content: text.slice(last) });
  }
  return parts;
}

export default function LatexText({ text }: { text: string }) {
  const parts = parse(text);
  return (
    <>
      {parts.map((part, i) =>
        part.type === "math" ? (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part.content, { throwOnError: false }),
            }}
          />
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </>
  );
}
