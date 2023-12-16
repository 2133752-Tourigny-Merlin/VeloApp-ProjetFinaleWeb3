import React from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IVelo {
  modele: string;
  marque: string;
  annee: number;
  taille: string;
  type: string;
  _id: string; // Add the _id field for uniquely identifying the bike
}

const typeVelo = ["Route", "Montagne monté", "Montagne descente", "Ville", "Bmx"];

const getImageByType = (type: string): string => {
  switch (type) {
    case "Route":
      return "../VeloRoute.jpg";
    case "Montagne monté":
      return "../VeloMonte.jpg";
    case "Montagne descente":
      return "../VeloDescente.jpg";
    case "Ville":
      return "../VeloVille.jpg";
    case "Bmx":
      return "../VeloBmx.jpg";
    default:
      return "../VeloMonte.jpg";
  }
};
const Velo = (props: IVelo) => {
  const bikeImage = getImageByType(props.type);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this bike?");
    
    if (shouldDelete) {
      try {
        // Send the delete request to the API
        await axios.delete(`https://master--adorable-panda-985249.netlify.app/velo/${props._id}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting bike:', error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/modifier/${props._id}`);
  };

  const handleInfo = () => {
    navigate(`/info/${props._id}`);
  };

  return (
    <Card sx={{
      margin: 2,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '700px',
    }}>
      <Grid container>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleDelete}>
            Supprimer
          </button>
          <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleUpdate}>
            Modifier
          </button>
          <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleInfo}>
            Voir plus
          </button>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="h5">{props.marque}</Typography>
          <Typography variant="h6">{props.modele}</Typography>
          <Typography variant="body2">Taille: {props.taille}</Typography>
          <Typography variant="body2">Année de fabrication: {props.annee}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <CardMedia
            component="img"
            image={bikeImage}
            alt="Bike Image"
            sx={{ height: 150, width: 150 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Velo;