const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: "14px",
        color: "#555",
      }}
    >
      &copy; {new Date().getFullYear()} Tea Shop.
    </footer>
  );
};

export default Footer;
