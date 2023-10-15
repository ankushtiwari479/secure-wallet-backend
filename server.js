// Import required modules and libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

   app.get('/',async (req,res)=>{
    res.status(200).json({message:"sucess"})
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
