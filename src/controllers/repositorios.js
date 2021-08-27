const axios = require('axios');

// const LANG = 'C#';
// const USER = 'takenet';

async function getReps() {
  try {
    const response = await axios.get(`https://api-content.ingresso.com/v0/sessions/city/2/theater/14/partnership/ancar_novaamerica`);
    if (response && response.data && response.data.length > 0) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

exports.getRepositorios = async (_req, res) => {
  try {
    // Função recursiva que enquanto não recuperar os 5 primeiros repositórios em C# segue realizando buscas nas páginas seguintes.
    const reps = await getReps();
    if (reps.length > 0) {
      return res.status(200).send(reps);
    }
    return res.status(406).send({ msg: 'Nenhum repositório encontrado' });
  } catch (error) {
    return res.status(500).send({ msg: 'Serviço indisponível no momento' });
  }
};

