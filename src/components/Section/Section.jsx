import clsx from 'clsx';

import css from './Section.module.css';

const Section = ({ children, className, ...props }) => {
  return (
    <section className={clsx(className, css.section)} {...props}>
      {children}
    </section>
  );
};

export default Section;
