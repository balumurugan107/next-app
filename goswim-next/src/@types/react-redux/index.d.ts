import { DefaultRootState } from 'react-redux';
import { ApplicationState } from 'src/store';

declare module 'react-redux' {
  interface DefaultRootState extends ApplicationState {}
}
