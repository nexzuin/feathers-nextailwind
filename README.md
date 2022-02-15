# Next.JS & Feathers.JS

## 1. Instal & Generate FeathersJS
    $ npm i -g @feathersjs/cli
    $ mkdir awesome-project && cd awesome-project
    $ feathers generate app

## 2. Add the Next.JS support
    $ yarn add next react react-dom react-hook-form @headlessui/react @tailwindcss/forms sweetalert2

    $ yarn add -D tailwindcss postcss autoprefixer
    
## 3. Create Folder & Files
### 3.1 Client folder
    $ mkdir client/pages

### 3.2 client/jsconfig.json
    // client/jsconfig.json
    {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/components/*": ["components/*"],
                "@/context/*": ["context/*"],
            }
        }
    }

### 3.3 client/context/state.js
    // context/state.js
    import { createContext, useContext } from 'react';

    const AppContext = createContext();

    export function AppWrapper({ children }) {
    let sharedState = {/* whatever you want */}

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
    }

    export function useAppContext() {
        return useContext(AppContext);
    }
### 3.4 client/pages/_app.jsx
    // client/pages/_app.jsx
    import { AppWrapper } from '@/context/state';

    export default function Application({ Component, pageProps }) {
        return (
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        )
    }
### 3.5 server/nextApp.js
    const next = require("next");

    const dev = process.env.NODE_ENV !== "production";
    const nextApp = next({ dir: "./client", dev });
    const handle = nextApp.getRequestHandler();

    module.exports = {
        nextApp,
        handle
    };

### 3.6 server/index.js
    const logger = require("winston");
    const app = require("./app");
    const port = app.get("port");
    const nextApp = require("./nextApp").nextApp;

    nextApp.prepare().then(() => {
    const server = app.listen(port);

    process.on("unhandledRejection", (reason, p) =>
        logger.error("Unhandled Rejection at: Promise ", p, reason)
    );

    server.on("listening", () =>
        logger.info(
            "Feathers application started on http://%s:%d", app.get("host"), port)
            );
    });
### 3.7 server/middleware/index.js
    const next = require("./next");

    module.exports = function(app) {
    app.get("*", next());
    };

### 3.8 server/middleware/next.js
    const handle = require("../nextApp").handle;

    module.exports = function(options = {}) {
        return function next(req, res, next) {
        return handle(req, res);
        };
    };
