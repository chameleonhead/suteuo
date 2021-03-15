import { Auth } from "aws-amplify";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ConfirmRegisterRequest {
  username: string;
  code: string;
}

export interface LoginUserInfo {
  id: string;
  name: string;
  email: string;
}

export interface Session {
  user: LoginUserInfo;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  username: string;
}

export interface ResetPasswordRequest {
  username: string;
  code: string;
  password: string;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface AuthService {
  register(req: RegisterRequest): Promise<void>;
  confirmRegister(req: ConfirmRegisterRequest): Promise<void>;
  session(): Promise<Session | null>;
  login(req: LoginRequest): Promise<void>;
  logout(): Promise<void>;
  forgotPassword(req: ForgotPasswordRequest): Promise<void>;
  resetPassword(req: ResetPasswordRequest): Promise<void>;
  changePassword(req: ChangePasswordRequest): Promise<void>;
}

const authService: AuthService = {
  register: (req) => {
    return Auth.signUp({
      username: req.email,
      password: req.password,
      attributes: {
        name: req.name,
      },
    }) as any;
  },
  confirmRegister: (req) => {
    return Auth.confirmSignUp(req.username, req.code);
  },
  session: () => {
    return Auth.currentSession()
      .then((_) => {
        return Auth.currentUserInfo();
      })
      .then((value) => {
        if (value.username) {
          return {
            user: {
              id: value.attributes["sub"],
              name: value.attributes["name"],
              email: value.attributes["email"],
            },
          };
        } else {
          return null;
        }
      })
      .catch((_) => {
        return null;
      });
  },
  login: (req) => {
    return Auth.signIn({
      username: req.username,
      password: req.password,
    });
  },
  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Auth.signOut());
      }, 1000);
    });
  },
  forgotPassword: (req) => {
    return Auth.forgotPassword(req.username);
  },
  resetPassword: (req) => {
    return Auth.forgotPasswordSubmit(req.username, req.code, req.password);
  },
  changePassword: (req) => {
    throw new Error("Method not implemented.");
  },
};

export default authService;
