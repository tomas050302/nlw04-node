import app from './server';

const port = 3333 || process.env.PORT;

app.listen(port, () => console.log(`App listening on port ${port}`));
