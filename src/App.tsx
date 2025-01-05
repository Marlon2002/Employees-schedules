import { useState } from 'react';
import { Calendar, Clock, Plus, Minus, Trash, Edit } from 'lucide-react';

interface Schedule {
  id: number;
  employeeName: string;
  shiftType: string;
  location: string;
  numberOfHours: number;
}

const initialSchedules: Schedule[] = [
  { id: 1, employeeName: 'John Doe', shiftType: 'Morning', location: 'Downtown', numberOfHours: 8 },
  { id: 2, employeeName: 'Jane Doe', shiftType: 'Afternoon', location: 'Uptown', numberOfHours: 6 },
];

const App = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [employeeName, setEmployeeName] = useState('');
  const [shiftType, setShiftType] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfHours, setNumberOfHours] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState({} as Schedule);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.id === editingSchedule.id) {
          return { ...schedule, employeeName, shiftType, location, numberOfHours };
        }
        return schedule;
      });
      setSchedules(updatedSchedules);
      setIsEditing(false);
    } else {
      const newSchedule: Schedule = {
        id: schedules.length + 1,
        employeeName,
        shiftType,
        location,
        numberOfHours,
      };
      setSchedules([...schedules, newSchedule]);
    }
    setEmployeeName('');
    setShiftType('');
    setLocation('');
    setNumberOfHours(0);
  };

  const handleDelete = (id: number) => {
    const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(updatedSchedules);
  };

  const handleEdit = (schedule: Schedule) => {
    setIsEditing(true);
    setEditingSchedule(schedule);
    setEmployeeName(schedule.employeeName);
    setShiftType(schedule.shiftType);
    setLocation(schedule.location);
    setNumberOfHours(schedule.numberOfHours);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Employee Schedules</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="employeeName">
              Employee Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="employeeName"
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shiftType">
              Shift Type
            </label>
            <select
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="shiftType"
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value)}
            >
              <option value="">Select Shift Type</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberOfHours">
              Number of Hours
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="numberOfHours"
              type="number"
              value={numberOfHours}
              onChange={(e) => setNumberOfHours(Number(e.target.value))}
            />
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditing ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Schedules</h2>
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id} className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-bold">{schedule.employeeName}</p>
                  <p className="text-sm text-gray-600">Shift Type: {schedule.shiftType}</p>
                  <p className="text-sm text-gray-600">Location: {schedule.location}</p>
                  <p className="text-sm text-gray-600">Number of Hours: {schedule.numberOfHours}</p>
                </div>
                <div className="flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEdit(schedule)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;