const ExperienceItem = ({ role, company, startDate, endDate, tasks }) => {
  return (
    <div className="work-position">
      <h5 className="work-position-item">
        {role} at {company} ({startDate} - {endDate})
      </h5>
      <p>{tasks}</p>
    </div>
  );
};

export default ExperienceItem;
