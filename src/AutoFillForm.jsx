import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const AutofillForm = ({ deviceId }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
  });

  const mockUpData = [
    {
      id: 'as2c1as54h',
      name: 'Phat Luu',
      email: 'phat@gmail.com',
      age: 20,
    },

    {
      id: '7jv5w89veg',
      name: 'Thinh To',
      email: 'thinh@gmail.com',
      age: 25,
    },
    {
      id: 'cz8rwqf32a',
      name: 'Khang Quach',
      email: 'khang@gmail.com',
      age: 30,
    },
  ];

  useEffect(() => {
    if (deviceId !== null) {
      const data = mockUpData.find((item) => item.id === deviceId);
      setFormData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col w-3/5 font-mono text-xl">
      <label>
        Name:
        <input type="text" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={formData.age} onChange={handleChange} />
      </label>
    </form>
  );
};

export default AutofillForm;
