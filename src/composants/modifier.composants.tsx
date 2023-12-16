import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, TextField, Button } from '@mui/material';

const Modifier = () => {
  const { id } = useParams();
  const [veloData, setVeloData] = useState({
    _id: id,
    marque: '',
    modele: '',
    dateDeCreation: '',
    prix: 0,
    type: '',
    taille: '',
    roues: [],
    suspensions: [],
    fonctionnel: true,
    couleurs: [],
    nbVitesse: 0,
  });

  useEffect(() => {
    axios.get(`https://master--adorable-panda-985249.netlify.app/velo/${id}`)
      .then((response) => {
        setVeloData(response.data.Velo);
      })
      .catch((error) => {
        console.error('Error fetching bike data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    /*
    * Code généré par chatGPT
    */
    const formattedValue = name === 'couleurs' ? value.split(',').map((color) => color.trim()) :
                           name === 'dateDeCreation' ? new Date(value).toISOString().split('T')[0] :
                           value;
    //Fin du code emprunté
  
    setVeloData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    axios.put(`https://master--adorable-panda-985249.netlify.app/velo`, { Velo: veloData })
      .then((response) => {
        console.log('Bike data updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating bike data:', error);
      });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Modifier le vélo</Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                type="text"
                name="marque"
                label="Marque"
                value={veloData.marque}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                name="modele"
                label="Modele"
                value={veloData.modele}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                name="prix"
                label="Prix"
                value={veloData.prix}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="date"
                name="dateDeCreation"
                label="Date"
                value={veloData.dateDeCreation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                name="couleurs"
                label="Couleur example (Noire, Rouge)"
                value={veloData.couleurs.join(', ')}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Update Bike
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Modifier;
