import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3111/movie',
  cache: new InMemoryCache()
});

// L'instance d'ApolloClient permet d'établir une connexion avec le serveur. L'instance va aussi nous proposer des méthodes pour travailler efficacement avec graphQL

// client.query({
//   query: gql`
//     query Movies {
//         movies {
//             title,
//             plot
//         }
//     }
//   `
// }).then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>
);
// ApolloProvider permet d'intégrer le client sur des composants spécifiques (ici, cela intègre l'intégralité de notre application).

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
