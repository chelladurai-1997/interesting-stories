import Link from "next/link";

type TitleProps = {
  text: string;
  highlightedText?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Title: React.FC<TitleProps> = ({ text, highlightedText, level = 1 }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Link href="/">
      <Tag className={`text-${level * 4}xl font-bold text-white`}>
        {text}
        {highlightedText && (
          <>
            <br />
            <b className="text-yellow-300">{highlightedText}</b>
          </>
        )}
      </Tag>
    </Link>
  );
};

export default Title;
