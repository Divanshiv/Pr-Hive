import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { websiteListings, telegramChannels, detailedReviews, defaultReviews, generateTrafficHistory } from "../data/marketplaceData";
import { useApp } from "../context/AppContext";

const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";

function TrafficGrowthChart({ trafficHistory, growthRate }) {
  const maxValue = Math.max(...trafficHistory.map(d => d.value));
  const minValue = Math.min(...trafficHistory.map(d => d.value));
  const chartWidth = 500;
  const chartHeight = 150;
  const padding = 30;

  const points = trafficHistory.map((d, i) => {
    const x = padding + (i / (trafficHistory.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((d.value - minValue) / (maxValue - minValue || 1)) * (chartHeight - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h4>Traffic Growth</h4>
        <span className={`growth-indicator ${growthRate >= 0 ? 'positive' : 'negative'}`}>
          {growthRate >= 0 ? '+' : ''}{growthRate}% (6 months)
        </span>
      </div>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="traffic-chart">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#chartGradient)" />
        <path d={pathD} fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="2" />
            <text x={p.x} y={chartHeight - 8} textAnchor="middle" className="chart-label">{p.month}</text>
          </g>
        ))}
      </svg>
      <div className="chart-legend">
        {points.map((p, i) => (
          <span key={i} className="legend-item">
            {p.month}: <strong>{p.value >= 1000000 ? (p.value / 1000000).toFixed(2) + 'M' : (p.value / 1000).toFixed(0) + 'K'}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function TrafficSourcesChart({ sources }) {
  const colors = {
    direct: '#8b5cf6',
    referral: '#d946ef',
    search: '#22c55e',
    social: '#f59e0b'
  };

  const data = [
    { name: 'Direct', value: sources.direct, color: colors.direct },
    { name: 'Referral', value: sources.referral, color: colors.referral },
    { name: 'Search', value: sources.search, color: colors.search },
    { name: 'Social', value: sources.social, color: colors.social }
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="sources-chart-container">
      <h4>Traffic Sources</h4>
      <div className="sources-content">
        <svg viewBox="0 0 160 160" className="pie-chart">
          {data.map((d, i) => {
            const dashLength = (d.value / 100) * circumference;
            const dashOffset = -offset;
            offset += dashLength;
            return (
              <circle
                key={i}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="24"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 80 80)"
              />
            );
          })}
          <circle cx="80" cy="80" r="36" fill="var(--bg-primary)" />
          <text x="80" y="78" textAnchor="middle" className="pie-center-value">100%</text>
          <text x="80" y="92" textAnchor="middle" className="pie-center-label">Sources</text>
        </svg>
        <div className="sources-legend">
          {data.map((d, i) => (
            <div key={i} className="source-item">
              <span className="source-dot" style={{ background: d.color }}></span>
              <span className="source-name">{d.name}</span>
              <span className="source-value">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`review-item ${expanded ? 'expanded' : ''}`}>
      <div className="review-header" onClick={() => setExpanded(!expanded)}>
        <div className="review-author">
          <div className="review-avatar">{review.publisher.charAt(0)}</div>
          <div className="review-meta">
            <strong>{review.publisher}</strong>
            <span>{review.company}</span>
          </div>
        </div>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24"
              fill={i < review.rating ? "#fbbf24" : "none"}
              stroke="#fbbf24" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <div className="review-date">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        <svg className="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div className="review-body">
        <p className="review-comment">"{review.comment}"</p>
        <div className="review-details">
          {review.benefits.length > 0 && (
            <div className="review-section benefits">
              <h5>✓ What they liked:</h5>
              <ul>
                {review.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          )}
          {review.disadvantages.length > 0 && (
            <div className="review-section disadvantages">
              <h5>✗ Could improve:</h5>
              <ul>
                {review.disadvantages.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewsSection({ siteId }) {
  const reviews = detailedReviews[siteId] || defaultReviews;

  return (
    <section className="reviews-section">
      <h3 className="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Customer Reviews ({reviews.length})
      </h3>
      <div className="reviews-list">
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

export default function Details() {
  const { id } = useParams();
  const { addToCart, toggleSave, saved } = useApp();

  const site = websiteListings.find((s) => s.id === parseInt(id)) || telegramChannels.find((c) => c.id === parseInt(id));
  const isChannel = !!site?.followers;
  const isSaved = saved.find((i) => i.id === site?.id);

  const trafficHistory = site && !isChannel ? generateTrafficHistory(site.traffic, site.trafficGrowth) : null;

  if (!site) {
    return (
      <div className="page-container">
        <div className="not-found">Listing not found.</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...site, price: site.price, name: site.domain || site.name });
  };

  return (
    <div className="page-container">
      <Link to="/marketplace" className="back-link">
        <span>←</span> Back to Marketplace
      </Link>

      <div className="details-layout">
        <div className="details-main">
          <div className="details-card glass">
            <div className="card-media">
              {!isChannel ? (
                <img src={site.image || fallbackImg} alt={site.domain || site.name} className="card-image" />
              ) : (
                <div className="channel-placeholder">
                  <div className="channel-avatar">{site.name.charAt(0)}</div>
                </div>
              )}
              <button
                onClick={() => toggleSave(site)}
                className="save-btn"
              >
                {isSaved ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="card-body">
              <h1 className="card-title">{site.domain || site.name}</h1>
              <div className="card-tags">
                <span className="tag">{site.category}</span>
                <span className="tag tag-verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Verified Ownership
                </span>
              </div>
            </div>
          </div>

          <section className="section">
            <h2 className="section-title">
              <span className="section-icon">📝</span>
              About this Asset
            </h2>
            <p className="section-text">
              {site.description || `This premium listing is highly ranked in the ${site.category} niche with incredible growth potential. It brings in consistent organic traffic backed by solid metrics and active monthly users.`}
            </p>
          </section>

          {!isChannel && site.trafficSources && (
            <section className="traffic-charts-section">
              <div className="charts-grid">
                <TrafficGrowthChart trafficHistory={trafficHistory} growthRate={site.trafficGrowth} />
                <TrafficSourcesChart sources={site.trafficSources} />
              </div>
            </section>
          )}

          {isChannel && (
            <section className="metrics-grid">
              <div className="metric-card glass">
                <h3 className="metric-title">Channel Metrics</h3>
                <div className="metric-rows">
                  <div className="metric-row">
                    <span>Followers</span>
                    <strong>{site.followers?.toLocaleString()}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Avg Reach</span>
                    <strong>{site.avgReach?.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <div className="metric-card glass">
                <h3 className="metric-title">Engagement</h3>
                <div className="metric-rows">
                  <div className="metric-row">
                    <span>Engagement Rate</span>
                    <strong>{site.engagement}%</strong>
                  </div>
                  <div className="metric-row">
                    <span>Growth</span>
                    <strong className="text-green">+{site.followersGrowth}%</strong>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!isChannel && (
            <ReviewsSection siteId={parseInt(id)} />
          )}
        </div>

        <aside className="details-sidebar">
          <div className="sidebar-card glass">
            <div className="price-block">
              <span className="price-label">
                <span className="live-dot"></span>
                Asking Price
              </span>
              <div className="price-value">
                ${site.price.toLocaleString()}
                <span className="price-cents">.00</span>
              </div>
              {site.bonus > 0 && (
                <div className="bonus-badge">
                  Includes ${site.bonus} cashback bonus
                </div>
              )}
            </div>

            <button onClick={handleAddToCart} className="add-cart-btn">
              Add to Cart
            </button>
            <button className="offer-btn">
              Make an Offer
            </button>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Secure Escrow Protection</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Fast Asset Transfer</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span>30 Days Post-Sale Support</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .page-container {
          padding: 2.5rem 0 5rem;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .not-found {
          padding: 8rem 0;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 2rem;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: var(--text-primary);
        }

        .details-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 3rem;
          align-items: start;
        }

        .details-card {
          border-radius: 1.5rem;
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .card-media {
          position: relative;
          height: 400px;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .channel-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-primary));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .channel-avatar {
          width: 128px;
          height: 128px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
        }

        .save-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 52px;
          height: 52px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .save-btn:hover {
          transform: scale(1.1);
        }

        .card-body {
          padding: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .card-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tag {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .tag-verified {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .section-icon {
          width: 32px;
          height: 32px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-text {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--border-color);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .metric-card {
          padding: 2rem;
          border-radius: 1rem;
          transition: border-color 0.3s;
        }

        .metric-card:hover {
          border-color: var(--accent-primary);
        }

        .metric-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        .metric-rows {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .metric-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .metric-row span {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .metric-row strong {
          font-size: 1.125rem;
          color: var(--text-primary);
        }

        .text-green {
          color: #22c55e !important;
        }

        .details-sidebar {
          position: sticky;
          top: 100px;
        }

        .sidebar-card {
          padding: 2rem;
          border-radius: 2rem;
          border-top: 3px solid var(--accent-secondary);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .price-block {
          margin-bottom: 1.5rem;
        }

        .price-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .price-value {
          font-size: 3rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .price-cents {
          font-size: 1.5rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .bonus-badge {
          margin-top: 0.75rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          display: inline-block;
        }

        .add-cart-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 20px var(--accent-glow);
          transition: all 0.3s;
        }

        .add-cart-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .offer-btn {
          width: 100%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .offer-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--accent-primary);
        }

        .features-list {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .feature-icon {
          font-size: 1.25rem;
        }

        @media (max-width: 1024px) {
          .details-layout {
            grid-template-columns: 1fr;
          }

          .details-sidebar {
            position: static;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .card-title {
            font-size: 1.75rem;
          }

          .price-value {
            font-size: 2rem;
          }
        }

        /* Traffic Charts */
        .traffic-charts-section {
          margin-bottom: 3rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .chart-container, .sources-chart-container {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .chart-header h4 {
          font-size: 1rem;
          font-weight: 600;
        }

        .growth-indicator {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .growth-indicator.positive {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .growth-indicator.negative {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .traffic-chart {
          width: 100%;
          height: auto;
        }

        .chart-label {
          fill: var(--text-secondary);
          font-size: 10px;
          font-family: var(--font-main);
        }

        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .legend-item {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-item strong {
          color: var(--text-primary);
        }

        /* Traffic Sources Pie Chart */
        .sources-chart-container h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .sources-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .pie-chart {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .pie-center-value {
          fill: var(--text-primary);
          font-size: 18px;
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .pie-center-label {
          fill: var(--text-secondary);
          font-size: 10px;
        }

        .sources-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .source-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .source-dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        .source-name {
          flex: 1;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .source-value {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        /* Reviews Section */
        .reviews-section {
          margin-bottom: 3rem;
        }

        .reviews-section .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .review-item:hover {
          border-color: var(--accent-primary);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          cursor: pointer;
        }

        .review-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 0.9rem;
        }

        .review-meta {
          display: flex;
          flex-direction: column;
        }

        .review-meta strong {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .review-meta span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .review-rating {
          display: flex;
          gap: 2px;
        }

        .review-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          min-width: 100px;
          text-align: right;
        }

        .expand-icon {
          color: var(--text-secondary);
          transition: transform 0.3s;
          flex-shrink: 0;
        }

        .review-item.expanded .expand-icon {
          transform: rotate(180deg);
        }

        .review-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .review-item.expanded .review-body {
          max-height: 500px;
        }

        .review-comment {
          padding: 0 1.25rem 1rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-style: italic;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1rem;
        }

        .review-details {
          padding: 0 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-section h5 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .review-section.benefits h5 {
          color: #22c55e;
        }

        .review-section.disadvantages h5 {
          color: #ef4444;
        }

        .review-section ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .review-section li {
          background: var(--bg-tertiary);
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }

          .sources-content {
            flex-direction: column;
          }

          .review-header {
            flex-wrap: wrap;
          }

          .review-date {
            order: 3;
            min-width: auto;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
