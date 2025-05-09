import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import CardContent from './components/CardContent';
import Label from './components/Label.jsx';
import priorityImg from './assets/priority.png';
import followUpImg from './assets/followUp.png';
import councilDiscussionImg from './assets/councilDiscussion.png';
import managementDiscussionImg from './assets/managementDiscussion.png';
import studentsAffectedImg from './assets/studentsAffected.png';
import potentialSolutionsImg from './assets/potentialSolutions.png';
import solvedImg from './assets/solved.png';

function ProblemLifecycleTracker() {

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.DATABASE_CONNECTION_URL);
      const data = await res.json();
      setProblems(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterSolved, setFilterSolved] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    councilDiscussed: false,
    councilDate: '',
    potentialSolutions: '',
    affectedStudents: 0,
    priority: 'Low',
    managementDiscussed: false,
    managementDate: '',
    followUps: [''],
    solved: 'unsolved'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFollowUpChange = (index, value) => {
    const updatedFollowUps = [...form.followUps];
    updatedFollowUps[index] = value;
    setForm({ ...form, followUps: updatedFollowUps });
  };

  const addFollowUpField = () => {
    setForm({ ...form, followUps: [...form.followUps, ''] });
  };

  const addProblem = () => {
    setProblems([...problems, { ...form }]);
    setForm({
      name: '',
      description: '',
      councilDiscussed: false,
      councilDate: '',
      potentialSolutions: '',
      affectedStudents: 0,
      priority: 'Low',
      managementDiscussed: false,
      managementDate: '',
      followUps: [''],
      solved: 'unsolved'
    });
    setShowForm(false);
  };

  const filteredSortedProblems = problems
    .filter(p => (filterPriority ? p.priority === filterPriority : true))
    .filter(p => (filterSolved ? p.solved === filterSolved : true))
    .sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const solvedOrder = { unsolved: 1, solved: 2 };
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return solvedOrder[a.solved] - solvedOrder[b.solved];
      }
    });

  return (
    <>
      <div className="title">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Council Managed Problems</h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <div>
            <Label>Filter by Priority:</Label>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <Label>Filter by Status:</Label>
            <select value={filterSolved} onChange={(e) => setFilterSolved(e.target.value)}>
              <option value="">All</option>
              <option value="unsolved">Unsolved</option>
              <option value="solved">Solved</option>
            </select>
          </div>
        </div>
      </div>
    
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxHeight: '70vh', overflowY: 'auto', width: '100%' }}>
          {filteredSortedProblems.map((problem, index) => (
            <Card key={index}>
              <CardContent>
                <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{problem.name}</h3>
                <p>{problem["Description"]}</p>
                <br></br>
                <p><strong><img src={priorityImg} alt='Priority:' title='Priority' style={{width:'15px'}}/></strong> {problem["priority"]}</p>
                <p><strong><img src={councilDiscussionImg} alt='Council Discussion:' title='Council Discussion' style={{width:'15px'}}/></strong> {problem["councilDiscussed"] ? `Yes (${problem["councilDate"]})` : 'No'}</p>
                <p style={{ whiteSpace: 'pre-line' }}><strong><img src={potentialSolutionsImg} alt='Potential Solutions:' title='Potential Solutions' style={{width:'15px'}}/></strong> {problem["potentialSolutions"]}</p>
                <p><strong><img src={studentsAffectedImg} alt='Students Affected:' title='Students Affected' style={{width:'15px'}}/></strong> {problem["affectedStudents"]}</p>
                <p><strong><img src={managementDiscussionImg} alt='Discussed with Management:' title='Discussed with Management' style={{width:'15px'}}/></strong> {problem["managementDiscussed"] ? `Yes (${problem["managementDate"]})` : 'No'}</p>
                <p><strong><img src={followUpImg} alt='Follow-Ups:' title='Follow-Ups' style={{width:'15px'}}/></strong> {problem["followUps"].filter(f => f).length > 0 ? problem["followUps"].join(', ') : 'None'}</p>
                <p><strong><img src={solvedImg} alt='Status:' title='Status' style={{width:'15px'}}/></strong> {problem["solved"].charAt(0).toUpperCase() + problem["solved"].slice(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProblemLifecycleTracker