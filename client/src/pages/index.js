import withSplitting from '../withSplitting';

export const Home = withSplitting(() => import('../components/Home'));
export const Login = withSplitting(() => import('../components/Login'));
export const Register = withSplitting(() => import('../components/Register'));

/** auth */
export const Auth = withSplitting(() => import('../components/auth'));

/** find-food */
export const FindFood = withSplitting(() => import('../components/find-food'));
