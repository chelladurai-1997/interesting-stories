interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => (
  <p className="  mt-2 text-[#ffd700]">{text}</p>
);

export default Paragraph;
