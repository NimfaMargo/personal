import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Questions = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const questions = await axios.get('/api/fetch-content');
      setData(questions.data);
    } catch (err) {
      console.error('err', error);
      setError('Error fetching questions.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Questions</h1>

      {data?.map((question: { content: string; title: string }) => {
        const sanitizedHTML = DOMPurify.sanitize(question.content);
        return (
          <>
            <h2>{question.title}</h2>
            <div key={question.title} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          </>
        );
      })}
    </div>
  );
};

export default Questions;
