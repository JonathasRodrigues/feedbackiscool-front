import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
import { SERVER_URL } from 'settings';
class AuthenticationService {
  static register(user: any) {
    return agent.post(
      `${API_MAP.register}`,
      {
        realm: 'user',
        username: user.name,
        emailVerified: false,
        email: user.email,
        password: user.password
      }
    );
  }
  static login(email: string, password: string) {
    console.log('Login');
    return agent.post(`${API_MAP.login}`, { email, password });
  }
  static loginFacebook(code: string) {
    console.log('Login Facebook');
    return agent.get(`${SERVER_URL}/auth/facebook/callback?code=${code}`);
  }
  static recover(identification: string) {
    return agent.post(`${API_MAP.recover}`, { identification });
  }
  static changePassword(newPassword: any) {
    return agent.post(`${API_MAP.changePassword}`, newPassword);
  }
}
export default AuthenticationService;
