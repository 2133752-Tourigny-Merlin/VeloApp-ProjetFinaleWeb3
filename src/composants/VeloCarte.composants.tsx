import { Card, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface IVelo {
  modele: string;
  marque: string;
  annee: string;
  taille: string;
  type: string;
  _id: string;
}

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
    const confirmation = window.confirm("Etes-vous certain de vouloir supprimer ce vélo?");
    
    if (confirmation) {
      try {
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
        <FormattedMessage id="velo.buttonSupprimer">{txt => <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleDelete}>{txt}</button>}</FormattedMessage>
        <FormattedMessage id="velo.buttonModifier">{txt => <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleUpdate}>{txt}</button>}</FormattedMessage>
        <FormattedMessage id="velo.buttonVoirPlus">{txt => <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleInfo}>{txt}</button>}</FormattedMessage>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="h5">{props.marque}</Typography>
          <Typography variant="h6">{props.modele}</Typography>
          <Typography variant="body2"><FormattedMessage id="velo.taille"></FormattedMessage><FormattedMessage id={`app.grandeur${props.taille}`}></FormattedMessage></Typography>
          <Typography variant="body2"><FormattedMessage id="velo.dateFabrication"></FormattedMessage>{props.annee}</Typography>
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