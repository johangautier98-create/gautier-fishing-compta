'use client'
import { useState, useRef } from 'react'

export default function Facture() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const analyser = async () => {
    if (!image) return
    setLoading(true)
    try {
      const res = await fetch('/api/analyser-facture', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ image })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      alert('Erreur lors de l analyse')
    }
    setLoading(false)
  }

  return (
    <div style={{padding:'20px',maxWidth:600,margin:'0 auto',fontFamily:'Segoe UI,system-ui,sans-serif',paddingBottom:80}}>
      
      <div style={{fontSize:20,fontWeight:500,color:'#1a2e40',marginBottom:4}}>Ajouter une facture</div>
      <div style={{fontSize:13,color:'#8a9aaa',marginBottom:24}}>L'IA analyse automatiquement votre facture</div>

      {!image && !result && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            style={{display:'none'}}
          />
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              width:'100%',
              background:'#1a2535',
              border:'none',
              borderRadius:16,
              padding:'28px 20px',
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              gap:16,
              marginBottom:16,
              WebkitTapHighlightColor:'transparent'
            }}
          >
            <div style={{width:60,height:60,background:'#2a4060',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8d4f8" strokeWidth="1.8">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:16,fontWeight:600,color:'#fff',marginBottom:4}}>Photographier une facture</div>
              <div style={{fontSize:13,color:'#7a9ab5'}}>Appuyez pour ouvrir l'appareil photo</div>
            </div>
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            style={{
              width:'100%',
              background:'#fff',
              border:'1px solid #dde8f0',
              borderRadius:12,
              padding:'16px 20px',
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              gap:12,
              WebkitTapHighlightColor:'transparent'
            }}
          >
            <div style={{fontSize:24}}>📎</div>
            <div style={{fontSize:14,color:'#1a2e40',fontWeight:500}}>Importer depuis la galerie</div>
          </button>
        </div>
      )}

      {image && !result && (
        <div>
          <img src={image} style={{width:'100%',borderRadius:12,marginBottom:16,maxHeight:300,objectFit:'cover'}}/>
          <button
            onClick={analyser}
            disabled={loading}
            style={{
              width:'100%',
              background: loading ? '#8a9aaa' : '#1a2535',
              color:'#fff',
              border:'none',
              borderRadius:12,
              padding:'18px',
              fontSize:16,
              fontWeight:500,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom:10,
              WebkitTapHighlightColor:'transparent'
            }}
          >
            {loading ? '⏳ Analyse en cours...' : '🔍 Analyser avec l\'IA'}
          </button>
          <button
            onClick={() => setImage(null)}
            style={{
              width:'100%',
              background:'#f0f4f8',
              color:'#5a7a95',
              border:'1px solid #dde8f0',
              borderRadius:12,
              padding:'14px',
              fontSize:14,
              cursor:'pointer',
              WebkitTapHighlightColor:'transparent'
            }}
          >
            Reprendre la photo
          </button>
        </div>
      )}

      {result && (
        <div>
          <div style={{background:'#e8f4e8',border:'1px solid #a8d8a8',borderRadius:10,padding:'12px 16px',marginBottom:20,fontSize:14,color:'#2a5a2a',fontWeight:500}}>
            ✓ Analyse terminée — vérifiez et corrigez si besoin
          </div>
          {[
            {label:'Fournisseur', key:'fournisseur'},
            {label:'Date du document', key:'date'},
            {label:'Numéro de facture', key:'numero'},
          ].map(f=>(
            <div key={f.key} style={{marginBottom:16}}>
              <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase' as const,letterSpacing:'.07em',display:'block',marginBottom:6}}>{f.label}</label>
              <input
                defaultValue={result[f.key] || ''}
                style={{width:'100%',padding:'12px 14px',border:'1px solid #dde8f0',borderRadius:10,fontSize:15,color:'#1a2e40',background:'#fff',boxSizing:'border-box' as const}}
              />
            </div>
          ))}
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase' as const,letterSpacing:'.07em',display:'block',marginBottom:6}}>Catégorie</label>
            <select
              defaultValue={result.categorie || ''}
              style={{width:'100%',padding:'12px 14px',border:'1px solid #dde8f0',borderRadius:10,fontSize:15,color:'#1a2e40',background:'#fff'}}
            >
              {['Emballage','Envois / Poste','Matériel','Publicité','Logiciels','Fournitures','Divers'].map(c=>(
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
            {[{label:'Montant HT',key:'ht'},{label:'Montant TTC',key:'ttc'}].map(f=>(
              <div key={f.key}>
                <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase' as const,letterSpacing:'.07em',display:'block',marginBottom:6}}>{f.label}</label>
                <input
                  defaultValue={result[f.key] || ''}
                  style={{width:'100%',padding:'12px 14px',border:'1px solid #3d7aad',borderRadius:10,fontSize:15,color:'#1a2e40',background:'#f0f6ff',boxSizing:'border-box' as const}}
                />
              </div>
            ))}
          </div>
          <button
            style={{width:'100%',background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'18px',fontSize:16,fontWeight:500,cursor:'pointer',marginBottom:10,WebkitTapHighlightColor:'transparent'}}
          >
            ✓ Valider et enregistrer
          </button>
          <button
            onClick={()=>{setImage(null);setResult(null)}}
            style={{width:'100%',background:'#f0f4f8',color:'#5a7a95',border:'1px solid #dde8f0',borderRadius:12,padding:'14px',fontSize:14,cursor:'pointer',WebkitTapHighlightColor:'transparent'}}
          >
            Nouvelle facture
          </button>
        </div>
      )}
    </div>
  )
}