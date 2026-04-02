import Icon from '@mdi/react';
import { mdiPhone } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import { useRef, useState } from 'react';
import Form from './Form';
import InputField from './Input';
import Button from './button';
import ListItem from './ListItem';
import ExperienceItem from './Experience';
import Section from './WorkSection';
import Info from './InfoText';
import EducationForm from './EducationForm';
import WorkForm from './WorkForm';
import SkillForm from './SkillForm';

const CvBuilder = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [isEduFormVisible, setIsEduFormVisible] = useState(false);
  const [isWorkFormVisible, setIsWorkFormVisible] = useState(false);
  const [workList, setWorkList] = useState([]);
  const [isSkillFormVisible, setIsSkillFormVisible] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editingWorkId, setEditingWorkId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const cvRef = useRef(null);
  const personalFormRef = useRef(null);
  const educationFormRef = useRef(null);
  const workFormRef = useRef(null);
  const skillFormRef = useRef(null);

  const focusForm = (ref) => {
    window.requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      ref.current?.querySelector('input')?.focus();
    });
  };

  const openPersonalEditor = () => {
    focusForm(personalFormRef);
  };

  const openNewEducationForm = () => {
    setEditingEducationId(null);
    setIsEduFormVisible(true);
    focusForm(educationFormRef);
  };

  const openEducationEditor = () => {
    if (educationList.length === 0) return;

    setEditingEducationId(educationList[educationList.length - 1].id);
    setIsEduFormVisible(true);
    focusForm(educationFormRef);
  };

  const openNewWorkForm = () => {
    setEditingWorkId(null);
    setIsWorkFormVisible(true);
    focusForm(workFormRef);
  };

  const openWorkEditor = () => {
    if (workList.length === 0) return;

    setEditingWorkId(workList[workList.length - 1].id);
    setIsWorkFormVisible(true);
    focusForm(workFormRef);
  };

  const openNewSkillForm = () => {
    setEditingSkillId(null);
    setIsSkillFormVisible(true);
    focusForm(skillFormRef);
  };

  const openSkillEditor = () => {
    if (skillList.length === 0) return;

    setEditingSkillId(skillList[skillList.length - 1].id);
    setIsSkillFormVisible(true);
    focusForm(skillFormRef);
  };

  const handleCloseEducationForm = () => {
    setIsEduFormVisible(false);
    setEditingEducationId(null);
  };

  const handleCloseWorkForm = () => {
    setIsWorkFormVisible(false);
    setEditingWorkId(null);
  };

  const handleCloseSkillForm = () => {
    setIsSkillFormVisible(false);
    setEditingSkillId(null);
  };

  const handleSaveEducation = (educationData) => {
    if (editingEducationId) {
      setEducationList((currentEducation) =>
        currentEducation.map((education) =>
          education.id === editingEducationId ? { ...education, ...educationData } : education
        )
      );
    } else {
      setEducationList((currentEducation) => [
        ...currentEducation,
        { id: crypto.randomUUID(), ...educationData },
      ]);
    }

    handleCloseEducationForm();
  };

  const handleSaveWork = (workData) => {
    if (editingWorkId) {
      setWorkList((currentWork) =>
        currentWork.map((work) =>
          work.id === editingWorkId ? { ...work, ...workData } : work
        )
      );
    } else {
      setWorkList((currentWork) => [...currentWork, { id: crypto.randomUUID(), ...workData }]);
    }

    handleCloseWorkForm();
  };

  const handleSaveSkill = (skillData) => {
    if (editingSkillId) {
      setSkillList((currentSkills) =>
        currentSkills.map((skill) =>
          skill.id === editingSkillId ? { ...skill, ...skillData } : skill
        )
      );
    } else {
      setSkillList((currentSkills) => [...currentSkills, { id: crypto.randomUUID(), ...skillData }]);
    }

    handleCloseSkillForm();
  };

  const handleExportPdf = () => {
    if (!cvRef.current) return;

    const printWindow = window.open('', '_blank', 'width=900,height=1200');

    if (!printWindow) {
      window.alert('Please allow pop-ups to export the CV as PDF.');
      return;
    }

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');
    const fileName = [firstName, secondName, 'CV'].filter(Boolean).join('-') || 'CV';

    printWindow.document.write(`
      <html>
        <head>
          <title>${fileName}</title>
          ${styles}
          <style>
            @page {
              size: A4;
              margin: 12mm;
            }

            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }

            .cv-doc {
              margin: 0;
              padding: 0;
              height: auto;
              background: #ffffff;
              border: none;
              box-shadow: none;
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
            }

            .doc {
              width: 100%;
              max-width: none;
              min-height: auto;
              height: auto;
              border-radius: 0;
              box-shadow: none;
              margin: 0 auto;
            }

            .cv-edit-btn {
              display: none;
            }
          </style>
        </head>
        <body>
          ${cvRef.current.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  const renderEditButton = (label, onClick) => (
    <button type="button" className="cv-edit-btn" onClick={onClick} aria-label={label} title={label}>
      <Icon path={mdiPencil} size={0.7} />
    </button>
  );

  const activeEducation = educationList.find((education) => education.id === editingEducationId);
  const activeWork = workList.find((work) => work.id === editingWorkId);
  const activeSkill = skillList.find((skill) => skill.id === editingSkillId);

  return (
    <>
      <div className="cv-form">
        <h1 className="cv-form-title">CV Form</h1>
        <div ref={personalFormRef}>
          <h2 className="cv-form-subtitle">Personal Information</h2>
          <Form className="cv-form-personal-info form">
            <InputField
              label="First Name"
              type="text"
              placeholder="First Name"
              className="cv-form-input"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              type="text"
              placeholder="Last Name"
              className="cv-form-input"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
            <InputField
              label="Email"
              type="email"
              placeholder="email@domain.com"
              className="cv-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Icon className="icon-input" path={mdiEmail} size={1} />}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="Phone Number"
              className="cv-form-input"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Icon className="icon-input" path={mdiPhone} size={1} />}
            />
            <InputField
              label="Position"
              type="text"
              placeholder="e.g. Fullstack Developer"
              className="cv-form-input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form>
        </div>

        {isEduFormVisible && (
          <div ref={educationFormRef}>
            <EducationForm
              onSave={handleSaveEducation}
              onCancel={handleCloseEducationForm}
              initialData={activeEducation}
              mode={editingEducationId ? 'edit' : 'create'}
              entries={educationList}
              activeEntryId={editingEducationId}
              onSelectEntry={setEditingEducationId}
            />
          </div>
        )}
        {isWorkFormVisible && (
          <div ref={workFormRef}>
            <WorkForm
              onSave={handleSaveWork}
              onCancel={handleCloseWorkForm}
              initialData={activeWork}
              mode={editingWorkId ? 'edit' : 'create'}
              entries={workList}
              activeEntryId={editingWorkId}
              onSelectEntry={setEditingWorkId}
            />
          </div>
        )}
        {isSkillFormVisible && (
          <div ref={skillFormRef}>
            <SkillForm
              onSave={handleSaveSkill}
              onCancel={handleCloseSkillForm}
              initialData={activeSkill}
              mode={editingSkillId ? 'edit' : 'create'}
              entries={skillList}
              activeEntryId={editingSkillId}
              onSelectEntry={setEditingSkillId}
            />
          </div>
        )}

        <div className="cv-form-actions">
          {!isEduFormVisible && (
            <Button className="cv-form-btn" text="[+] Add Education" onClick={openNewEducationForm} />
          )}
          {!isWorkFormVisible && (
            <Button className="cv-form-btn" text="[+] Add Work Experience" onClick={openNewWorkForm} />
          )}
          {!isSkillFormVisible && (
            <Button className="cv-form-btn" text="[+] Add Skill" onClick={openNewSkillForm} />
          )}
          <Button type="button" className="cv-form-btn" text="Submit" onClick={handleExportPdf} />
        </div>
      </div>

      <div className="cv-doc" ref={cvRef}>
        <div className="doc">
          <div className="header">
            <div className="header-top">
              <div className="header-text">
                <Info className="fullName" text={firstName + ' ' + secondName} tag="h1"></Info>
                <Info className="position" text={position} tag="h2"></Info>
              </div>
              {renderEditButton('Edit personal information', openPersonalEditor)}
            </div>
          </div>

          <div className="main-info">
            <section className="doc-section-block">
              <h3 className="main-info-title">Phone Number</h3>
              <Info tag="a" className="phone-number" text={phone}></Info>
            </section>
            <section className="doc-section-block">
              <h4 className="main-info-title">Email</h4>
              <Info tag="a" className="email" text={email}></Info>
            </section>

            {educationList.length > 0 && (
              <section className="doc-section-block">
                <div className="doc-section-heading">
                  <h4 className="main-info-title">Education</h4>
                  {renderEditButton('Edit education', openEducationEditor)}
                </div>
                <ul className="education ul-item">
                  {educationList.map((education) => (
                    <li key={education.id} className="education-item list-item">
                      <strong>{education.title}</strong>
                      <div>{education.degree}</div>
                      <div>Graduation Year: {education.graduationYear}</div>
                      <div>GPA: {education.gpa}</div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ListItem
              sectionId="skills"
              title="Skills"
              content={skillList}
              action={skillList.length > 0 ? renderEditButton('Edit skills', openSkillEditor) : null}
            />
          </div>

          {workList.length > 0 && (
            <Section title="Work History" action={renderEditButton('Edit work history', openWorkEditor)}>
              {workList.map((work) => (
                <ExperienceItem
                  key={work.id}
                  role={work.position}
                  company={work.title}
                  startDate={work.startDate}
                  endDate={work.endDate}
                  tasks={work.job}
                />
              ))}
            </Section>
          )}
        </div>
      </div>
    </>
  );
};

export default CvBuilder;
