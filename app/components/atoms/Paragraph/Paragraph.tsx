interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => (
  <p className="  mt-2 animate-smooth-color">{text}</p>
);

export default Paragraph;
