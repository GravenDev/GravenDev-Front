import axios from 'axios';
import Token from '@/models/token';

const TokenApi = {
  async createToken(): Promise<Token> {
    return (await axios.get<Token>('/tokens/create')).data;
  },
  async validateToken(currentToken: string): Promise<Token> {
    return (await axios.get<Token>('/tokens/validate', {
      params: {
        token: currentToken,
      },
    })).data;
  },
};

export default TokenApi;
