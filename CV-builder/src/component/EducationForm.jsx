import { useEffect, useState } from 'react';
import InputField from './Input';
import Form from './Form';
import Button from './button';

const EducationForm = ({
  onSave,
  onCancel,
  initialData,
  mode = 'create',
  entries = [],
  activeEntryId,
  onSelectEntry,
}) => {
  const [title, setTitle] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [gpa, setGpa] = useState('');

  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setDegree(initialData?.degree ?? '');
    setGraduationYear(initialData?.graduationYear ?? '');
    setGpa(initialData?.gpa ?? '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !degree.trim() || !graduationYear.trim() || !gpa.trim()) return;

    onSave({
      title: title.trim(),
      degree: degree.trim(),
      graduationYear: graduationYear.trim(),
      gpa: gpa.trim(),
    });
  };

  return (
    <section className="education-form-section">
      <h2 className="cv-form-subtitle education-form-title">
        {mode === 'edit' ? 'Edit Education' : 'New Education'}
      </h2>
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
                {entry.title || `Education ${index + 1}`}
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
          placeholder="University or school name"
          required
        />
        <InputField
          className="cv-form-input"
          label="Degree"
          name="degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Bachelor, Master, etc."
          required
        />
        <InputField
          className="cv-form-input"
          label="Graduation Year"
          name="graduationYear"
          type="number"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          placeholder="2026"
          required
        />
        <InputField
          className="cv-form-input"
          label="GPA"
          name="gpa"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          placeholder="3.9"
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

export default EducationForm;
