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
      alert('Erreur analyse')
    }
    setLoading(false)
  }

  return (
    <div style={{padding:'20px',maxWidth:600,margin:'0 auto',fontFamily:'Segoe UI,system-ui,sans-serif'}}>
      <div style={{fontSize:22,fontWeight:500,color:'#1a2e40',marginBottom:6}}>Ajouter une facture</div>
      <div style={{fontSize:13,color:'#8a9aaa',marginBottom:20}}>Photo ou import — l'IA analyse automatiquement</div>

      {!image && (
        <div
          onClick={()=>fileRef.current?.click()}
          style={{border:'2px dashed #c8d8e8',borderRadius:16,padding:'40px 20px',textAlign:'center',cursor:'pointer',background:'#fff',marginBottom:20}}
        >
          <div style={{fontSize:48,marginBottom:12}}>📷</div>
          <div style={{fontSize:16,fontWeight:500,color:'#1a2e40',marginBottom:6}}>Photographier une facture</div>
          <div style={{fontSize:13,color:'#8a9aaa'}}>Appuie ici pour ouvrir l'appareil photo</div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            style={{display:'none'}}
          />
        </div>
      )}

      {image && !result && (
        <div style={{marginBottom:20}}>
          <img src={image} style={{width:'100%',borderRadius:12,marginBottom:14}}/>
          <button
            onClick={analyser}
            disabled={loading}
            style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'15px',width:'100%',fontSize:15,fontWeight:500,cursor:'pointer'}}
          >
            {loading ? '⏳ Analyse en cours...' : '🔍 Analyser avec l\'IA'}
          </button>
          <button
            onClick={()=>setImage(null)}
            style={{background:'#f0f4f8',color:'#5a7a95',border:'0.5px solid #dde8f0',borderRadius:12,padding:'12px',width:'100%',fontSize:14,cursor:'pointer',marginTop:8}}
          >
            Reprendre la photo
          </button>
        </div>
      )}

      {result && (
        <div>
          <div style={{background:'#e8f4e8',border:'0.5px solid #a8d8a8',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:13,color:'#2a5a2a',fontWeight:500}}>
            ✓ Analyse terminée — vérifiez et corrigez si besoin
          </div>
          {[
            {label:'Fournisseur', key:'fournisseur'},
            {label:'Date du document', key:'date'},
            {label:'Numéro de facture', key:'numero'},
          ].map(f=>(
            <div key={f.key} style={{marginBottom:14}}>
              <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>{f.label}</label>
              <input
                defaultValue={result[f.key] || ''}
                style={{width:'100%',padding:'10px 14px',border:'0.5px solid #dde8f0',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#fff'}}
              />
            </div>
          ))}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>Catégorie</label>
            <select
              defaultValue={result.categorie || ''}
              style={{width:'100%',padding:'10px 14px',border:'0.5px solid #dde8f0',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#fff'}}
            >
              {['Emballage','Envois / Poste','Matériel','Publicité','Logiciels','Fournitures','Divers'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
            {[{label:'Montant HT',key:'ht'},{label:'Montant TTC',key:'ttc'}].map(f=>(
              <div key={f.key}>
                <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>{f.label}</label>
                <input
                  defaultValue={result[f.key] || ''}
                  style={{width:'100%',padding:'10px 14px',border:'0.5px solid #3d7aad',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#f0f6ff'}}
                />
              </div>
            ))}
          </div>
          <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'15px',width:'100%',fontSize:15,fontWeight:500,cursor:'pointer',marginBottom:10}}>
            ✓ Valider et enregistrer
          </button>
          <button
            onClick={()=>{setImage(null);setResult(null)}}
            style={{background:'#f0f4f8',color:'#5a7a95',border:'0.5px solid #dde8f0',borderRadius:12,padding:'12px',width:'100%',fontSize:14,cursor:'pointer'}}
          >
            Nouvelle facture
          </button>
        </div>
      )}
    </div>
  )
}