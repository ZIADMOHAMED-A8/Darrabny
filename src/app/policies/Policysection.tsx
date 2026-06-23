export default function PolicySection({ section, children }) {
    return (
      <section className="policy-section">
        <div className="section-header">
          <div className={`section-icon icon-${section.iconStyle}`}>
            {section.icon}
          </div>
          <div>
            <h2>{section.title}</h2>
            <p className="section-subtitle">{section.subtitle}</p>
          </div>
        </div>
  
        {children}
  
        {section.rules && (
          <ul className="rules-list">
            {section.rules.map((rule, i) => (
              <li key={i} className="rule">
                <span className="rule-num">{i + 1}</span>
                <span className="rule-text">{rule.text}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  } 