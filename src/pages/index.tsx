import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroTitleRow}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <Link to="https://lemmalegal.com" className={styles.lemmaAttribution}>
            <span className={styles.lemmaAttrText}>by</span>
            <img src="/img/lemma_logo_white.svg" alt="Lemma Legal" className={styles.lemmaAttrLogo} />
          </Link>
        </div>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}
            to="https://outlook.office.com/book/LemmaLegal1@lemmalegal.com/s/SnPc6a2_OUCAMHLWlbXHYQ2?ismsaljsauthenabled">
            Request Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

function PricingCard({title, users, price, features, highlight = false}) {
  return (
    <div className={clsx('card', styles.pricingCard, highlight && styles.pricingCardHighlight)}>
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
        <p className={styles.userRange}>{users}</p>
      </div>
      <div className="card__body">
        <div className={styles.price}>{price}</div>
        <ul className={styles.featureList}>
          {features.map((f, i) => <li key={i}>✓ {f}</li>)}
        </ul>
      </div>
      <div className="card__footer">
        <Link className="button button--primary button--block" to="https://outlook.office.com/book/LemmaLegal1@lemmalegal.com/s/SnPc6a2_OUCAMHLWlbXHYQ2?ismsaljsauthenabled">
          {title === 'Organization' ? 'Contact Us' : 'Get Started'}
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <section className={styles.pullQuote}>
        <div className="container">
          <figure className={styles.pullQuoteFigure}>
            <div className={styles.pullQuoteDecorOpen}>&ldquo;</div>
            <blockquote className={styles.pullQuoteText}>
              WorkflowDocs lets you automate powerful documents straight from your case management system, without the complex interview build process.
            </blockquote>
            <div className={styles.pullQuoteDecorClose}>&rdquo;</div>
            <figcaption className={styles.pullQuoteAttribution}>
              <img
                src="/img/quinten_steenhuis.jpg"
                alt="Quinten Steenhuis"
                className={styles.pullQuoteAvatar}
              />
              <div>
                <strong>Quinten Steenhuis</strong>
                <span>Founder, WorkflowDocs and LemmaLegal</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <main>
        <section className={clsx('landing-section', styles.features)}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <Heading as="h3">Smart templates</Heading>
                  <p>Dynamic logic shows only what matters. No full questionnaire build required. AI tools help you draft templates in one click, with the full power of Docassemble.</p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <Heading as="h3">AI drafting when you want it</Heading>
                  <p>No template? No problem. Use closed AI to generate custom documents anchored on your case data.</p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <Heading as="h3">Document and signature collection</Heading>
                  <p>Need a document? No problem. Send your client an easy upload link and get documents back in the case file in minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx('landing-section', styles.alternateBg)}>
          <div className="container">
            <Heading as="h2" className="text--center">One solution. Everything you need.</Heading>
            <p className="text--center" style={{fontSize: '1.2rem', marginBottom: '3rem'}}>Stop juggling multiple tools. WorkflowDocs replaces them all with a single, integrated platform.</p>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="card" style={{padding: '2rem', border: '2px solid #2563eb'}}>
                   <Heading as="h3" style={{color: '#2563eb'}}>✓ End phone tag forever</Heading>
                   <p>Stop chasing hard-to-reach clients. Get complete case information without the back and forth. WorkflowDocs guides clients through everything they need to provide—on their own time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="container">
            <Heading as="h2" className="text--center">Simple, transparent pricing</Heading>
            <div className="row">
              <div className="col col--3">
                <PricingCard 
                  title="Starter" 
                  users="1-10 users" 
                  price="$149 + $11/user" 
                  features={['1-click templates', 'AI questionnaires', 'eSignatures']} 
                />
              </div>
              <div className="col col--3">
                <PricingCard 
                  title="Growth" 
                  users="11-50 users" 
                  price="$149 + $9/user" 
                  highlight={true}
                  features={['Everything in Starter', 'Advanced automation', 'Priority support']} 
                />
              </div>
              <div className="col col--3">
                <PricingCard 
                  title="Professional" 
                  users="51-200 users" 
                  price="$299 + $7/user" 
                  features={['Everything in Growth', 'Custom integrations', 'Dedicated support']} 
                />
              </div>
              <div className="col col--3">
                <PricingCard 
                  title="Organization" 
                  users="200+ users" 
                  price="Custom" 
                  features={['Everything in Professional', 'Multi-office support', 'Tailored workflows']} 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container landing-section" style={{textAlign: 'center'}}>
           <Heading as="h2">Trusted by</Heading>
           <div style={{display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginTop: '2rem'}}>
              <img src="/img/gbls_logo.gif" alt="GBLS" style={{height: '60px'}} />
              <img src="/img/mmls_logo.png" alt="MMLS" style={{height: '60px'}} />
              <img src="/img/slsct_logo.png" alt="SLSCT" style={{height: '60px'}} />
           </div>
        </section>
      </main>
    </Layout>
  );
}
