import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

// ... (your imports)

export const Info = () => {
    const navigate = useNavigate();
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
  
    const handleBackClick = () => {
      navigate('/');
    };
  
    return (
      <>
        <button onClick={handleBackClick}>Retour</button>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h4">{veloData.marque}</Typography>
              <Typography variant="h6">{veloData.modele}</Typography>
              <Typography variant="body1">Type: {veloData.type}</Typography>
              <Typography variant="body1">Taille: {veloData.taille}</Typography>
              <Typography variant="body1">Prix: {veloData.prix}</Typography>
              <Typography variant="body1">Date de création: {veloData.dateDeCreation}</Typography>
              <Typography variant="body1">Fonctionnel: {veloData.fonctionnel ? 'Oui' : 'Non'}</Typography>
              <Typography variant="body1">Couleur: {veloData.couleurs.join(', ')}</Typography>
              <Typography variant="body1">Nombre de vitesse: {veloData.nbVitesse}</Typography>
  
              <Typography variant="h6">Roues</Typography>
              {veloData.roues.map((roue, index) => (
                <div key={index}>
                  <Typography variant="body1">Marque: {roue.marque}</Typography>
                  <Typography variant="body1">Grandeur: {roue.grandeur}</Typography>
                  <Typography variant="body1">Tubeless: {roue.tubeless ? 'Oui' : 'Non'}</Typography>
                  <Typography variant="body1">Psi Max: {roue.psiMax}</Typography>
                </div>
              ))}

              <Typography variant="h6">Suspensions</Typography>
              {veloData.suspensions.map((suspension, index) => (
                <div key={index}>
                  <Typography variant="body1">Type: {suspension.type}</Typography>
                  <Typography variant="body1">Marque: {suspension.marque}</Typography>
                  <Typography variant="body1">Psi Min: {suspension.psiMin}</Typography>
                  <Typography variant="body1">Psi Max: {suspension.psiMax}</Typography>
                  <Typography variant="body1">Taille: {suspension.taille}</Typography>
                </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };
  