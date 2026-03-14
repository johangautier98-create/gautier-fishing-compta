'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type AnalyseResult = {
  fournisseur?: string
  date?: string
  numero?: string
  categorie?: string
  ht?: string
  ttc?: string
  tva?: string
  [key: string]: any
}

type FactureForm = {
  fournisseur: string
  date: string
  numero: string
  categorie: string
  ht: string
  ttc: string
}

const EMPTY_FORM: FactureForm = {
  fournisseur: '',
  date: '',
  numero: '',
  categorie: 'Divers',
  ht: '',
  ttc: '',
}

export default function Facture() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<AnalyseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successSave, setSuccessSave] = useState<string | null>(null)
  const [form, setForm] = useState<FactureForm>(EMPTY_FORM)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccessSave(null)
    setResult(null)
    setForm(EMPTY_FORM)

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const analyser = async () => {
    if (!image) return

    setLoading(true)
    setError(null)
    setSuccessSave(null)

    try {
      const res = await fetch('/api/analyser-facture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Erreur lors de l’analyse')
      }

      setResult(data)

      setForm({
        fournisseur: data?.fournisseur || '',
        date: data?.date || '',
        numero: data?.numero || '',
        categorie: data?.categorie || 'Divers',
        ht: data?.ht || '',
        ttc: data?.ttc || '',
      })
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l’analyse')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (key: keyof FactureForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccessSave(null)

    try {
      const depense = {
        id: Date.now(),
        fournisseur: form.fournisseur || 'Non renseigné',
        date: form.date || 'Non renseigné',
        numero: form.numero || 'Non renseigné',
        categorie: form.categorie || 'Divers',
        ht: form.ht || 'Non renseigné',
        ttc: form.ttc || 'Non renseigné',
        image,
        createdAt: new Date().toISOString(),
        source: 'facture-ia',
      }

      const existing = localStorage.getItem('gf_depenses')
      const depenses = existing ? JSON.parse(existing) : []

      depenses.unshift(depense)

      localStorage.setItem('gf_depenses', JSON.stringify(depenses))

      setSuccessSave('Facture enregistrée avec succès.')
      setTimeout(() => {
        router.push('/depenses')
      }, 800)
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l’enregistrement')
    } finally {
      setSaving(false)
    }
  }

  const resetAll = () => {
    setImage(null)
    setResult(null)
    setError(null)
    setSuccessSave(null)
    setForm(EMPTY_FORM)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <main
      style={{
        minHeight: '100%',
        background: '#f0f4f8',
        padding: 16,
      }}
    >
      <style>{`
        .gf-facture-shell {
          max-width: 860px;
          margin: 0 auto;
        }

        .gf-facture-card {
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 18px;
          padding: 20px;
        }

        .gf-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a2e40;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }

        .gf-subtitle {
          font-size: 14px;
          color: #8a9aaa;
          margin-bottom: 22px;
        }

        .gf-upload-main {
          width: 100%;
          background: #1a2535;
          border: none;
          border-radius: 18px;
          padding: 26px 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
          -webkit-tap-highlight-color: transparent;
        }

        .gf-upload-icon {
          width: 64px;
          height: 64px;
          background: #2a4060;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gf-upload-secondary {
          width: 100%;
          background: #fff;
          border: 1px solid #dde8f0;
          border-radius: 14px;
          padding: 16px 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          -webkit-tap-highlight-color: transparent;
        }

        .gf-preview-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
        }

        .gf-preview-box {
          background: #f8fbfd;
          border: 1px solid #dde8f0;
          border-radius: 16px;
          padding: 12px;
        }

        .gf-preview-img {
          width: 100%;
          border-radius: 12px;
          max-height: 420px;
          object-fit: contain;
          display: block;
          background: #fff;
        }

        .gf-btn-primary {
          width: 100%;
          background: #1a2535;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 10px;
          -webkit-tap-highlight-color: transparent;
        }

        .gf-btn-primary:disabled {
          background: #8a9aaa;
          cursor: not-allowed;
        }

        .gf-btn-secondary {
          width: 100%;
          background: #f0f4f8;
          color: #5a7a95;
          border: 1px solid #dde8f0;
          border-radius: 14px;
          padding: 14px;
          font-size: 14px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .gf-success {
          background: #e8f4e8;
          border: 1px solid #a8d8a8;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #2a5a2a;
          font-weight: 600;
        }

        .gf-error {
          background: #fce8e8;
          border: 1px solid #efb6b6;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 18px;
          font-size: 14px;
          color: #8a2a2a;
          font-weight: 500;
        }

        .gf-field {
          margin-bottom: 16px;
        }

        .gf-label {
          font-size: 12px;
          color: #7090a8;
          text-transform: uppercase;
          letter-spacing: .07em;
          display: block;
          margin-bottom: 6px;
        }

        .gf-input,
        .gf-select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #dde8f0;
          border-radius: 12px;
          font-size: 15px;
          color: #1a2e40;
          background: #fff;
          box-sizing: border-box;
        }

        .gf-input-highlight {
          border: 1px solid #3d7aad;
          background: #f0f6ff;
        }

        .gf-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        @media (max-width: 720px) {
          .gf-facture-card {
            padding: 16px;
            border-radius: 16px;
          }

          .gf-title {
            font-size: 22px;
          }

          .gf-upload-main {
            padding: 20px 16px;
            align-items: flex-start;
          }

          .gf-upload-icon {
            width: 56px;
            height: 56px;
            border-radius: 14px;
          }

          .gf-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="gf-facture-shell">
        <section className="gf-facture-card">
          <h1 className="gf-title">Ajouter une facture</h1>
          <div className="gf-subtitle">
            L’IA analyse automatiquement votre facture, puis vous pouvez corriger les champs avant enregistrement.
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            style={{ display: 'none' }}
          />

          {!image && !result && (
            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="gf-upload-main"
                type="button"
              >
                <div className="gf-upload-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8d4f8" strokeWidth="1.8">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                    Photographier une facture
                  </div>
                  <div style={{ fontSize: 13, color: '#7a9ab5' }}>
                    Appuyez pour ouvrir l’appareil photo
                  </div>
                </div>
              </button>

              <button
                onClick={() => fileRef.current?.click()}
                className="gf-upload-secondary"
                type="button"
              >
                <div style={{ fontSize: 24 }}>📎</div>
                <div style={{ fontSize: 14, color: '#1a2e40', fontWeight: 500 }}>
                  Importer depuis la galerie
                </div>
              </button>
            </div>
          )}

          {image && !result && (
            <div className="gf-preview-wrap">
              <div className="gf-preview-box">
                <img src={image} alt="Aperçu facture" className="gf-preview-img" />
              </div>

              {error && <div className="gf-error">{error}</div>}

              <button
                onClick={analyser}
                disabled={loading}
                className="gf-btn-primary"
                type="button"
              >
                {loading ? '⏳ Analyse en cours...' : "🔍 Analyser avec l'IA"}
              </button>

              <button
                onClick={resetAll}
                className="gf-btn-secondary"
                type="button"
              >
                Reprendre la photo
              </button>
            </div>
          )}

          {result && (
            <div>
              <div className="gf-success">
                ✓ Analyse terminée — vérifiez et corrigez si besoin
              </div>

              {error && <div className="gf-error">{error}</div>}
              {successSave && <div className="gf-success">{successSave}</div>}

              <div className="gf-field">
                <label className="gf-label">Fournisseur</label>
                <input
                  value={form.fournisseur}
                  onChange={(e) => updateField('fournisseur', e.target.value)}
                  className="gf-input"
                />
              </div>

              <div className="gf-field">
                <label className="gf-label">Date du document</label>
                <input
                  value={form.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="gf-input"
                />
              </div>

              <div className="gf-field">
                <label className="gf-label">Numéro de facture</label>
                <input
                  value={form.numero}
                  onChange={(e) => updateField('numero', e.target.value)}
                  className="gf-input"
                />
              </div>

              <div className="gf-field">
                <label className="gf-label">Catégorie</label>
                <select
                  value={form.categorie}
                  onChange={(e) => updateField('categorie', e.target.value)}
                  className="gf-select"
                >
                  {[
                    'Emballage',
                    'Envois / Poste',
                    'Matériel',
                    'Publicité',
                    'Logiciel',
                    'Fournitures',
                    'Divers',
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="gf-grid-2">
                <div>
                  <label className="gf-label">Montant HT</label>
                  <input
                    value={form.ht}
                    onChange={(e) => updateField('ht', e.target.value)}
                    className="gf-input gf-input-highlight"
                  />
                </div>

                <div>
                  <label className="gf-label">Montant TTC</label>
                  <input
                    value={form.ttc}
                    onChange={(e) => updateField('ttc', e.target.value)}
                    className="gf-input gf-input-highlight"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="gf-btn-primary"
                type="button"
              >
                {saving ? 'Enregistrement...' : '✓ Valider et enregistrer'}
              </button>

              <button
                onClick={resetAll}
                className="gf-btn-secondary"
                type="button"
              >
                Nouvelle facture
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}