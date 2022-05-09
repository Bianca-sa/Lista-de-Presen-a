import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
    return setStudentName('');
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/Bianca-sa');
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença {studentName}</h1>

        <div>
          <strong>Bianca</strong>
          <img src='https://github.com/Bianca-sa.png' alt='Foto de perfil' />
        </div>
      </header>
      <input
        type='text'
        placeholder='Digite seu nome...'
        onChange={(e) => setStudentName(e.target.value)}
        value={studentName}
      />
      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}