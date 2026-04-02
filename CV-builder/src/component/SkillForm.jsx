import { useEffect, useState } from 'react';
import Button from './button';
import Form from './Form';
import InputField from './Input';

const SkillForm = ({
  onSave,
  onCancel,
  initialData,
  mode = 'create',
  entries = [],
  activeEntryId,
  onSelectEntry,
}) => {
  const [skill, setSkill] = useState('');

  useEffect(() => {
    setSkill(initialData?.name ?? '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skill.trim()) return;

    onSave({
      name: skill.trim(),
    });
  };

  return (
    <section className="skill-form-section">
      <h2 className="cv-form-subtitle">{mode === 'edit' ? 'Edit Skill' : 'New Skill'}</h2>
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
                {entry.name || `Skill ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        <InputField
          className="cv-form-input"
          label="Skill"
          name="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="React, JavaScript, Node.js"
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

export default SkillForm;
