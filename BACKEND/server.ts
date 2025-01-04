import app from './app';

const debug = require('debug')('my express app');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    debug(`Server listening on port ${(server.address() as any).port}`);
    console.log(`Server is running at http://localhost:${PORT}`);
});
