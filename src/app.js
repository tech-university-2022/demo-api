const express = require('express');
const routes = require('./routes');

const app = express();

// Parse body to json
app.use(express.json());

app.use('', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});
