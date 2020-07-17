import withSplitting from '../withSplitting';

export const Home = withSplitting(() => import('../components/Home'));
// export const Login = withSplitting(() => import('../components/Login'));
// export const Register = withSplitting(() => import('../components/Register'));

/** auth */
export const Auth = withSplitting(() => import('../components/auth'));
export const Login = withSplitting(() => import('../components/auth/Login'));
export const Register = withSplitting(() => import('../components/auth/Register'));
/** food */
export const Store = withSplitting(() => import('../components/store'));
/** 추천기능 */
export const Recomend = withSplitting(() => import('../components/recomend'));
