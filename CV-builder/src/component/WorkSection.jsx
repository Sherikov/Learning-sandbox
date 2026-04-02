const Section = ({ title, action, children }) => {
  if (!children) return null;

  return (
    <div className="additional-info doc-section-block">
      <div className="doc-section-heading">
        <h4 className="additional-info-title">{title}</h4>
        {action}
      </div>
      <hr className="section-divider" />
      {children}
    </div>
  );
};

export default Section;
