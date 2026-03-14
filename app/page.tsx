'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOIS = [
  'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
  'T1', 'T2', 'T3', 'T4', 'Annuel'
]

export default function VentesPage() {
  const router = useRouter()
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')

  const rows = [
    {
      nom: 'Commande #8821',
      meta: 'Marie D. — 2 articles',
      tag: 'Shopify',
      tagC: '#e6f1fb',
      tagT: '#185FA5',
      date: '14/03',
      amt: '+127 €',
    },
    {
      nom: 'Encaissement PayPal',
      meta: 'ref. PP-4421',
      tag: 'PayPal',
      tagC: '#e1f5ee',
      tagT: '#0F6E56',
      date: '12/03',
      amt: '+89 €',
    },
    {
      nom: 'Commande #8820',
      meta: 'Pierre M. — 1 article',
      tag: 'Shopify',
      tagC: '#e6f1fb',
      tagT: '#185FA5',
      date: '10/03',
      amt: '+54 €',
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
          max-width: 1400px;
          margin: 0 auto;
        }

        .gf-topbar {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 18px 18px 10px;
          margin-bottom: 16px;
        }

        .gf-topbar-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .gf-page-title {
          font-size: 24px;
          line-height: 1.2;
          font-weight: 600;
          color: #1a2e40;
          margin: 0;
        }

        .gf-primary-btn {
          background: #1a2535;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
          white-space: nowrap;
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

        .gf-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }

        .gf-card {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 16px;
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

        .gf-table-card {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 18px;
        }

        .gf-section-title {
          font-size: 11px;
          font-weight: 700;
          color: #4a6a85;
          text-transform: uppercase;
          letter-spacing: .07em;
          margin-bottom: 14px;
        }

        .gf-table {
          width: 100%;
        }

        .gf-table-head,
        .gf-table-row {
          display: grid;
          grid-template-columns: minmax(0, 1.8fr) 110px 90px 100px;
          gap: 10px;
          align-items: center;
        }

        .gf-table-head {
          padding: 8px 0;
          border-bottom: 1px solid #eef3f7;
        }

        .gf-table-head span {
          font-size: 11px;
          color: #b0c4d8;
          text-transform: uppercase;
          letter-spacing: .04em;
        }

        .gf-table-row {
          padding: 12px 0;
          border-bottom: 1px solid #eef3f7;
        }

        .gf-table-row:last-child {
          border-bottom: none;
        }

        .gf-row-title {
          font-size: 14px;
          color: #1a2e40;
          font-weight: 600;
        }

        .gf-row-meta {
          font-size: 11px;
          color: #9ab0c4;
          margin-top: 2px;
        }

        .gf-badge {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          display: inline-block;
          white-space: nowrap;
          width: fit-content;
        }

        .gf-date {
          font-size: 12px;
          color: #9ab0c4;
        }

        .gf-amount {
          font-size: 14px;
          font-weight: 700;
          text-align: right;
          color: #2a6a3a;
        }

        .gf-mobile-list {
          display: none;
        }

        .gf-mobile-item {
          border: 1px solid #eef3f7;
          border-radius: 14px;
          padding: 14px;
          background: #fff;
        }

        .gf-mobile-item + .gf-mobile-item {
          margin-top: 10px;
        }

        .gf-mobile-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .gf-mobile-meta-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          margin-top: 10px;
        }

        @media (max-width: 1100px) {
          .gf-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .gf-page-shell {
            max-width: 100%;
          }

          .gf-topbar {
            padding: 14px 14px 10px;
            border-radius: 14px;
          }

          .gf-topbar-head {
            flex-direction: column;
            align-items: stretch;
          }

          .gf-page-title {
            font-size: 22px;
          }

          .gf-primary-btn {
            width: 100%;
          }

          .gf-cards {
            grid-template-columns: 1fr;
          }

          .gf-table {
            display: none;
          }

          .gf-mobile-list {
            display: block;
          }

          .gf-table-card {
            padding: 14px;
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="gf-page-shell">
        <section className="gf-topbar">
          <div className="gf-topbar-head">
            <h1 className="gf-page-title">Ventes</h1>

            <button
              onClick={() => router.push('/facture')}
              className="gf-primary-btn"
            >
              + Ajouter une facture
            </button>
          </div>

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

        <section className="gf-cards">
          <div className="gf-card">
            <div className="gf-stat-label">Total ventes</div>
            <div className="gf-stat-value">8 240 €</div>
            <div className="gf-stat-meta">{moisSel} {annee}</div>
          </div>

          <div className="gf-card">
            <div className="gf-stat-label">Commandes</div>
            <div className="gf-stat-value">47</div>
            <div className="gf-stat-meta">Shopify + PayPal</div>
          </div>

          <div className="gf-card">
            <div className="gf-stat-label">Panier moyen</div>
            <div className="gf-stat-value">175 €</div>
            <div className="gf-stat-meta">Estimation</div>
          </div>

          <div className="gf-card">
            <div className="gf-stat-label">Canal principal</div>
            <div className="gf-stat-value">Shopify</div>
            <div className="gf-stat-meta">Ce mois</div>
          </div>
        </section>

        <section className="gf-table-card">
          <div className="gf-section-title">Journal des ventes</div>

          <div className="gf-table">
            <div className="gf-table-head">
              <span>Libellé</span>
              <span>Source</span>
              <span>Date</span>
              <span style={{ textAlign: 'right' }}>Montant</span>
            </div>

            {rows.map((r) => (
              <div key={r.nom} className="gf-table-row">
                <div>
                  <div className="gf-row-title">{r.nom}</div>
                  <div className="gf-row-meta">{r.meta}</div>
                </div>

                <div>
                  <span
                    className="gf-badge"
                    style={{
                      background: r.tagC,
                      color: r.tagT,
                    }}
                  >
                    {r.tag}
                  </span>
                </div>

                <span className="gf-date">{r.date}</span>
                <span className="gf-amount">{r.amt}</span>
              </div>
            ))}
          </div>

          <div className="gf-mobile-list">
            {rows.map((r) => (
              <div key={r.nom} className="gf-mobile-item">
                <div className="gf-mobile-top">
                  <div>
                    <div className="gf-row-title">{r.nom}</div>
                    <div className="gf-row-meta">{r.meta}</div>
                  </div>

                  <div className="gf-amount" style={{ textAlign: 'right' }}>
                    {r.amt}
                  </div>
                </div>

                <div className="gf-mobile-meta-row">
                  <span
                    className="gf-badge"
                    style={{
                      background: r.tagC,
                      color: r.tagT,
                    }}
                  >
                    {r.tag}
                  </span>

                  <span className="gf-date">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}