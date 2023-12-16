import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export const Info = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [veloInfo, setVeloInfo] = useState({
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
          setVeloInfo(response.data.Velo);
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
      <FormattedMessage id="info.buttonRetour">{txt => <button onClick={handleBackClick}>{txt}</button>}</FormattedMessage>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h4">{veloInfo.marque}</Typography>
              <Typography variant="h6">{veloInfo.modele}</Typography>
              <FormattedMessage id="app.type">{txt => <Typography variant="body1">{txt}: <FormattedMessage id={`app.type${veloInfo.type}`}></FormattedMessage></Typography>}</FormattedMessage>
              <FormattedMessage id="app.grandeur">{txt => <Typography variant="body1">{txt}: <FormattedMessage id={`app.grandeur${veloInfo.taille}`}></FormattedMessage></Typography>}</FormattedMessage>
              <FormattedMessage id="info.prix">{txt => <Typography variant="body1">{txt} {veloInfo.prix}</Typography>}</FormattedMessage>
              <FormattedMessage id="info.date">{txt => <Typography variant="body1">{txt}: {veloInfo.dateDeCreation}</Typography>}</FormattedMessage>
              <FormattedMessage id="info.fonctionnel">{txt => <Typography variant="body1">{txt} {veloInfo.fonctionnel ? <FormattedMessage id="info.oui"></FormattedMessage> : <FormattedMessage id="info.non"></FormattedMessage>}</Typography>}</FormattedMessage>
              <FormattedMessage id="info.couleurs">{txt => <Typography variant="body1">{txt} {veloInfo.couleurs.join(', ')}</Typography>}</FormattedMessage>
              <FormattedMessage id="info.vitesse">{txt => <Typography variant="body1">{txt} {veloInfo.nbVitesse}</Typography>}</FormattedMessage>
  
              <FormattedMessage id="info.roues">{txt => <Typography variant="h6">{txt}</Typography>}</FormattedMessage>
              
              {veloInfo.roues.map((roue, index) => (
                <div key={index}>
                  <FormattedMessage id="info.marque">{txt => <Typography variant="body1">{txt} {roue.marque}</Typography>}</FormattedMessage>
                  <FormattedMessage id="app.grandeur">{txt => <Typography variant="body1">{txt}: {roue.grandeur}</Typography>}</FormattedMessage>
                  <FormattedMessage id="info.tubeless">{txt => <Typography variant="body1">{txt} {roue.tubeless ? <FormattedMessage id="info.oui"></FormattedMessage> : <FormattedMessage id="info.non"></FormattedMessage>}</Typography>}</FormattedMessage>
                  <FormattedMessage id="info.psiMax">{txt => <Typography variant="body1">{txt} {roue.psiMax}</Typography>}</FormattedMessage>
                </div>
              ))}

              <FormattedMessage id="info.suspensions">{txt => <Typography variant="h6">{txt}</Typography>}</FormattedMessage>
              {veloInfo.suspensions.map((suspension, index) => (
                <div key={index}>
                  <FormattedMessage id="app.type">{txt => <Typography variant="body1">{txt}: {suspension.type}</Typography>}</FormattedMessage>
                  <FormattedMessage id="info.marque">{txt => <Typography variant="body1">{txt} {suspension.marque}</Typography>}</FormattedMessage>
                  <FormattedMessage id="info.psiMin">{txt => <Typography variant="body1">{txt} {suspension.psiMin}</Typography>}</FormattedMessage>
                  <FormattedMessage id="info.psiMax">{txt => <Typography variant="body1">{txt} {suspension.psiMax}</Typography>}</FormattedMessage>
                  <FormattedMessage id="app.grandeur">{txt => <Typography variant="body1">{txt}: {suspension.taille}</Typography>}</FormattedMessage>
                </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };
  