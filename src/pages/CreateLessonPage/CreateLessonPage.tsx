import { useNavigate } from 'react-router-dom';
import './CreateLessonPage.css';

const CreateLessonPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { name, date, type } = Object.fromEntries(formData);

    const lessonRequest = {
      name,
      date,
      type,
    };

    try {
      const response = await fetch('/api/lessons/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(lessonRequest),
      });

      if (response.status == 200) {
        const data = await response.json();

        console.log('Lesson created successfully:', data);

        navigate('/classes');
      } else {
        throw new Error(`Failed to create lesson. Status code: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error creating lesson:', error.message);
      }
    }
  };

  return (
    <div className="create-lesson-page">
      <div className="create-lesson-page__card">
        <h1 className="create-lesson-page__title">Create Lesson</h1>

        <form className="create-lesson-page__form" onSubmit={handleSubmit}>
          <div className="create-lesson-page__form-group">
            <label className="create-lesson-page__form-label">
              NameLesson
              <input name="name" className="create-lesson-page__form-input" />
            </label>
          </div>

          <div className="create-lesson-page__form-group">
            <label className="create-lesson-page__form-label">
              Date
              <input name="date" className="create-lesson-page__form-input" />
            </label>
          </div>

          <div className="create-lesson-page__form-group">
            <label className="create-lesson-page__form-label">
              TypeLes
              <input name="type" className="create-lesson-page__form-input" />
            </label>
          </div>

          <button type="submit" className="create-lesson-page__form-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLessonPage;

/*NameLesson string json:"name"
  Date       string json:"date"
  TypeLes    string json:"type"
  IsActive   bool   json:"isActive"
  TeacherId  int    json:"teacherId"*/
