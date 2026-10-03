// Schematic UI illustrations, drawn in HTML/CSS/SVG.
// They stand in for confidential enterprise screens and stay crisp at any size.
// `variant: 'wire'` renders the same layout as a low-fidelity wireframe.

const bars = (n, cls = 'sk') => Array.from({ length: n }, () => `<i class="${cls}"></i>`).join('');

const chrome = (inner, label) => `
  <div class="mock-win">
    <div class="mock-top"><span></span><span></span><span></span><em>${label}</em></div>
    ${inner}
  </div>`;

const dashboard = () =>
  chrome(
    `<div class="mk-dash">
      <div class="mk-kpis">
        ${['Revenue', 'EBITDA', 'Gross Margin', 'YoY'].map((k) => `<div class="mk-kpi"><small>${k}</small><b class="sk sk-lg"></b><i class="sk sk-xs acc"></i></div>`).join('')}
      </div>
      <div class="mk-tabs"><span class="on">MTD</span><span>QTD</span><span>YTD</span></div>
      <div class="mk-charts">
        <svg class="mk-line" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
          <path class="grid" d="M0 30H300M0 60H300M0 90H300"/>
          <path class="area" d="M0 95 L40 80 L80 86 L120 60 L160 66 L200 40 L240 46 L300 20 L300 120 L0 120Z"/>
          <path class="ln" d="M0 95 L40 80 L80 86 L120 60 L160 66 L200 40 L240 46 L300 20"/>
          <path class="ln2" d="M0 100 L40 92 L80 90 L120 80 L160 76 L200 66 L240 64 L300 52"/>
        </svg>
        <div class="mk-bars">${[60, 82, 45, 70, 92, 55].map((h) => `<i style="--v:${h}%"></i>`).join('')}</div>
      </div>
    </div>`,
    'Corporate MIS'
  );

const planner = () =>
  chrome(
    `<div class="mk-plan">
      <div class="mk-plan-head"><b>Batch plan</b>${bars(6, 'sk sk-xs')}</div>
      ${[
        [0, 3],
        [1, 4],
        [2, 2],
        [3, 3],
        [1, 2],
        [4, 2],
      ]
        .map(
          ([s, w], i) => `<div class="mk-row"><span class="mk-id">B-${String(i + 1).padStart(2, '0')}</span><div class="mk-track"><i class="st${i % 3}" style="--s:${s};--w:${w}"></i></div></div>`
        )
        .join('')}
      <div class="mk-legend"><span class="st0">Planned</span><span class="st1">In progress</span><span class="st2">Completed</span></div>
    </div>`,
    'MANTRA · Production Planner'
  );

const phone = (inner) => `<div class="mk-phone"><div class="mk-notch"></div>${inner}</div>`;
const mobile = () => `
  <div class="mk-phones">
    ${phone(`<div class="mk-ph-title">Renewals due</div>${[0, 1, 2, 1].map((s) => `<div class="mk-card"><i class="sk"></i><i class="sk sk-sm"></i><span class="pill p${s}"></span></div>`).join('')}`)}
    ${phone(`<div class="mk-ph-title">Register policy</div><div class="mk-steps"><i class="on"></i><i class="on"></i><i></i><i></i></div>${bars(4, 'mk-field')}<div class="mk-btn">Continue</div>`)}
    ${phone(`<div class="mk-ph-title">Approval</div><div class="mk-card big"><i class="sk"></i><i class="sk sk-sm"></i><i class="sk sk-sm"></i></div><div class="mk-actions"><span>Reject</span><span class="pri">Approve</span></div>`)}
  </div>`;

const commerce = () =>
  chrome(
    `<div class="mk-shop">
      <aside>${bars(6, 'sk sk-sm')}</aside>
      <div class="mk-grid">${Array.from({ length: 6 }, () => `<div class="mk-prod"><div class="ph"></div><i class="sk"></i><i class="sk sk-sm"></i><span class="add">+</span></div>`).join('')}</div>
      <div class="mk-cart"><b>Order</b>${bars(4, 'sk')}<div class="mk-btn">Place order</div></div>
    </div>`,
    'CSU · Online Ordering'
  );

const portal = () =>
  chrome(
    `<div class="mk-portal">
      <div class="mk-search"><span>⌕</span> Search applications</div>
      <div class="mk-apps">${Array.from({ length: 8 }, (_, i) => `<div class="mk-app"><i class="ic" style="--i:${i}"></i><i class="sk sk-sm"></i></div>`).join('')}</div>
    </div>
    <div class="mk-login"><b>Welcome back</b><div class="mk-field"></div><div class="mk-field"></div><div class="mk-btn">Sign in</div></div>`,
    'Caplin Connect'
  );

const form = () =>
  chrome(
    `<div class="mk-form">
      <div class="mk-profile"><div class="av"></div><i class="sk"></i><i class="sk sk-sm"></i>${bars(3, 'sk sk-xs')}</div>
      <div class="mk-dep">
        ${['Country', 'State', 'City'].map((l, i) => `<div class="mk-sel${i === 2 ? ' open' : ''}"><small>${l}</small><div class="mk-field"><span>▾</span></div></div>${i < 2 ? '<div class="mk-arrow">↓</div>' : ''}`).join('')}
        <div class="mk-ajax"><i></i>AJAX · updated without reload</div>
      </div>
    </div>`,
    'Matrimonial · Profile'
  );

const MOCKS = { dashboard, planner, mobile, commerce, portal, form };

export function mock(type, { variant = '', hue = 30 } = {}) {
  const fn = MOCKS[type] || dashboard;
  return `<div class="mock mock--${type}${variant ? ` mock--${variant}` : ''}" style="--h:${hue}" aria-hidden="true">${fn()}</div>`;
}
