import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const Modifier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  //Gestion des transformations de valeurs des inputs
  // Code emprunté. Source : https://chat.openai.com
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
  
    const formattedValue = name === 'couleurs' ? value.split(',').map((color: string) => color.trim()) :
                           name === 'dateDeCreation' ? new Date(value).toISOString().split('T')[0] :
                           value;
    //Fin du code emprunté
  
    setVeloInfo((prevInfo) => ({
      ...prevInfo,
      [name]: formattedValue,
    }));
  };
  // Fin code emprunté

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.put(`https://master--adorable-panda-985249.netlify.app/velo`, { Velo: veloInfo })
      .then((response) => {
        console.log('Bike data updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating bike data:', error);
      });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
    <FormattedMessage id="info.buttonRetour">{txt => <button onClick={handleBackClick}>{txt}</button>}</FormattedMessage>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <FormattedMessage id="modifier.titre">{txt => <Typography variant="h4">{txt}</Typography>}</FormattedMessage>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
            <FormattedMessage id="info.marque">{txt => <TextField
                type="text"
                name="marque"
                label={txt}
                value={veloInfo.marque}
                onChange={handleChange}
              />}</FormattedMessage>
            </Grid>
            <Grid item>
            <FormattedMessage id="info.modele">{txt => <TextField
                type="text"
                name="modele"
                label={txt}
                value={veloInfo.modele}
                onChange={handleChange}
              />}</FormattedMessage>
            </Grid>
            <Grid item>
            <FormattedMessage id="info.prix">{txt => <TextField
                type="number"
                name="prix"
                label={txt}
                value={veloInfo.prix}
                onChange={handleChange}
              />}</FormattedMessage>
            </Grid>
            <Grid item>
            <FormattedMessage id="info.date">{txt => <TextField
                type="date"
                name="dateDeCreation"
                label={txt}
                value={veloInfo.dateDeCreation}
                onChange={handleChange}
              />}</FormattedMessage>
            </Grid>
            <Grid item>
            <FormattedMessage id="info.couleur">{txt => <TextField
                type="text"
                name="couleurs"
                label={txt}
                value={veloInfo.couleurs.join(', ')}
                onChange={handleChange}
              />}</FormattedMessage>
            </Grid>
            <Grid item>
              <FormattedMessage id="modifier.buttonSoummettre">{txt => <Button type="submit" variant="contained" color="primary">{txt}</Button>}</FormattedMessage>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
    </>
  );
};

export default Modifier;
