// `pages/_app.js`
import '../styles/global.css';
import './homePage.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}