'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const MOIS = [
  'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
  'T1', 'T2', 'T3', 'T4', 'Annuel'
]

type StoredDepense = {
  id?: number
  fournisseur?: string
  date?: string
  numero?: string
  categorie?: string
  ht?: string
  ttc?: string
  image?: string | null
  createdAt?: string
  source?: string
}

type DisplayRow = {
  nom: string
  meta: string
  tag: string
  tagC: string
  tagT: string
  date: string
  amt: string
  ok: boolean
  image?: string | null
  numero?: string
  source?: string
}

const EXAMPLE_ROWS: DisplayRow[] = [
  {
    nom: 'Amazon Pro',
    meta: 'Emballages carton ×50',
    tag: 'Emballage',
    tagC: '#e6f1fb',
    tagT: '#185FA5',
    date: '11/03',
    amt: '−76 €',
    ok: true,
  },
  {
    nom: 'La Poste',
    meta: 'Colissimo ×4',
    tag: 'Envois',
    tagC: '#e1f5ee',
    tagT: '#0F6E56',
    date: '13/03',
    amt: '−18 €',
    ok: true,
  },
  {
    nom: 'Meta Ads',
    meta: 'Campagne mars',
    tag: 'Publicité',
    tagC: '#eeedfe',
    tagT: '#534AB7',
    date: '05/03',
    amt: '−150 €',
    ok: true,
  },
  {
    nom: 'Shopify',
    meta: 'Abonnement mensuel',
    tag: 'Logiciel',
    tagC: '#f4f0fa',
    tagT: '#4a3a7a',
    date: '01/03',
    amt: '−29 €',
    ok: true,
  },
  {
    nom: 'Fournisseur inconnu',
    meta: 'Non identifié',
    tag: 'À vérifier',
    tagC: '#fef4e0',
    tagT: '#7a5c10',
    date: '07/03',
    amt: '−43 €',
    ok: false,
  },
]

function normalizeCategorie(categorie?: string) {
  const raw = (categorie || '').trim().toLowerCase()

  if (raw.includes('emballage')) {
    return {
      tag: 'Emballage',
      tagC: '#e6f1fb',
      tagT: '#185FA5',
    }
  }

  if (raw.includes('envoi') || raw.includes('poste')) {
    return {
      tag: 'Envois',
      tagC: '#e1f5ee',
      tagT: '#0F6E56',
    }
  }

  if (raw.includes('publicit')) {
    return {
      tag: 'Publicité',
      tagC: '#eeedfe',
      tagT: '#534AB7',
    }
  }

  if (raw.includes('logiciel')) {
    return {
      tag: 'Logiciel',
      tagC: '#f4f0fa',
      tagT: '#4a3a7a',
    }
  }

  if (raw.includes('fourniture')) {
    return {
      tag: 'Fournitures',
      tagC: '#eef6ea',
      tagT: '#3f6f2a',
    }
  }

  if (raw.includes('matériel') || raw.includes('materiel')) {
    return {
      tag: 'Matériel',
      tagC: '#eef2ff',
      tagT: '#3550a3',
    }
  }

  if (raw.includes('non détecté') || raw.includes('à vérifier') || raw.includes('a verifier')) {
    return {
      tag: 'À vérifier',
      tagC: '#fef4e0',
      tagT: '#7a5c10',
    }
  }

  return {
    tag: 'Divers',
    tagC: '#f4f4f4',
    tagT: '#666',
  }
}

function parseEuroToNumber(value?: string) {
  if (!value) return 0
  const normalized = value
    .replace(/\s/g, '')
    .replace('€', '')
    .replace('−', '-')
    .replace(',', '.')
  const num = Number(normalized)
  return Number.isFinite(num) ? Math.abs(num) : 0
}

