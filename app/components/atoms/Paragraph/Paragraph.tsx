interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => (
  <p className="text-white mt-4">{text}</p>
);

export default Paragraph;
