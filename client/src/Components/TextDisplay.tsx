// Component to display and edit text
const TextDisplay = ({ text }: { text: string }) => {
  return (
    <p
      role="textbox"
      style={{
        display: "flex",
        textAlign: "center",
        fontSize: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text}
    </p>
  );
};

export default TextDisplay;
