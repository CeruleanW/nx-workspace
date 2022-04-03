import React from 'react';

export default function ResumeSectionWrapper(props) {
  return (
    <section className={`mb-7 ${props.className}`}>
      {props.children}
    </section>
  );
}
