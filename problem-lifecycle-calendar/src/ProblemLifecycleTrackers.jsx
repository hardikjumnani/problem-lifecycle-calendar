import React, { useState } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import CardContent from './components/CardContent';
import Button from './components/Button.jsx';
import Input from './components/Input';
import Textarea from './components/Textarea.jsx';
import Label from './components/Label.jsx';
import priority from './assets/priority.png';
import followUp from './assets/followUp.png';
import councilDiscussion from './assets/councilDiscussion.png';
import managementDiscussion from './assets/managementDiscussion.png';
import studentsAffected from './assets/studentsAffected.png';
import potentialSolutions from './assets/potentialSolutions.png';
import solved from './assets/solved.png';
import unsolved from './assets/unsolved.png';

function ProblemLifecycleTracker() {
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
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Council Managed Problems</h1>
        <Button onClick={() => setShowForm(true)}>Add Problem</Button>
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

      {showForm && (
        <div className="card">
          <h2>Add New Problem</h2>

          <div>
            <Label>Problem Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div>
            <Label>
              <input type="checkbox" name="councilDiscussed" checked={form.councilDiscussed} onChange={handleChange} />
              Discussed with Council
            </Label>
            {form.councilDiscussed && (
              <Input name="councilDate" type="date" value={form.councilDate} onChange={handleChange} />
            )}
          </div>

          <div>
            <Label>Potential Solutions</Label>
            <Textarea name="potentialSolutions" value={form.potentialSolutions} onChange={handleChange} />
          </div>

          <div>
            <Label>No. of Students Affected</Label>
            <Input name="affectedStudents" type="number" value={form.affectedStudents} onChange={handleChange} />
          </div>

          <div>
            <Label>Priority Level</Label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <Label>
              <input type="checkbox" name="managementDiscussed" checked={form.managementDiscussed} onChange={handleChange} />
              Discussed with Management
            </Label>
            {form.managementDiscussed && (
              <Input name="managementDate" type="date" value={form.managementDate} onChange={handleChange} />
            )}
          </div>

          <div>
            <Label>Follow-Ups (Dates)</Label>
            {form.followUps.map((date, index) => (
              <div key={index}>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => handleFollowUpChange(index, e.target.value)}
                />
              </div>
            ))}
            <Button onClick={addFollowUpField}>Add Follow-Up</Button>
          </div>

          <div>
            <Label>Problem Status</Label>
            <Label>
              <input type="radio" name="solved" value="solved" checked={form.solved === 'solved'} onChange={handleChange} />
              Solved
            </Label>
            <Label>
              <input type="radio" name="solved" value="unsolved" checked={form.solved === 'unsolved'} onChange={handleChange} />
              Unsolved
            </Label>
          </div>

          <Button onClick={addProblem}>Add Problem</Button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxHeight: '70vh', overflowY: 'auto', width: '100%' }}>
        {filteredSortedProblems.map((problem, index) => (
          <Card key={index}>
            <CardContent>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{problem.name}</h3>
              <p>{problem.description}</p>
              <br></br>
              <p><strong><img src={priority} alt='Priority:' title='Priority' style={{width:'15px'}}/></strong> {problem.priority}</p>
              <p><strong><img src={councilDiscussion} alt='Council Discussion:' title='Council Discussion' style={{width:'15px'}}/></strong> {problem.councilDiscussed ? `Yes (${problem.councilDate})` : 'No'}</p>
              <p style={{ whiteSpace: 'pre-line' }}><strong><img src={potentialSolutions} alt='Potential Solutions:' title='Potential Solutions' style={{width:'15px'}}/></strong> {problem.potentialSolutions}</p>
              <p><strong><img src={studentsAffected} alt='Students Affected:' title='Students Affected' style={{width:'15px'}}/></strong> {problem.affectedStudents}</p>
              <p><strong><img src={managementDiscussion} alt='Discussed with Management:' title='Discussed with Management' style={{width:'15px'}}/></strong> {problem.managementDiscussed ? `Yes (${problem.managementDate})` : 'No'}</p>
              <p><strong><img src={followUp} alt='Follow-Ups:' title='Follow-Ups' style={{width:'15px'}}/></strong> {problem.followUps.filter(f => f).length > 0 ? problem.followUps.join(', ') : 'None'}</p>
              <p><strong><img src={solved} alt='Status:' title='Status' style={{width:'15px'}}/></strong> {problem.solved.charAt(0).toUpperCase() + problem.solved.slice(1)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProblemLifecycleTracker