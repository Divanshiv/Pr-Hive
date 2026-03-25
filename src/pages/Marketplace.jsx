import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { websiteListings, telegramChannels, categories, countries, languages } from "../data/marketplaceData";
import { useApp } from "../context/AppContext";

export default function Marketplace() {
  const { toggleSave, saved } = useApp();
  const [activeTab, setActiveTab] = useState('websites');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [drRange, setDrRange] = useState([0, 100]);
  const [urRange, setUrRange] = useState([0, 100]);
  const [trafficRange, setTrafficRange] = useState([0, 5000000]);
  const [keywords, setKeywords] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredWebsites = useMemo(() => {
    return websiteListings
      .filter(site => selectedCategory === 'All Categories' || site.category === selectedCategory)
      .filter(site => selectedCountry === 'all' || site.geoBreakdown[selectedCountry])
      .filter(site => site.price >= priceRange[0] && site.price <= priceRange[1])
      .filter(site => site.dr >= drRange[0] && site.dr <= drRange[1])
      .filter(site => site.traffic >= trafficRange[0] && site.traffic <= trafficRange[1])
      .filter(site => selectedLanguage === 'all' || site.language === selectedLanguage || !site.language)
      .filter(site => {
        if (!keywords) return true;
        const kw = keywords.toLowerCase();
        return (
          site.domain?.toLowerCase().includes(kw) ||
          site.name?.toLowerCase().includes(kw) ||
          site.description?.toLowerCase().includes(kw) ||
          site.categories?.some(c => c.toLowerCase().includes(kw))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'traffic') return b.traffic - a.traffic;
        if (sortBy === 'dr-high') return b.dr - a.dr;
        return 0;
      });
  }, [selectedCategory, selectedCountry, selectedLanguage, priceRange, drRange, trafficRange, keywords, sortBy]);

  const filteredChannels = useMemo(() => {
    return telegramChannels
      .filter(ch => selectedCategory === 'All Categories' || ch.category === selectedCategory)
      .filter(ch => selectedCountry === 'all' || ch.flags.includes(selectedCountry))
      .filter(ch => ch.price >= priceRange[0] && ch.price <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'followers') return b.followers - a.followers;
        return 0;
      });
  }, [selectedCategory, selectedCountry, priceRange, sortBy]);

  const paginatedWebsites = filteredWebsites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedChannels = filteredChannels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = activeTab === 'websites' ? Math.ceil(filteredWebsites.length / itemsPerPage) : Math.ceil(filteredChannels.length / itemsPerPage);

  const formatTraffic = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const getCountryFlag = (code) => {
    const flags = {
      usa: '🇺🇸', uk: '🇬🇧', canada: '🇨🇦', australia: '🇦🇺', germany: '🇩🇪',
      france: '🇫🇷', india: '🇮🇳', uae: '🇦🇪', japan: '🇯🇵', singapore: '🇸🇬',
      brazil: '🇧🇷', italy: '🇮🇹', spain: '🇪🇸', poland: '🇵🇱', ukraine: '🇺🇦',
      indonesia: '🇮🇩', netherlands: '🇳🇱', portugal: '🇵🇹', vietnam: '🇻🇳',
      pakistan: '🇵🇰', nigeria: '🇳🇬', kenya: '🇰🇪', thailand: '🇹🇭', malaysia: '🇲🇾',
      philippines: '🇵🇭', sweden: '🇸🇪', norway: '🇳🇴', finland: '🇫🇮', denmark: '🇩🇰',
      romania: '🇷🇴', hungary: '🇭🇺', bulgaria: '🇧🇬', greece: '🇬🇷', turkey: '🇹🇷',
      saudi: '🇸🇦'
    };
    return flags[code] || '🌍';
  };

  return (
    <div className="marketplace-page">
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              PR Distribution <br />
              <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="hero-description">
              Distribute your content across <strong>40,000+</strong> websites and <strong>3,000+</strong> Telegram channels worldwide.
              Trusted by SEO teams, PR pros, and marketers.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="btn-primary">Browse Catalog</a>
              <a href="/dashboard" className="btn-secondary">For Publishers</a>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-card glass">
              <span className="stat-value">40,049</span>
              <span className="stat-label">Websites</span>
            </div>
            <div className="stat-card glass">
              <span className="stat-value">3,063</span>
              <span className="stat-label">Telegram Channels</span>
            </div>
            <div className="stat-card glass">
              <span className="stat-value">7,500+</span>
              <span className="stat-label">with Real Analytics</span>
            </div>
            <div className="stat-card glass">
              <span className="stat-value">154</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="catalog-section">
        <div className="container">
          <div className="catalog-header">
            <div className="tabs-wrapper">
              <button 
                className={`tab-btn ${activeTab === 'websites' ? 'active' : ''}`}
                onClick={() => { setActiveTab('websites'); setCurrentPage(1); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Websites
              </button>
              <button 
                className={`tab-btn ${activeTab === 'telegram' ? 'active' : ''}`}
                onClick={() => { setActiveTab('telegram'); setCurrentPage(1); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.093.034.305.019.472z"/>
                </svg>
                Telegram Channels
              </button>
            </div>
            <div className="catalog-info">
              <span className="found-count">
                Found <strong>{activeTab === 'websites' ? filteredWebsites.length : filteredChannels.length}</strong> {activeTab === 'websites' ? 'websites' : 'channels'}
              </span>
              <div className="sort-wrapper">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  {activeTab === 'websites' && <option value="traffic">Most Traffic</option>}
                  {activeTab === 'websites' && <option value="dr-high">Highest DR</option>}
                  {activeTab === 'telegram' && <option value="followers">Most Followers</option>}
                </select>
              </div>
            </div>
          </div>

          <div className="catalog-layout">
            <aside className="filters-sidebar glass">
              <div className="filter-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filters
              </div>

              <div className="filter-section">
                <h4>Category</h4>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <h4>Country</h4>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <h4>Price Range (USD)</h4>
                <div className="price-inputs">
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    placeholder="Min"
                  />
                  <span>—</span>
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    placeholder="Max"
                  />
                </div>
              </div>

              {activeTab === 'websites' && (
                <>
              <div className="filter-section">
                <h4>Domain Rating (DR)</h4>
                <div className="range-display">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={drRange[1]} 
                    onChange={(e) => setDrRange([drRange[0], +e.target.value])}
                  />
                  <span className="range-value">0 - {drRange[1]}</span>
                </div>
              </div>

              <div className="filter-section">
                <h4>URL Rating (UR)</h4>
                <div className="range-display">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={urRange[1]} 
                    onChange={(e) => setUrRange([urRange[0], +e.target.value])}
                  />
                  <span className="range-value">0 - {urRange[1]}</span>
                </div>
              </div>

              <div className="filter-section">
                <h4>Language</h4>
                <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <h4>Keywords</h4>
                <input 
                  type="text" 
                  placeholder="Search keywords..." 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div className="filter-section">
                <h4>Traffic</h4>
                    <select onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'all') setTrafficRange([0, 5000000]);
                      else if (val === 'low') setTrafficRange([0, 50000]);
                      else if (val === 'med') setTrafficRange([50000, 200000]);
                      else if (val === 'high') setTrafficRange([200000, 1000000]);
                      else if (val === 'vh') setTrafficRange([1000000, 5000000]);
                    }}>
                      <option value="all">All Traffic</option>
                      <option value="low">Under 50K</option>
                      <option value="med">50K - 200K</option>
                      <option value="high">200K - 1M</option>
                      <option value="vh">1M+</option>
                    </select>
                  </div>
                </>
              )}

              <button className="reset-btn" onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedCountry('all');
                setSelectedLanguage('all');
                setPriceRange([0, 500]);
                setDrRange([0, 100]);
                setUrRange([0, 100]);
                setTrafficRange([0, 5000000]);
                setKeywords('');
                setSortBy('rating');
                setCurrentPage(1);
              }}>
                Reset Filters
              </button>
            </aside>

            <div className="listings-area">
              {activeTab === 'websites' ? (
                <div className="website-listings">
                  {paginatedWebsites.map(site => {
                    const isSaved = saved.find(i => i.id === site.id);
                    return (
                      <div key={site.id} className="listing-card glass">
                        <button 
                          onClick={() => toggleSave(site)} 
                          className={`save-btn ${isSaved ? 'saved' : ''}`}
                          title={isSaved ? 'Remove from saved' : 'Save to favorites'}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                        </button>
                        <div className="card-header">
                          <div className="domain-info">
                            <span className="country-flags">
                              {site.flags.slice(0, 3).map(f => getCountryFlag(f)).join(' ')}
                            </span>
                            <div>
                              <Link to={`/details/${site.id}`} className="domain-name-link">
                                <h3 className="domain-name">{site.domain}</h3>
                              </Link>
                              <span className="category-text">{site.category}</span>
                            </div>
                          </div>
                          <div className="rating-badge">
                            <span className="rating-score">Excellent {site.rating}</span>
                            <span className="review-count">{site.reviews} reviews</span>
                          </div>
                        </div>

                        <div className="card-tags">
                          <span className="placement-tag">{site.placementType}</span>
                          {site.placementDiscount > 0 && (
                            <span className="discount-tag">-{site.placementDiscount}%</span>
                          )}
                        </div>

                        <p className="listing-description">{site.description}</p>

                        <div className="listing-categories">
                          {site.categories.map(cat => (
                            <span key={cat} className="category-tag">{cat}</span>
                          ))}
                        </div>

                        <div className="listing-metrics">
                          <div className="metric-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                            </svg>
                            <span className="metric-value">{formatTraffic(site.traffic)}</span>
                            <span className="metric-label">per month</span>
                            {site.trafficGrowth > 0 && (
                              <span className="growth-badge">+{site.trafficGrowth}%</span>
                            )}
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">DR</span>
                            <span className="metric-value">{site.dr}</span>
                          </div>
                        </div>

                        <div className="card-footer">
                          <div className="price-block">
                            <span className="final-price">${site.price}.00</span>
                            <span className="bonus-text">+${site.bonus}.00 bonus</span>
                          </div>
                          <Link to={`/details/${site.id}`} className="buy-btn">View Details</Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="telegram-listings">
                  {paginatedChannels.map(ch => {
                    const isSaved = saved.find(i => i.id === ch.id);
                    return (
                      <div key={ch.id} className="listing-card glass">
                        <button 
                          onClick={() => toggleSave(ch)} 
                          className={`save-btn ${isSaved ? 'saved' : ''}`}
                          title={isSaved ? 'Remove from saved' : 'Save to favorites'}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                        </button>
                        <div className="card-header">
                          <div className="channel-info">
                            <div className="channel-avatar">{ch.name.charAt(0)}</div>
                            <div>
                              <Link to={`/details/${ch.id}`} className="domain-name-link">
                                <h3 className="channel-name">{ch.name}</h3>
                              </Link>
                              <span className="channel-username">{ch.username}</span>
                            </div>
                          </div>
                          <div className="rating-badge">
                            <span className="rating-score">Excellent {ch.rating}</span>
                            <span className="review-count">{ch.reviews} reviews</span>
                          </div>
                        </div>

                        <p className="listing-description">{ch.description}</p>

                        <div className="listing-categories">
                          <span className="category-tag">{ch.category}</span>
                        </div>

                        <div className="listing-metrics">
                          <div className="metric-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span className="metric-value">{ch.followers.toLocaleString()}</span>
                            <span className="metric-label">Followers</span>
                            <span className="growth-badge">+{ch.followersGrowth}</span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">Avg Reach</span>
                            <span className="metric-value">{ch.avgReach.toLocaleString()}</span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">Engagement</span>
                            <span className="metric-value">{ch.engagement}%</span>
                          </div>
                        </div>

                        <div className="card-footer">
                          <div className="price-block">
                            <span className="final-price">${ch.price}</span>
                          </div>
                          <Link to={`/details/${ch.id}`} className="buy-btn">View Details</Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
                  <button 
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .marketplace-page {
          min-height: 100vh;
        }

        .hero-section {
          position: relative;
          padding: 6rem 0 4rem;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        .hero-description strong {
          color: var(--accent-primary);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 4px 20px var(--accent-glow);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: var(--bg-tertiary);
          border-color: var(--accent-primary);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .stat-card {
          padding: 1.5rem;
          border-radius: 1rem;
          text-align: center;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: var(--accent-primary);
        }

        .stat-value {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .catalog-section {
          padding: 4rem 0;
        }

        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tabs-wrapper {
          display: flex;
          gap: 0.25rem;
          background: var(--bg-secondary);
          padding: 0.25rem;
          border-radius: 12px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: var(--text-primary);
        }

        .tab-btn.active {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .catalog-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .found-count {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .found-count strong {
          color: var(--text-primary);
        }

        .sort-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-wrapper label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .sort-wrapper select {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .catalog-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2rem;
        }

        .filters-sidebar {
          padding: 1.5rem;
          border-radius: 16px;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .filter-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-section {
          margin-bottom: 1.5rem;
        }

        .filter-section h4 {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-section select,
        .filter-section input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-inputs input {
          width: 70px;
        }

        .range-display {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .range-display input[type="range"] {
          width: 100%;
        }

        .range-value {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .reset-btn {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .reset-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .listings-area {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .listing-card {
          padding: 1.5rem;
          border-radius: 16px;
          transition: all 0.3s;
          position: relative;
        }

        .listing-card:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-glow);
        }

        .save-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s;
          z-index: 10;
        }

        .save-btn:hover {
          transform: scale(1.15);
          border-color: var(--accent-primary);
          background: var(--bg-secondary);
          color: var(--accent-primary);
        }

        .save-btn.saved {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(139, 92, 246, 0.1);
        }

        .domain-name-link {
          color: inherit;
        }

        .domain-name-link:hover h3 {
          color: var(--accent-primary);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .domain-info,
        .channel-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .country-flags {
          font-size: 1.25rem;
        }

        .domain-name,
        .channel-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .category-text,
        .channel-username {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .channel-avatar {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }

        .rating-badge {
          text-align: right;
        }

        .rating-score {
          display: block;
          font-weight: 600;
          color: #22c55e;
          font-size: 0.9rem;
        }

        .review-count {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .card-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .placement-tag {
          background: rgba(139, 92, 246, 0.2);
          color: var(--accent-primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .discount-tag {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .listing-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .listing-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .category-tag {
          background: var(--bg-tertiary);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .listing-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .metric-value {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .growth-badge {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .price-block {
          display: flex;
          flex-direction: column;
        }

        .final-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .bonus-text {
          font-size: 0.8rem;
          color: #22c55e;
        }

        .buy-btn {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          box-shadow: 0 4px 15px var(--accent-glow);
        }

        .buy-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .page-btn {
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-weight: 500;
        }

        .page-btn:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--accent-primary);
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .catalog-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            position: static;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .catalog-header {
            flex-direction: column;
            align-items: stretch;
          }

          .tabs-wrapper {
            justify-content: center;
          }

          .catalog-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
