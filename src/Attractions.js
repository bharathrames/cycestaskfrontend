import React, { useEffect, useState, } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, TextareaAutosize } from '@mui/material';


const Attractions = ({ onLogout }) => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedAttraction, setEditedAttraction] = useState({
    id: '',
    name: '',
    coverimage: '',
    detail: '',
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.melivecode.com/api/attractions');
        const data = await response.json();

        if (response.ok) {
          setAttractions(data);
        } else {
          console.error('Error fetching attractions:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []);

  const handleLearnMore = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleEdit = (attraction) => {
    setEditMode(true);
    setEditedAttraction(attraction);
  };

  const handleSave = async () => {
    if (editedAttraction.id <= 13) {
      toast.error("You can't update or delete the first 13 entries from the data", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('https://www.melivecode.com/api/auth/attractions/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editedAttraction),
      });

      const data = await response.json();

      if (response.ok) {
        setAttractions((prevAttractions) =>
          prevAttractions.map((attraction) =>
            attraction.id === editedAttraction.id ? editedAttraction : attraction
          )
        );

        setEditMode(false);
        setSelectedAttraction(null);
      } else {
        console.error('Error updating attraction:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleDelete = async (attractionId) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Access Token:', accessToken);

    try {
      const response = await fetch('https://www.melivecode.com/api/attractions/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: attractionId }),
      });

      if (response.ok) {
        setAttractions((prevAttractions) =>
          prevAttractions.filter((attraction) => attraction.id !== attractionId)
        );
      } else {
        const text = await response.text();
        console.error('Error deleting attraction:', text || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  const handleBack = () => {
    setSelectedAttraction(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAttraction((prevAttraction) => ({ ...prevAttraction, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };


  return (
    <div>
      <nav style={{ backgroundColor: '#333', color: '#fff', display: 'flex', 'justify-content': 'space-between' }}>
        <h1>Travel App </h1>
        <Button variant="outlined" style={{ color: 'red', marginLeft: 'auto' }} onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      {selectedAttraction || editMode ? (
        <div>
          {editMode ? (
            <div>
              <div style={{ padding: '20px' }}>
                <h1>Edit Attraction</h1>
                <TextField
                  label="ID"
                  name="id"
                  value={editedAttraction.id}
                  onChange={handleInputChange}
                  fullWidth
                  disabled
                  style={{ margin: '15px' }}
                />
                <TextField
                  label="Name"
                  name="name"
                  value={editedAttraction.name}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ margin: '15px' }}
                />
                <TextField
                  label="Cover Image"
                  name="coverimage"
                  value={editedAttraction.coverimage}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ margin: '15px' }}
                />
                <TextareaAutosize
                  label="Detail"
                  name="detail"
                  value={editedAttraction.detail}
                  onChange={handleInputChange}
                  minRows={3}
                  maxRows={5}
                  style={{ width: '100%', margin: '10px' }}

                />
                <div>
                  <Button variant="contained" onClick={handleSave}>
                    Save
                  </Button>{" "}
                  <Button variant="outlined" color="error" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ border: '1px solid #ccc', borderRadius: '10px', width: '50%', margin: '0 auto' }}>
              <div style={{ backgroundColor: '#333', padding: '10px', color: '#fff', textAlign: 'right' }}>
                <button onClick={handleBack}>X</button>
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>{selectedAttraction.name}</h1>
                <img
                  src={selectedAttraction.coverimage}
                  alt={selectedAttraction.name}
                  style={{ maxWidth: '100%', marginBottom: '20px' }}
                />
                <p>{selectedAttraction.detail}</p>
                {!editMode && (
                  <div>
                    <Button variant="contained" onClick={() => handleEdit(selectedAttraction)}>Edit</Button>{" "}
                    <Button variant="outlined" color="error" onClick={() => handleDelete(selectedAttraction.id)}>Delete</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>
          {attractions.map((attraction) => (
            <div key={attraction.id} style={{ width: '30%', margin: '10px' }}>
              <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                <h3>{attraction.name}</h3>
                <img
                  src={attraction.coverimage}
                  alt={attraction.name}
                  style={{ maxWidth: '100%', marginBottom: '10px' }}
                />
                <p>{attraction.detail}</p>
                <Button variant="contained" onClick={() => handleLearnMore(attraction)}>Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Attractions;
