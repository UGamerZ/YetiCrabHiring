import type {Metadata} from 'next';
import {DEFAULT_BODY_CLASSNAME} from '../components/Wrapper';
import {App} from '../components/App';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'YetiCrab Hiring Task',
};

export default function RootLayout() {
    return (
        <html lang="en">
            <body className={DEFAULT_BODY_CLASSNAME}>
                <App/>
            </body>
        </html>
    );
}
