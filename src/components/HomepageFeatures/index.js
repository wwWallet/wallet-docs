import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/documentIcon.svg').default,
		Fa: (
			<i className='fa fa-3x fa-briefcase'></i>
		),
    description: (
      <>
        The Enterprise Verifier Core service was designed to work as an abstraction layer for the
				devolopers embracing the EBSI ecosystem.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/demoIcon.svg').default,
		Fa: (
			<i className='fa fa-3x fa-briefcase'></i>
		),
    description: (
      <>
        It lets you focus directly on the business logic of your appication, reducing
				the time to production.
      </>
    ),
  },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({Svg, Fa, title, description}) {
  return (
    <div className={clsx('col col--4')}>
			<link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css" />

      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
