import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { howItWorks, testimonials, faqItems, benefits, awards } from "../data/marketplaceData";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Trusted by 10,000+ Marketers Worldwide
            </span>
            <h1 className="hero-title">
              <span className="gradient-text">PR Distribution</span>
              <br />Made Simple
            </h1>
            <p className="hero-description">
              Distribute your content across <strong>40,000+</strong> websites and <strong>3,000+</strong> Telegram channels in 154 countries. 
              Trusted by SEO teams, PR professionals, and marketers to amplify their message.
            </p>
            <div className="hero-ctas">
              <Link to="/marketplace" className="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                Browse Catalog
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                How It Works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">40K+</span>
              <span className="stat-label">Websites</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">3K+</span>
              <span className="stat-label">Telegram Channels</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">154</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">75%</span>
              <span className="stat-label">48hr Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-brands">
        <div className="container">
          <p className="brands-label">Trusted by teams at</p>
          <div className="brands-grid">
            <span className="brand-name">TechStart</span>
            <span className="brand-name">GrowthLabs</span>
            <span className="brand-name">BrandVoice</span>
            <span className="brand-name">MediaMax</span>
            <span className="brand-name">CryptoNews</span>
          </div>
        </div>
      </section>

      <section className="awards-section">
        <div className="container">
          <div className="awards-header">
            <span className="section-badge">Recognition</span>
            <h2 className="section-title">Trusted & Awarded</h2>
            <p className="section-description">Recognized by industry leaders for excellence</p>
          </div>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-card glass">
                <div className="award-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div className="award-content">
                  <h4>{award.name}</h4>
                  <span className="award-source">{award.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">How PR-Hive Works</h2>
            <p className="section-description">Get your content published in four easy steps</p>
          </div>

          <div className="steps-grid">
            {howItWorks.map((step) => (
              <div key={step.step} className="step-card glass">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">
                  {step.icon === 'project' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                  )}
                  {step.icon === 'browse' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.3-4.3"/>
                      <path d="M11 8v6"/>
                      <path d="M8 11h6"/>
                    </svg>
                  )}
                  {step.icon === 'submit' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17,8 12,3 7,8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  )}
                  {step.icon === 'track' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  )}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-description">Powerful features designed for modern marketers</p>
          </div>

          <div className="features-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="feature-card glass">
                <div className="feature-icon">
                  {benefit.icon === 'support' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  )}
                  {benefit.icon === 'money' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  )}
                  {benefit.icon === 'chat' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  )}
                  {benefit.icon === 'metrics' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  )}
                  {benefit.icon === 'unique' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  )}
                  {benefit.icon === 'analytics' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                      <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                    </svg>
                  )}
                  {benefit.icon === 'fast' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  )}
                  {benefit.icon === 'filter' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                  )}
                  {benefit.icon === 'reviews' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  )}
                  {benefit.icon === 'shield' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  )}
                  {benefit.icon === 'payment' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  )}
                </div>
                <h3 className="feature-title">{benefit.title}</h3>
                <p className="feature-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Success Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-description">Real results from real marketers</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card glass">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role} at {testimonial.company}</span>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-result">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{testimonial.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="guarantees">
        <div className="container">
          <div className="guarantee-content glass">
            <div className="guarantee-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div className="guarantee-text">
              <h3>100% Satisfaction Guaranteed</h3>
              <p>Free 3-month guarantee against deletion. Additional paid 1-year guarantee available. Your investment is protected.</p>
            </div>
            <Link to="/marketplace" className="btn-primary">Get Started Risk-Free</Link>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">Everything you need to know about PR-Hive</p>
          </div>

          <div className="faq-list">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item glass ${openFaq === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-icon">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-glow"></div>
        <div className="container">
          <h2 className="cta-title">Ready to Amplify Your Message?</h2>
          <p className="cta-description">Join 10,000+ marketers already growing with PR-Hive. Start your first campaign today.</p>
          <div className="cta-buttons">
            <Link to="/marketplace" className="btn-primary btn-lg">
              Start Free Campaign
            </Link>
            <Link to="/dashboard" className="btn-secondary btn-lg">
              Track Campaigns
            </Link>
          </div>
          <p className="cta-note">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 className="footer-logo">PR-Hive</h3>
              <p>The leading PR distribution marketplace. Trusted by marketers worldwide.</p>
              <div className="footer-social">
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h4>For Advertisers</h4>
              <ul>
                <li><Link to="/marketplace">Website Catalog</Link></li>
                <li><Link to="/marketplace">Telegram Channels</Link></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Case Studies</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>For Buyers</h4>
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Spend Calculator</a></li>
                <li><a href="#">Buyer Guidelines</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 PR-Hive. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          padding: 8rem 0 5rem;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          pointer-events: none;
          animation: pulse 8s ease-in-out infinite;
        }

        .hero-glow-2 {
          position: absolute;
          top: 50%;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 70%);
          pointer-events: none;
          animation: float 10s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 50px;
          font-size: 0.9rem;
          color: var(--accent-primary);
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease-out;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .hero-description strong {
          color: var(--accent-primary);
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 4px 20px var(--accent-glow);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px var(--accent-glow);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: var(--bg-tertiary);
          border-color: var(--accent-primary);
        }

        .btn-lg {
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          margin-top: 5rem;
          padding: 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .stat-divider {
          width: 1px;
          height: 50px;
          background: var(--border-color);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .trusted-brands {
          padding: 3rem 0;
          background: var(--bg-secondary);
        }

        .awards-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
        }

        .awards-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .award-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .award-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .award-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fbbf24;
          flex-shrink: 0;
        }

        .award-content h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .award-source {
          font-size: 0.75rem;
          color: var(--accent-primary);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .awards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .awards-grid {
            grid-template-columns: 1fr;
          }
        }

        .brands-label {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .brands-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-muted);
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .brand-name:hover {
          opacity: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.75rem;
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .how-it-works {
          padding: 8rem 0;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .step-card {
          padding: 2.5rem 1.5rem;
          border-radius: 20px;
          text-align: center;
          position: relative;
          transition: all 0.3s;
        }

        .step-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-primary);
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
        }

        .step-icon {
          width: 64px;
          height: 64px;
          margin: 1rem auto 1.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .step-title {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }

        .step-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .features {
          padding: 8rem 0;
          background: var(--bg-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          padding: 2rem;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .feature-icon svg {
          color: white;
        }

        .feature-title {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .testimonials {
          padding: 8rem 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .testimonial-card {
          padding: 2rem;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 0.9rem;
        }

        .testimonial-author h4 {
          font-size: 0.95rem;
          margin-bottom: 0.15rem;
        }

        .testimonial-author span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .testimonial-rating {
          display: flex;
          gap: 2px;
          margin-left: auto;
        }

        .testimonial-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.25rem;
          font-style: italic;
        }

        .testimonial-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #22c55e;
        }

        .guarantees {
          padding: 4rem 0;
        }

        .guarantee-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2.5rem;
          border-radius: 20px;
        }

        .guarantee-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .guarantee-icon svg {
          color: white;
        }

        .guarantee-text {
          flex: 1;
        }

        .guarantee-text h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .guarantee-text p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .faq {
          padding: 8rem 0;
          background: var(--bg-secondary);
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          padding: 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .faq-item:hover {
          border-color: var(--accent-primary);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          gap: 1rem;
        }

        .faq-icon {
          transition: transform 0.3s;
          flex-shrink: 0;
        }

        .faq-item.open .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease-out;
        }

        .faq-item.open .faq-answer {
          max-height: 200px;
          padding-top: 1rem;
        }

        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .cta-final {
          position: relative;
          padding: 8rem 0;
          text-align: center;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .cta-description {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          position: relative;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }

        .cta-note {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          position: relative;
        }

        .footer {
          padding: 5rem 0 2rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-brand p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .footer-social a {
          width: 40px;
          height: 40px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s;
        }

        .footer-social a:hover {
          background: var(--accent-primary);
          color: white;
        }

        .footer-links h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .footer-bottom p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-legal a:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }

          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid,
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 6rem 0 4rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .stat-divider {
            width: 50px;
            height: 1px;
          }

          .section-title {
            font-size: 2rem;
          }

          .steps-grid,
          .features-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .guarantee-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-legal {
            flex-wrap: wrap;
            justify-content: center;
          }

          .cta-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
