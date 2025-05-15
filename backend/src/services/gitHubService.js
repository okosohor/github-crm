const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

class GitHubService {
  async getRepoData(owner, name) {
    try {
      const url = `${process.env.GITHUB_BASE_URL}/repos/${owner}/${name}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      throw new Error('Get repository error: ', err);
    }
  }
}

module.exports = new GitHubService();
