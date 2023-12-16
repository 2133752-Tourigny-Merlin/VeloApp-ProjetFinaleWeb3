import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

export const Ajout = () => {
  const navigate = useNavigate();

  const [roueSubmit, setRoueSubmit] = useState(false);
  const [suspensionSubmit, setSuspensionSubmit] = useState(false);

  const [bikeData, setBikeData] = useState({
    marque: '',
    modele: '',
    dateDeCreation: '',
    prix: 0,
    type: '',
    taille: '',
    roues: [
      { marque: '', grandeur: 0, tubeless: false, psiMax: 0 },
      { marque: '', grandeur: 0, tubeless: false, psiMax: 0 },
    ],
    suspensions: [
      { type: "Avant", marque: '', psiMin: 0, psiMax: 0, taille: 0 },
      { type: "Arrière", marque: '', psiMin: 0, psiMax: 0, taille: 0 },
    ],
    fonctionnel: false,
    couleurs: ['brun'],
    nbVitesse: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Convert the value based on the input type
    const inputValue = type === 'checkbox' ? checked : type === 'number' ? +value : name === 'couleurs' ? value.split(',').map((color) => color.trim()) :  name === 'dateDeCreation' ? new Date(value).toISOString().split('T')[0] : value;
  
    setBikeData({
      ...bikeData,
      [name]: inputValue,
    });
  };
  

  const handleInputChangeRoueEtSuspension = (e, index, section) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : type === 'number' ? +value : value;

    setBikeData((prevData) => {
      const newData = { ...prevData };
      newData[section][index] = {
        ...newData[section][index],
        [name]: inputValue,
      };
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(bikeData.prix <= 0 || bikeData.nbVitesse <= 0){
      window.alert("Le prix et la grandeurs du vélo doivent être supérieurs à 0");
    } else {
       if (!roueSubmit || !suspensionSubmit) {
      const ajouter = window.alert("Veillez-vous assurez que vous avez fournis tout les éléments des roues et suspensions");
    } else {
      axios
        .post(`https://master--adorable-panda-985249.netlify.app/velo`, { Velo: bikeData }) // Ensure bikeData is in the correct structure
        .then((response) => {
          console.log('Bike data updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating bike data:', error);
        });
      navigate('/');
    }
    }
   
  };
  
  const handleSubmitRoue = (e) => {
    e.preventDefault();
    if(bikeData.roues[0].grandeur <= 0 || bikeData.roues[1].grandeur <= 0 || bikeData.roues[0].psiMax <= 0 || bikeData.roues[1].psiMax <= 0){
      window.alert("Les grandeurs et les psi max doivent être plus grand que 0");
    } else {
      setRoueSubmit(true);
    }
    
  };

  const handleSubmitSuspension = (e) => {
    e.preventDefault();
    if(bikeData.suspensions[0].psiMax <= 0 || bikeData.suspensions[1].psiMax <= 0 || bikeData.suspensions[0].psiMin <= 0 || bikeData.suspensions[1].psiMin <= 0 || bikeData.suspensions[0].taille <= 0 || bikeData.suspensions[1].taille <= 0){
      window.alert("Les psi max, psi min et la taille max doivent être plus grand que 0");
    } else {
      setSuspensionSubmit(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Information vélo</Typography>
            <TextField label="Marque" name="marque" value={bikeData.marque} onChange={handleInputChange} required fullWidth />
            <TextField label="Modèle" name="modele" value={bikeData.modele} onChange={handleInputChange} required fullWidth />
            <TextField label="Date" name="dateDeCreation" type="date" value={bikeData.dateDeCreation} onChange={handleInputChange} required fullWidth />
            <TextField label="Prix" name="prix" type="number" value={bikeData.prix} onChange={handleInputChange} required fullWidth />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" name="type" value={bikeData.type} onChange={handleInputChange} required>
                <MenuItem value={'Route'}>Route</MenuItem>
                <MenuItem value={'Montagne monté'}>Montagne monté</MenuItem>
                <MenuItem value={'Montagne descente'}>Montagne descente</MenuItem>
                <MenuItem value={'Ville'}>Ville</MenuItem>
                <MenuItem value={'Bmx'}>Bmx</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Taille</InputLabel>
              <Select label="Taille" name="taille" value={bikeData.taille} onChange={handleInputChange} required>
                <MenuItem value={'TP'}>TP</MenuItem>
                <MenuItem value={'P'}>P</MenuItem>
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'L'}>L</MenuItem>
                <MenuItem value={'TL'}>TL</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Fonctionnel</InputLabel>
              <Select label="Fonctionnel" name="fonctionnel" value={bikeData.fonctionnel} onChange={handleInputChange} required>
                <MenuItem value={true}>Oui</MenuItem>
                <MenuItem value={false}>Non</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Nombre de vitesse" name="nbVitesse" type="number" value={bikeData.nbVitesse} onChange={handleInputChange} required fullWidth />
            <TextField label="Couleurs" name="couleurs" value={bikeData.couleurs.join(', ')} onChange={handleInputChange} required fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmitRoue}>
            <Typography variant="h6">Roue Avant</Typography>
            <TextField label="Marque" name="marque" value={bikeData.roues[0].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth />
            <TextField label="Grandeur" name="grandeur" type="number" value={bikeData.roues[0].grandeur} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth/>
            <FormControl fullWidth>
              <InputLabel>Tubeless</InputLabel>
              <Select label="Tubeless" name="tubeless" value={bikeData.roues[0].tubeless} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required>
                <MenuItem value={true}>Oui</MenuItem>
                <MenuItem value={false}>Non</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Psi max" name="psiMax" type="number" value={bikeData.roues[0].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth />

            <Typography variant="h6" marginTop={3}>Roue Arrière</Typography>
            <TextField label="Marque" name="marque" value={bikeData.roues[1].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth />
            <TextField label="Grandeur" name="grandeur" type="number" value={bikeData.roues[1].grandeur} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth />
            <FormControl fullWidth>
              <InputLabel>Tubeless</InputLabel>
              <Select label="Tubeless" name="tubeless" value={bikeData.roues[1].tubeless} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required>
                <MenuItem value={true}>Oui</MenuItem>
                <MenuItem value={false}>Non</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Psi max" name="psiMax" type="number" value={bikeData.roues[1].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>


      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmitSuspension}>
            <Typography variant="h6">Suspension Avant</Typography>
            
            <TextField label="Marque" name="marque" value={bikeData.suspensions[0].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />
            <TextField label="Psi min" name="psiMin" type="number" value={bikeData.suspensions[0].psiMin} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />
            <TextField label="Psi max" name="psiMax" type="number" value={bikeData.suspensions[0].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />
            <TextField label="Taille" name="taille" type="number" value={bikeData.suspensions[0].taille} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />
    
            <Typography variant="h6" marginTop={3}>Suspension Arrière</Typography>
            <TextField label="Marque" name="marque" value={bikeData.suspensions[1].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />
            <TextField label="Psi min" name="psiMin" type="number" value={bikeData.suspensions[1].psiMin} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />
            <TextField label="Psi max" name="psiMax" type="number" value={bikeData.suspensions[1].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />
            <TextField label="Taille" name="taille" type="number" value={bikeData.suspensions[1].taille} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Ajout;
