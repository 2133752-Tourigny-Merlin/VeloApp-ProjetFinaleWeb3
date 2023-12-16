import { HomeRoute } from './routes/home.route';
import { AjoutRoute } from './routes/ajout.route';
import { ModifierRoute } from './routes/modifier.route';
import { InfoRoute } from './routes/info.route';
import Login from './routes/login.route';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';

import Francais from './lang/fr.json';
import Anglais from './lang/en.json';
import { useState } from 'react';

function App() {

  const [locale, setLocale] = useState("fr");
  const [messages, setMessages] = useState(Francais);

  const changerlangue = () => {
    if(locale === "fr"){
      setLocale("en");
      setMessages(Anglais);
    } else {
      setLocale("fr")
      setMessages(Francais);
    }
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
       <FormattedMessage id="app.titre">{txt => <h1>{txt}</h1>}</FormattedMessage>
       <FormattedMessage id="app.buttonLangue">{txt => <button onClick={changerlangue}>{txt}</button>}</FormattedMessage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ajout" element={<AjoutRoute />} />
          <Route path="/modifier/:id" element={<ModifierRoute />} />
          <Route path="/info/:id" element={<InfoRoute />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export const Home = () => {
  HomeRoute();
};

export const Ajout = () => {
  AjoutRoute();
};

export const Modifier = () => {
  ModifierRoute();
};

export const Info = () => {
  InfoRoute();
};

export default App;