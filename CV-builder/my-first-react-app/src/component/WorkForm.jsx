import { useEffect, useState } from 'react';
import InputField from './Input';
import Form from './Form';
import Button from './button';

const WorkForm = ({
  onSave,
  onCancel,
  initialData,
  mode = 'create',
  entries = [],
  activeEntryId,
  onSelectEntry,
}) => {
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setPosition(initialData?.position ?? '');
    setStartDate(initialData?.startDate ?? '');
    setEndDate(initialData?.endDate ?? '');
    setJob(initialData?.job ?? '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !position.trim() || !startDate.trim() || !endDate.trim() || !job.trim()) return;

    onSave({
      title: title.trim(),
      position: position.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      job: job.trim(),
    });
  };

  return (
    <section className="work-form-section">
      <h2 className="cv-form-subtitle">{mode === 'edit' ? 'Edit Work Experience' : 'New Work Experience'}</h2>
      <Form onSubmit={handleSubmit} className="form education-form-grid">
        {mode === 'edit' && entries.length > 1 && (
          <div className="form-entry-switcher">
            {entries.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                className={`form-entry-chip${entry.id === activeEntryId ? ' is-active' : ''}`}
                onClick={() => onSelectEntry?.(entry.id)}
              >
                {entry.title || entry.position || `Work ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        <InputField
          className="cv-form-input"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Company name"
          required
        />
        <InputField
          className="cv-form-input"
          label="Position"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position at previous company"
          required
        />
        <InputField
          className="cv-form-input"
          label="Start Date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start of work at company"
          required
        />
        <InputField
          className="cv-form-input"
          label="End Date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End of work at company"
          required
        />
        <InputField
          className="cv-form-input"
          label="Job"
          name="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Your responsibilities in this company"
          required
        />

        <div className="form-buttons">
          <Button
            type="submit"
            className="cv-form-btn"
            text={mode === 'edit' ? 'Save Changes' : 'Save'}
          />
          <Button type="button" className="cv-form-btn" text="Cancel" onClick={onCancel} />
        </div>
      </Form>
    </section>
  );
};

export default WorkForm;
