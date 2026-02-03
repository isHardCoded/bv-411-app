import { cn } from '../../shared/lib/cn';
import s from './styles.module.css';

export const Avatar = ({ src, size = 'default', className }) => {
  // TODO: доделать компонент аватарки
  if (!src) {
    <div className={cn(s.root, s[size], className)}></div>;
  }

  return <></>;
};
