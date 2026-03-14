'use client'

import { useState } from 'react'

const MOIS = [
  'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
  'T1', 'T2', 'T3', 'T4', 'Annuel'
]

const DATA: Record<string, { ca: string; dep: string; ben: string }> = {
  Jan: { ca: '3 120 €', dep: '890 €', ben: '2 230 €' },
  Fév: { ca: '5 840 €', dep: '1 100 €', ben: '4 740 €' },
  Mars: { ca: '8 240 €', dep: '1 380 €', ben: '6 860 €' },
  Avr: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Mai: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Juin: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Juil: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Août: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Sep: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Oct: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Nov: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Déc: { ca: '0 €', dep: '0 €', ben: '0 €' },
  T1: { ca: '17 200 €', dep: '3 370 €', ben: '13 830 €' },
  T2: { ca: '0 €', dep: '0 €', ben: '0 €' },
  T3: { ca: '0 €', dep: '0 €', ben: '0 €' },
  T4: { ca: '0 €', dep: '0 €', ben: '0 €' },
  Annuel: { ca: '17 200 €', dep: '3 370 €', ben: '13 830 €' },
}

export default function Exports() {
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')
  const [selection, setSelection] = useState('Récapitulatif mensuel')

  const d = DATA[moisSel] || DATA.Mars

  const exportsList = [
    {
      nom: 'Récapitulatif mensuel',
      sub: 'CA, dépenses, bénéfice, cotisations',
      badge: 'PDF',
      bc: '#fce8e8',
      bt: '#8a2a2a',
    },
    {
      nom: 'Journal des ventes',
      sub: 'Toutes commandes Shopify + PayPal',
      badge: 'CSV',
      bc: '#e8f4e8',
      bt: '#2a6a3a',
    },
    {
      nom: 'Journal des dépenses',
      sub: 'Factures avec justificatifs liés',
      badge: 'Excel',
      bc: '#e8f4e0',
      bt: '#1a6a20',
    },
    {
      nom: 'Rapport expert-comptable',
      sub: 'Format structuré, toutes catégories',
      badge: 'PDF',
      bc: '#fce8e8',
      bt: '#8a2a2a',
    },
    {
      nom: 'Export URSSAF — cotisations',
      sub: 'CA trimestriel prêt à déclarer',
      badge: 'CSV',
      bc: '#e8f4e8',
      bt: '#2a6a3a',
    },
  ]

  return (
    <main
      style={{
        minHeight: '100%',
        background: '#f0f4f8',
        padding: 16,
      }}
    >
      <style>{`
        .gf-page-shell {
          max-width: 1100px;
          margin: 0 auto;
        }

        .gf-topbar {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 18px 18px 10px;
          margin-bottom: 16px;
        }

        .gf-page-title {
          font-size: 24px;
          line-height: 1.2;
          font-weight: 600;
          color: #1a2e40;
          margin: 0 0 14px 0;
        }

        .gf-filter-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .gf-month-tab {
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
          color: #7090a8;
          background: transparent;
          border: 1px solid transparent;
          flex: 0 0 auto;
        }

        .gf-month-tab.active {
          color: #fff;
          background: #1a2535;
          border-color: #1a2535;
          font-weight: 600;
        }

        .gf-year-select {
          font-size: 12px;
          color: #5a7a95;
          border: 1px solid #c8d8e8;
          border-radius: 10px;
          padding: 8px 10px;
          background: #fff;
          cursor: pointer;
          flex: 0 0 auto;
        }

        .gf-content {
          max-width: 760px;
        }

        .gf-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .gf-card {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
        }

        .gf-stat-label {
          font-size: 10px;
          color: #7090a8;
          text-transform: uppercase;
          letter-spacing: .06em;
          margin-bottom: 8px;
        }

        .gf-stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #1a2e40;
          line-height: 1.2;
        }

        .gf-stat-meta {
          font-size: 11px;
          color: #9ab0c4;
          margin-top: 6px;
        }

        .gf-export-item {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: box-shadow .15s ease, border-color .15s ease;
        }

        .gf-export-item.selected {
          box-shadow: 0 0 0 2px #1a2535 inset;
          border-color: #1a2535;
        }

        .gf-export-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a2e40;
        }

        .gf-export-sub {
          font-size: 12px;
          color: #8a9aaa;
          margin-top: 3px;
        }

        .gf-badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 600;
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .gf-download-btn {
          background: #1a2535;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 15px;
          width: 100%;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }

        @media (max-width: 900px) {
          .gf-cards {
            grid-template-columns: 1fr;
          }

          .gf-content {
            max-width: 100%;
          }
        }

        @media (max-width: 720px) {
          .gf-topbar {
            padding: 14px 14px 10px;
            border-radius: 14px;
          }

          .gf-page-title {
            font-size: 22px;
          }

          .gf-export-item {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="gf-page-shell">
        <section className="gf-topbar">
          <h1 className="gf-page-title">Exports</h1>

          <div className="gf-filter-row">
            {MOIS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMoisSel(m)}
                className={`gf-month-tab ${moisSel === m ? 'active' : ''}`}
              >
                {m}
              </button>
            ))}

            <select
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              className="gf-year-select"
            >
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </section>

        <div className="gf-content">
          <section className="gf-cards">
            {[
              { label: 'CA sélectionné', val: d.ca, sub: `${moisSel} ${annee}` },
              { label: 'Dépenses', val: d.dep, sub: '14 factures' },
              { label: 'Bénéfice estimé', val: d.ben, sub: 'avant cotisations' },
            ].map((k) => (
              <div key={k.label} className="gf-card">
                <div className="gf-stat-label">{k.label}</div>
                <div className="gf-stat-value">{k.val}</div>
                <div className="gf-stat-meta">{k.sub}</div>
              </div>
            ))}
          </section>

          {exportsList.map((e) => (
            <button
              key={e.nom}
              type="button"
              onClick={() => setSelection(e.nom)}
              className={`gf-export-item ${selection === e.nom ? 'selected' : ''}`}
            >
              <div style={{ textAlign: 'left' }}>
                <div className="gf-export-name">{e.nom}</div>
                <div className="gf-export-sub">{e.sub}</div>
              </div>

              <span
                className="gf-badge"
                style={{
                  background: e.bc,
                  color: e.bt,
                }}
              >
                {e.badge}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              alert(`Téléchargement simulé : ${selection} — ${moisSel} ${annee}`)
            }
            className="gf-download-btn"
          >
            Télécharger la sélection
          </button>
        </div>
      </div>
    </main>
  )
}
