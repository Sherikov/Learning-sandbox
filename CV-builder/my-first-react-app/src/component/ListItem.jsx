const ListItem = ({ sectionId, title, content, action }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  const items = Array.isArray(content)
    ? content
    : [
        {
          id: sectionId,
          name: content,
        },
      ];

  return (
    <section className="doc-section-block">
      <div className="doc-section-heading">
        <h4 className="main-info-title">{title}</h4>
        {action}
      </div>
      <ul className={`${sectionId} ul-item`}>
        {items.map((item) => (
          <li key={item.id ?? item.name} className={`${sectionId}-item list-item`}>
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ListItem;
