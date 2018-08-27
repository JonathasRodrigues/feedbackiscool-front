import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class AuthenticationService {
  static register(user: any) {
    return agent.post(
      `${API_MAP.register}`,
      {
        name: user.name,
        business_name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.confirm
      },
      {
        token: '8ec59ea38df2da81b9cca2510297557f52fe4473'
      }
    );
  }
  static login(email: string, password: string) {
    console.log('Login');
    return agent.post(`${API_MAP.login}`, { email, password });
  }
  static recover(identification: string) {
    return agent.post(`${API_MAP.recover}`, { identification }, {
      token: '8ec59ea38df2da81b9cca2510297557f52fe4473'
    });
  }
  static changePassword(newPassword: any) {
    return agent.post(`${API_MAP.changePassword}`, newPassword, {
      token: '8ec59ea38df2da81b9cca2510297557f52fe4473'
    });
  }
}
export default AuthenticationService;