function formatEuro(value: number) {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} €`
}

function mapStoredDepenseToRow(item: StoredDepense): DisplayRow {
  const fournisseur = item.fournisseur?.trim() || 'Non renseigné'
  const numero = item.numero?.trim()
  const date = item.date?.trim() || 'Non détecté'
  const ttc = item.ttc?.trim() || 'Non détecté'
  const cat = normalizeCategorie(item.categorie)

  const isOk =
    fournisseur !== 'Non détecté' &&
    fournisseur !== 'Non renseigné' &&
    date !== 'Non détecté' &&
    ttc !== 'Non détecté'

  return {
    nom: fournisseur,
    meta: numero ? `Facture ${numero}` : 'Facture importée via IA',
    tag: isOk ? cat.tag : 'À vérifier',
    tagC: isOk ? cat.tagC : '#fef4e0',
    tagT: isOk ? cat.tagT : '#7a5c10',
    date,
    amt: ttc.startsWith('−') ? ttc : `−${ttc.replace(/^[-−]/, '')}`,
    ok: isOk,
    image: item.image || null,
    numero: numero || '',
    source: item.source || 'facture-ia',
  }
}

export default function Depenses() {
  const router = useRouter()
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')
  const [filtre, setFiltre] = useState('Toutes')
  const [storedRows, setStoredRows] = useState<DisplayRow[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gf_depenses')
      if (!raw) {
        setStoredRows([])
        return
      }

      const parsed: StoredDepense[] = JSON.parse(raw)
      const mapped = Array.isArray(parsed) ? parsed.map(mapStoredDepenseToRow) : []
      setStoredRows(mapped)
    } catch {
      setStoredRows([])
    }
  }, [])

  const allRows = useMemo(() => {
    return [...storedRows, ...EXAMPLE_ROWS]
  }, [storedRows])

  const rowsFiltered = useMemo(() => {
    return allRows.filter((r) => filtre === 'Toutes' || r.tag === filtre)
  }, [allRows, filtre])

  const stats = useMemo(() => {
    const total = allRows.reduce((sum, row) => sum + parseEuroToNumber(row.amt), 0)
    const aVerifier = allRows.filter((r) => !r.ok).length

    const categoryTotals: Record<string, number> = {}
    allRows
      .filter((r) => r.ok && r.tag !== 'À vérifier')
      .forEach((r) => {
        categoryTotals[r.tag] = (categoryTotals[r.tag] || 0) + parseEuroToNumber(r.amt)
      })

    const topCategory =
      Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

    const topCategoryAmount =
      Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[1] || 0

    return {
      total,
      aVerifier,
      topCategory,
      topCategoryAmount,
      count: allRows.length,
    }
  }, [allRows])

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
          justify-content: space-between;
          align-items: flex-start;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
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

        .gf-pill {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          margin-top: 8px;
          display: inline-block;
          width: fit-content;
        }

        .gf-warning-box {
          background: #fef8e8;
          border: 1px solid #f0d468;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          color: #7a5c10;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gf-warning-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #d4a010;
          flex: 0 0 auto;
        }

        .gf-chip-row {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .gf-chip {
          background: #fff;
          color: #5a7a95;
          border: 1px solid #c8d8e8;
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 12px;
          cursor: pointer;
        }

        .gf-chip.active {
          background: #1a2535;
          color: #fff;
          border-color: #1a2535;
        }

        .gf-table-card {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 18px;
        }

        .gf-section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .gf-section-title {
          font-size: 11px;
          font-weight: 700;
          color: #4a6a85;
          text-transform: uppercase;
          letter-spacing: .07em;
        }

        .gf-link {
          font-size: 12px;
          color: #3d7aad;
          cursor: pointer;
        }

        .gf-table {
          width: 100%;
        }

        .gf-table-head,
        .gf-table-row {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) 110px 80px 100px 90px;
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

        .gf-table-row.warn {
          background: #fefcf4;
          border-radius: 12px;
          padding-left: 10px;
          padding-right: 10px;
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

        .gf-amount-negative {
          font-size: 14px;
          font-weight: 700;
          color: #8a2a2a;
        }

        .gf-action {
          font-size: 11px;
          cursor: pointer;
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

        .gf-mobile-item.warn {
          background: #fefcf4;
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

        .gf-mobile-bottom {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .gf-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 780px) {
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

          .gf-section-title-row {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="gf-page-shell">
        <section className="gf-topbar">
          <div className="gf-topbar-head">
            <h1 className="gf-page-title">Dépenses</h1>

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
            <div className="gf-stat-label">Total dépenses</div>
            <div className="gf-stat-value">{formatEuro(stats.total)}</div>
            <div className="gf-stat-meta">{stats.count} factures · {moisSel.toLowerCase()} {annee}</div>
            <span
              className="gf-pill"
              style={{ background: '#fce8e8', color: '#8a2a2a' }}
            >
              Suivi en cours
            </span>
          </div>

          <div className="gf-card">
            <div className="gf-stat-label">À valider</div>
            <div className="gf-stat-value">{stats.aVerifier}</div>
            <div className="gf-stat-meta">Pièces incomplètes ou à revoir</div>
            <span
              className="gf-pill"
              style={{ background: '#fef4e0', color: '#7a5c10' }}
            >
              Attention
            </span>
          </div>

          <div className="gf-card">
            <div className="gf-stat-label">Catégorie principale</div>
            <div className="gf-stat-value">{stats.topCategory}</div>
            <div className="gf-stat-meta">
              {stats.topCategoryAmount > 0 ? `${formatEuro(stats.topCategoryAmount)} ce mois` : 'Aucune donnée'}
            </div>
          </div>
        </section>

        <div className="gf-warning-box">
          <span className="gf-warning-dot" />
          {stats.aVerifier} facture{stats.aVerifier > 1 ? 's' : ''} à vérifier — fournisseur non reconnu, date ou montant manquant.
        </div>

        <div className="gf-chip-row">
          {['Toutes', 'Emballage', 'Envois', 'Publicité', 'Logiciel', 'Fournitures', 'Matériel', 'Divers', 'À vérifier'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltre(f)}
              className={`gf-chip ${filtre === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <section className="gf-table-card">
          <div className="gf-section-title-row">
            <div className="gf-section-title">
              Factures enregistrées — {moisSel} {annee}
            </div>

            <span
              onClick={() => router.push('/exports')}
              className="gf-link"
            >
              Exporter Excel →
            </span>
          </div>

          <div className="gf-table">
            <div className="gf-table-head">
              <span>Fournisseur</span>
              <span>Catégorie</span>
              <span>Date</span>
              <span>Montant TTC</span>
              <span>Justificatif</span>
            </div>

            {rowsFiltered.map((r) => (
              <div
                key={`${r.nom}-${r.date}-${r.numero || ''}`}
                className={`gf-table-row ${r.ok ? '' : 'warn'}`}
              >
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
                <span className="gf-amount-negative">{r.amt}</span>

                <span
                  onClick={() => {
                    if (r.ok && r.image) {
                      window.open(r.image, '_blank')
                    } else {
                      router.push(r.ok ? '/facture' : '/facture')
                    }
                  }}
                  className="gf-action"
                  style={{ color: r.ok ? '#3d7aad' : '#c07a10' }}
                >
                  {r.ok ? (r.image ? 'Voir image' : 'Voir PDF') : 'Corriger'}
                </span>
              </div>
            ))}
          </div>

          <div className="gf-mobile-list">
            {rowsFiltered.map((r) => (
              <div
                key={`${r.nom}-${r.date}-${r.numero || ''}-mobile`}
                className={`gf-mobile-item ${r.ok ? '' : 'warn'}`}
              >
                <div className="gf-mobile-top">
                  <div>
                    <div className="gf-row-title">{r.nom}</div>
                    <div className="gf-row-meta">{r.meta}</div>
                  </div>

                  <div className="gf-amount-negative">{r.amt}</div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
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

                <div className="gf-mobile-bottom">
                  <span
                    onClick={() => {
                      if (r.ok && r.image) {
                        window.open(r.image, '_blank')
                      } else {
                        router.push(r.ok ? '/facture' : '/facture')
                      }
                    }}
                    className="gf-action"
                    style={{ color: r.ok ? '#3d7aad' : '#c07a10' }}
                  >
                    {r.ok ? (r.image ? 'Voir image' : 'Voir PDF') : 'Corriger'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
