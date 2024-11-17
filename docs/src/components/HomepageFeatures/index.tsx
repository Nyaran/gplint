import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Configurable',
    icon: '⚙️',
    description: (
      <>
		  GPLint rules are configurable by its own configuration file, allowing to enable/disable rules and adapt them to your needs.
      </>
    ),
  },
  {
    title: 'Extendable',
    icon: '🖇️',
    description: (
      <>
		   If the included rules are not enough for you, you can extend with your own rule files (Of course, if you think it could be useful to others, you can make a PR).
      </>
    ),
  },
  {
    title: 'Autofix',
    icon: '🪄',
    description: (
      <>
		   Some rules implement the autofix option, to easily fix the problems on your Gherkin files.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx(`${styles.featureContainer} col col--4`)}>
      <div className={`text--center padding-horiz--md`}>
		  <Heading as="h3">
			  <span className={styles.featureIcon}>{icon}</span>
			  <span className={styles.featureTitle}>{title}</span>
		  </Heading>
		  <p>{description}</p>
	  </div>
	</div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
    </section>
  );
}
