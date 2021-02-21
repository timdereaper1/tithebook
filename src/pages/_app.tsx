import { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default App;
